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
  if (selected) {
    return (
      <div
        onClick={onClick}
        className="group flex items-start justify-center gap-2 rounded-2xl bg-blue-500 px-4 py-6 shadow-md transition hover:cursor-pointer hover:shadow-lg active:scale-100 lg:w-48 lg:hover:scale-110"
      >
        {location.includes("Gym") ? (
          <FaDumbbell className="h-16 w-12 text-blue-200 transition-all group-hover:text-white" />
        ) : (
          <FaSwimmer className="h-16 w-16 text-blue-200 transition-all group-hover:text-white" />
        )}
        <div className="flex w-48 flex-col text-white">
          <div className="text-lg font-bold">{location}</div>

          <div className="mt-2 font-semibold">
            {crowdLevel}/{capacity}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={onClick}
      className="group flex items-start justify-center gap-2 rounded-2xl bg-white px-4 py-6 shadow-md transition hover:cursor-pointer hover:shadow-lg active:scale-100 lg:h-full lg:w-48 lg:hover:scale-110"
    >
      {location.includes("Gym") ? (
        <FaDumbbell className="h-16 w-12 text-gray-500 transition-all group-hover:text-blue-950" />
      ) : (
        <FaSwimmer className="h-16 w-16 text-gray-500 transition-all group-hover:text-blue-950" />
      )}
      <div className="flex w-48 flex-col">
        <div className="text-lg font-bold">{location}</div>

        <div className="mt-2 font-semibold text-gray-700">
          {crowdLevel}/{capacity}
        </div>
      </div>
    </div>
  );
};

export default CrowdCircle;
