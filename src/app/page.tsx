import Home from "./home-page";
import dayjs from "dayjs";
import { z } from "zod";

const crowdSchema = z.object({
  datetime: z.string(),
  location_id: z.number(),
  crowd_level: z.number(),
});

export type Crowd = z.infer<typeof crowdSchema>;

async function getCrowdData() {
  const now = dayjs();
  const oneWeekEarlier = now.subtract(2, "week");
  const url = "https://nus-gym-worker.chengzhisheng2001.workers.dev/api/crowd";

  const queryParams = new URLSearchParams({
    start: oneWeekEarlier.toISOString(),
    end: now.toISOString(),
  });

  const apiToken = process.env.D1_WORKER_TOKEN;

  const res = await fetch(`${url}?${queryParams.toString()}`, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + apiToken,
    },
  });

  if (!res.ok) {
    throw new Error("API error");
  }
  const parsedData = z.array(crowdSchema).parse(await res.json());

  const locationIdToCrowd = new Map<number, Crowd[]>();
  for (const crowd of parsedData) {
    const locationId = crowd.location_id;
    if (!locationIdToCrowd.has(locationId)) {
      locationIdToCrowd.set(locationId, []);
    }
    const crowds = locationIdToCrowd.get(locationId) ?? [];
    crowds.push(crowd);
  }

  // Sort the crowd data by timestamp
  for (const crowds of locationIdToCrowd.values()) {
    crowds.sort((a, b) => {
      return dayjs(a.datetime).unix() - dayjs(b.datetime).unix();
    });
  }

  return locationIdToCrowd;
}

export default async function Page() {
  const data = await getCrowdData();

  return <Home data={data} />;
}
