const LocationKeys = ['UTown Pool', 'USC Pool', 'UTown Gym', 'MPSH3 Gym', 'USC Gym'] as const
type Locations = typeof LocationKeys[number]
