export interface Point {
  latitude: number;
  longitude: number;
}

export interface PointOfInterest {
  location: Point;
  name: string;
}
