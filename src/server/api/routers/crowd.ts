import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, QueryCommand } from "@aws-sdk/lib-dynamodb";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";
import timezone from "dayjs/plugin/timezone.js";

import { LOCATIONS } from "~/components/constants";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("Asia/Singapore");

const client = new DynamoDBClient({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
  },
  region: "ap-southeast-2",
});

const docClient = DynamoDBDocumentClient.from(client);

const rawCrowdDataSchema = z.object({
  location: z.number(),
  timestamp: z.string(),
  capacity: z.string(),
  crowd_level: z.string(),
});

const START_HOUR = 7;
const DATETIME_FORMAT = "YYYY-MM-DD HH:mm:ss";

const makeQueryParams = (
  locationId: LocationId,
  startTime: string,
  endTime: string
) => ({
  TableName: "brother-jim-table",
  KeyConditionExpression:
    "#location = :location AND #timestamp BETWEEN :tStart and :tEnd",
  ExpressionAttributeNames: {
    "#location": "location",
    "#timestamp": "timestamp",
  },
  ExpressionAttributeValues: {
    ":location": locationId,
    ":tStart": startTime,
    ":tEnd": endTime,
  },
});

const makePresentQuery = (locationId: LocationId) => {
  const isBeforeStart = dayjs.tz(new Date()).hour() < START_HOUR;

  return makeQueryParams(
    locationId,
    dayjs
      .tz(new Date())
      .startOf("day")
      .set("hour", START_HOUR)
      .format(DATETIME_FORMAT),
    isBeforeStart
      ? dayjs.tz(new Date()).set("hour", START_HOUR).format(DATETIME_FORMAT)
      : dayjs.tz(new Date()).format(DATETIME_FORMAT)
  );
};

const makePastQuery = (locationId: LocationId) => {
  return makeQueryParams(
    locationId,
    dayjs
      .tz(new Date())
      .startOf("day")
      .subtract(1, "week")
      .set("hour", START_HOUR)
      .format(DATETIME_FORMAT),
    dayjs
      .tz(new Date())
      .startOf("day")
      .subtract(6, "days")
      .format(DATETIME_FORMAT)
  );
};

const getCrowdForId = async (locationId: LocationId) => {
  const presentQuery = makePresentQuery(locationId);
  const pastQuery = makePastQuery(locationId);

  const [presentRes, pastRes] = await Promise.all([
    docClient.send(new QueryCommand(presentQuery)),
    docClient.send(new QueryCommand(pastQuery)),
  ]);

  const presentItems = presentRes.Items ?? [];
  const pastItems = pastRes.Items ?? [];

  const presentData: RawCrowdData[] = presentItems.map((item) =>
    rawCrowdDataSchema.parse(item)
  );
  const pastData: RawCrowdData[] = pastItems.map((item) =>
    rawCrowdDataSchema.parse(item)
  );

  const presentCrowd: ProcessedCrowdData[] = presentData.map((item) => {
    return {
      timestamp: item.timestamp,
      capacity: parseInt(item.capacity),
      crowd_level: parseInt(item.crowd_level),
    };
  });

  const pastCrowd: ProcessedCrowdData[] = pastData.map((item) => {
    return {
      timestamp: item.timestamp,
      capacity: parseInt(item.capacity),
      crowd_level: parseInt(item.crowd_level),
    };
  });

  return {
    locationId,
    presentCrowd: presentCrowd,
    pastWeekCrowd: pastCrowd,
  };
};

export const crowdRouter = createTRPCRouter({
  crowdLevel: publicProcedure.query(async () => {
    const queryPromises = Object.values(LOCATIONS).map(({ locationId }) =>
      getCrowdForId(locationId)
    );

    const apiResponse: CrowdApiRes = {};
    const results = await Promise.all(queryPromises);
    results.forEach((res) => {
      apiResponse[res.locationId] = res;
    });

    return apiResponse;
  }),
});
