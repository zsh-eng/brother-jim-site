import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, QueryCommand } from "@aws-sdk/lib-dynamodb";

import dayjs from "dayjs";

const client = new DynamoDBClient({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
  },
  region: "ap-southeast-2",
});

const docClient = DynamoDBDocumentClient.from(client);

const CrowdData = z.object({
  location: z.number(),
  timestamp: z.string(),
  capacity: z.string(),
  crowd_level: z.string(),
});

const makeQueryParams = (locationId: number) => ({
  TableName: "brother-jim-table",
  KeyConditionExpression:
    "#location = :location AND #timestamp BETWEEN :tStart and :tEnd",
  ExpressionAttributeNames: {
    "#location": "location",
    "#timestamp": "timestamp",
  },
  ExpressionAttributeValues: {
    ":location": locationId,
    ":tStart": dayjs()
      .startOf("day")
      .subtract(1, "day")
      .set("hour", 7)
      .format("YYYY-MM-DD HH:mm:ss"),
    ":tEnd": dayjs().startOf("day").format("YYYY-MM-DD HH:mm:ss"),
  },
});

export const crowdRouter = createTRPCRouter({
  crowdLevel: publicProcedure
    .input(z.number())
    .query(async ({ input: locationId }) => {
      const params = makeQueryParams(locationId);
      const { Items } = await docClient.send(new QueryCommand(params));
      if (!Items) return [];

      // Validate the first item with Zod
      try {
        const res = Items.map((item) => CrowdData.parse(item)).map((item) => {
          return {
            location: item.location,
            timestamp: item.timestamp,
            capacity: parseInt(item.capacity),
            crowd_level: parseInt(item.crowd_level),
          };
        });
        return res;
      } catch (err) {
        console.error(err);
        return [];
      }
    }),
});
