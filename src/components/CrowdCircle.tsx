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
        className="group flex flex-1 flex-col items-start justify-center rounded-2xl bg-cyan-700 px-4 py-6 shadow-md transition hover:scale-110 hover:cursor-pointer hover:shadow-lg active:scale-100"
      >
        {location.includes("Gym") ? (
          <FaDumbbell className="h-16 w-12 text-white transition-all group-hover:text-orange-500" />
        ) : (
          <FaSwimmer className="h-16 w-16 text-white transition-all group-hover:text-cyan-500" />
        )}

        <div className="text-lg text-white font-bold">{location}</div>

        <div className="mt-2 font-semibold text-gray-200">
          {crowdLevel}/{capacity}
        </div>

        <div className="mt-2 h-1 w-full bg-gray-200">
          <div
            className="h-full bg-blue-500"
            style={{ width: `${occupancyPercentage}%` }}
          ></div>
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={onClick}
      className="group flex flex-1 flex-col items-start justify-center rounded-2xl bg-white px-4 py-6 shadow-md transition hover:scale-110 hover:cursor-pointer hover:shadow-lg active:scale-100"
    >
      {location.includes("Gym") ? (
        <FaDumbbell className="h-16 w-12 text-gray-500 transition-all group-hover:text-orange-500" />
      ) : (
        <FaSwimmer className="h-16 w-16 text-gray-500 transition-all group-hover:text-cyan-500" />
      )}

      <div className="text-lg font-bold">{location}</div>

      <div className="mt-2 font-semibold text-gray-700">
        {crowdLevel}/{capacity}
      </div>

      <div className="mt-2 h-1 w-full bg-blue-500">
        <div
          className="h-full bg-blue-900"
          style={{ width: `${occupancyPercentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default CrowdCircle;
