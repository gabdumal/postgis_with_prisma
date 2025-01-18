export interface MyPoint {
  latitude: number;
  longitude: number;
}

export interface MyPointOfInterest {
  name: string;
  location: MyPoint;
}
