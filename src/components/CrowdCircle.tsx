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
  const textColor = selected ? "text-white" : "text-black";
  const iconColor = selected
    ? "text-blue-200 group-hover:text-white"
    : "text-gray-500 group-hover:text-blue-950";

  const bgColor = selected ? "bg-blue-500" : "bg-white";

  return (
    <div
      onClick={onClick}
      className={
        "group flex items-start justify-center gap-2 px-4 py-6 shadow-md transition hover:cursor-pointer active:scale-100 lg:h-full lg:w-48 " +
        bgColor
      }
    >
      {location.includes("Gym") ? (
        <FaDumbbell className={"h-16 w-16 transition-all " + iconColor} />
      ) : (
        <FaSwimmer className={"h-16 w-16 transition-all " + iconColor} />
      )}
      <div className="flex w-48 flex-col">
        <div className={"text-lg font-bold " + textColor}>{location}</div>
        <div className={"mt-2 font-semibold " + textColor}>
          {crowdLevel}/{capacity}
        </div>
      </div>
    </div>
  );
};

export default CrowdCircle;
