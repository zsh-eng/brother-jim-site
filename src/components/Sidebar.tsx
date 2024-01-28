import React from "react";
import { LOCATIONS } from "~/components/constants";
import CrowdCircle from "./CrowdCircle";
import { FaMapMarkedAlt } from "react-icons/fa";

interface SidebarProps {
  index: LocationId;
  setIndex: (index: LocationId) => void;
  currentCrowd: { [key in LocationId]?: number };
}

const Sidebar: React.FC<SidebarProps> = ({ index, setIndex, currentCrowd }) => {
  return (
    <div className="z-20 flex h-fit w-full flex-row flex-wrap justify-start gap-2 bg-blue-950 p-2 lg:h-full lg:w-[220px] lg:flex-col lg:justify-center lg:overflow-auto lg:rounded-none">
      <div className="flex h-fit w-full items-center gap-1 py-2">
        <FaMapMarkedAlt className="h-4 w-6 text-white" />
        <div className="text-2xl font-bold text-white">Locations</div>
      </div>
      <div className="grid h-fit grid-cols-2 gap-2 lg:grid-cols-1 lg:gap-2">
        {Object.values(LOCATIONS).map(({ name, capacity, locationId }) => (
          <CrowdCircle
            key={name}
            location={name}
            capacity={capacity}
            crowdLevel={currentCrowd[locationId] ?? 0}
            onClick={() => setIndex(locationId)}
            selected={locationId === index}
          />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
