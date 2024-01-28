"use client";

import { LOCATIONS } from "../components/constants";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  TimeScale,
  Tooltip,
  Legend,
  Colors,
  Filler,
  type ChartOptions,
} from "chart.js";

// Dayjs
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
dayjs.extend(utc);
dayjs.extend(timezone);

// Adapter to be able to display time series x-axis
import "chartjs-adapter-dayjs-4/dist/chartjs-adapter-dayjs-4.esm";

import { Line } from "react-chartjs-2";
import { useEffect, useState } from "react";
import Navbar from "~/components/Navbar";
import Sidebar from "~/components/Sidebar";
import { type Crowd } from "./page";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  TimeScale,
  Legend,
  Colors,
  Filler,
);

type Props = {
  data: Map<number, Crowd[]>;
};

ChartJS.defaults.font.size = 14;

function Home({ data }: Props) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  // Set the index of the location
  const [locationId, setLocationId] = useState<LocationId>(25);

  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Historical Crowd Data",
      },
      tooltip: {
        enabled: true,
        mode: "index",
        intersect: false,
      },
    },
    scales: {
      x: {
        type: "time",
        time: {
          unit: "hour",
        },
      },
      y: {
        max: LOCATIONS[locationId].capacity,
      },
    },
  };

  const currentCrowdData = Object.fromEntries(
    Array.from(data.entries()).map(([locationId, crowds]) => {
      const currentCrowd = crowds.reduce((prev, curr) => {
        if (dayjs(curr.datetime).isAfter(dayjs(prev.datetime))) {
          return curr;
        }
        return prev;
      });
      return [locationId, currentCrowd.crowd_level];
    }),
  );

  const dataForDay =
    data.get(locationId)?.filter((crowd) => {
      const localDatetime = dayjs.utc(crowd.datetime).local();
      return (
        localDatetime.isAfter(dayjs().startOf("day")) &&
        localDatetime.isBefore(dayjs().endOf("day"))
      );
    }) ?? [];

  const dataForLocation = dataForDay.map(({ datetime, crowd_level }) => {
    return {
      x: dayjs.utc(datetime).local().toDate(),
      y: crowd_level,
    };
  });

  const dataForLastWeekDay =
    data.get(locationId)?.filter((crowd) => {
      const localDatetime = dayjs.utc(crowd.datetime).local();
      return (
        localDatetime.isAfter(dayjs().subtract(1, "week").startOf("day")) &&
        localDatetime.isBefore(dayjs().subtract(1, "week").endOf("day"))
      );
    }) ?? [];

  const dataForLastWeek = dataForLastWeekDay.map(
    ({ datetime, crowd_level }) => {
      return {
        x: dayjs.utc(datetime).local().add(1, "week").toDate(),
        y: crowd_level,
      };
    },
  );

  // Construct the data for the line graph
  const datasets = [
    {
      label: LOCATIONS[locationId].name,
      data: dataForLocation,
      fill: "origin",
      tension: 0.4,
      pointStyle: "circle",
      pointRadius: 2,
      backgroundColor: "rgba(23, 37, 84, 0.3)",
      borderColor: "rgba(23, 37, 84, 0.5)",
    },
    {
      label: LOCATIONS[locationId].name + " (Last Week)",
      data: dataForLastWeek,
      fill: "origin",
      tension: 0.4,
      backgroundColor: "rgba(134, 118, 255, 0.1)",
      borderColor: "rgba(0, 0, 0, 0)",
      pointStyle: false as const,
    },
  ];

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <>
      <main className="drawer flex h-screen w-screen flex-col-reverse overflow-scroll lg:flex-row lg:overflow-hidden">
        <input
          id="my-drawer-2"
          type="checkbox"
          className="drawer-toggle"
          checked={isDrawerOpen}
        />
        <div className="drawer-side z-20">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
            onClick={() => setIsDrawerOpen(false)}
          ></label>
          <Sidebar
            index={locationId}
            setIndex={setLocationId}
            currentCrowd={currentCrowdData}
          />
        </div>
        <div className="relative flex h-screen min-h-[400px] w-full flex-col items-center">
          <Navbar toggleDrawer={() => setIsDrawerOpen(!isDrawerOpen)} />
          <div className="mt-4 h-4/5 w-full lg:h-4/5 lg:w-4/5">
            <Line options={options} data={{ datasets }} />
          </div>
        </div>
      </main>
    </>
  );
}

export default Home;
