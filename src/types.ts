export interface Park {
  name: string;
  shape: Polygon;
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
