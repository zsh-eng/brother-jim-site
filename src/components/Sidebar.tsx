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
    <div className="z-0 flex h-full w-48 flex-col justify-center gap-2 bg-blue-950 p-2">
      <div className="flex items-center py-2">
        <FaMapMarkedAlt className="h-4 w-8 text-white" />
        <div className="text-3xl font-bold text-white">Locations</div>
      </div>
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
  );
};

export default Sidebar;
