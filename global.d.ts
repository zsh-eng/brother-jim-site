type LocationId = 25 | 41 | 26 | 20 | 39;

type LocationData = {
  name: string;
  capacity: number;
  locationId: LocationId;
};

// Raw crowd data from DyanamoDB
type RawCrowdData = {
  location: number;
  timestamp: string;
  capacity: string;
  crowd_level: string;
};

type ProcessedCrowdData = {
  timestamp: string;
  capacity: number;
  crowd_level: number;
};

type LocationCrowdData = {
  locationId: LocationId;
  presentCrowd: ProcessedCrowdData[];
  pastWeekCrowd: ProcessedCrowdData[];
};

// Type of Crowd API Response body
type CrowdApiRes = {
  [key in LocationId]?: LocationCrowdData;
};
