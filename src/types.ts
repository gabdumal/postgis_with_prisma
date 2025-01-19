export interface Park {
  area: Polygon;
  name: string;
}

export interface Point {
  latitude: number;
  longitude: number;
}

export interface PointOfInterest {
  location: Point;
  name: string;
}

export type Polygon = Point[][];
