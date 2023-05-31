import React from "react";
import { FaDumbbell, FaSwimmer } from "react-icons/fa";

type CrowdCircleProps = {
  crowdLevel: number;
  capacity: number;
  location: string;
  onClick?: () => void;
  selected?: boolean;
};

const CrowdCircle: React.FC<CrowdCircleProps> = ({
  crowdLevel,
  capacity,
  location,
  onClick,
  selected,
}) => {
  const occupancyPercentage = (crowdLevel / capacity) * 100;

  if (selected) {
    return (
      <div
        onClick={onClick}
        className="group flex items-start justify-center gap-2 rounded-2xl bg-blue-500 px-4 py-6 shadow-md transition hover:scale-110 hover:cursor-pointer hover:shadow-lg active:scale-100"
      >
        {location.includes("Gym") ? (
          <FaDumbbell className="h-16 w-12 text-blue-200 transition-all group-hover:text-orange-500" />
        ) : (
          <FaSwimmer className="h-16 w-16 text-blue-200 transition-all group-hover:text-cyan-500" />
        )}
        <div className="flex w-48 flex-col text-white">
          <div className="text-lg font-bold">{location}</div>

          <div className="mt-2 font-semibold">
            {crowdLevel}/{capacity}
          </div>

          {/* <div className="mt-2 h-1 w-full bg-blue-500">
          <div
            className="h-full bg-blue-900"
            style={{ width: `${occupancyPercentage}%` }}
          ></div>
        </div> */}
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={onClick}
      className="group flex items-start justify-center gap-2 rounded-2xl bg-white px-4 py-6 shadow-md transition hover:scale-110 hover:cursor-pointer hover:shadow-lg active:scale-100"
    >
      {location.includes("Gym") ? (
        <FaDumbbell className="h-16 w-12 text-gray-500 transition-all group-hover:text-orange-500" />
      ) : (
        <FaSwimmer className="h-16 w-16 text-gray-500 transition-all group-hover:text-cyan-500" />
      )}
      <div className="flex w-48 flex-col">
        <div className="text-lg font-bold">{location}</div>

        <div className="mt-2 font-semibold text-gray-700">
          {crowdLevel}/{capacity}
        </div>

        {/* <div className="mt-2 h-1 w-full bg-blue-500">
          <div
            className="h-full bg-blue-900"
            style={{ width: `${occupancyPercentage}%` }}
          ></div>
        </div> */}
      </div>
    </div>
  );
};

export default CrowdCircle;
