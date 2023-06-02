import React from "react";
import { LOCATIONS } from "~/pages/constants";
import CrowdCircle from "./CrowdCircle";
import { FaMapMarkedAlt } from "react-icons/fa";

interface SidebarProps {
  index: number;
  setIndex: (index: number) => void;
  currentCrowd: number[];
}

const Sidebar: React.FC<SidebarProps> = ({ index, setIndex, currentCrowd }) => {
  return (
    <div className="z-0 flex h-full w-48 flex-col justify-center gap-2 bg-blue-950 p-2">
      <div className="flex items-center py-2">
        <FaMapMarkedAlt className="h-4 w-8 text-white" />
        <div className="text-3xl font-bold text-white">Locations</div>
      </div>
      {LOCATIONS.map(({ name, capacity }, i) => (
        <CrowdCircle
          key={name}
          location={name}
          capacity={capacity}
          crowdLevel={currentCrowd[i] ?? 0}
          onClick={() => setIndex(i)}
          selected={i === index}
        />
      ))}
    </div>
  );
};

export default Sidebar;
