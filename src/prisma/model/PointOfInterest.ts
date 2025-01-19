import { PointOfInterest } from "../../types.js";
import { prisma } from "../prisma.js";

const create = async (data: {
  latitude: number;
  longitude: number;
  name: string;
}): Promise<PointOfInterest & { id: number }> => {
  // Create an object using the custom types from above
  const pointOfInterest: PointOfInterest = {
    location: {
      latitude: data.latitude,
      longitude: data.longitude,
    },
    name: data.name,
  };

  const point = `POINT(${pointOfInterest.location.longitude} ${pointOfInterest.location.latitude})`;

  // Insert the object into the database
  const id = await prisma.$queryRaw<{ id: number }[]>`
  INSERT INTO "PointOfInterest" (name, location)
    VALUES (${pointOfInterest.name}, ST_GeomFromText(${point}, 4326))
    RETURNING id;`;

  // Return the object
  return {
    id: id[0].id,
    ...pointOfInterest,
  };
};

const findClosestPoints = async (
  latitude: number,
  longitude: number,
): Promise<(PointOfInterest & { id: number })[]> => {
  // Query for closest points of interests
  const result = await prisma.$queryRaw<
    {
      id: number;
      name: string;
      st_x: null | unknown;
      st_y: null | unknown;
    }[]
  >`SELECT id, name, ST_X(location::geometry), ST_Y(location::geometry) 
        FROM "PointOfInterest" 
        ORDER BY ST_DistanceSphere(location::geometry, ST_MakePoint(${longitude}, ${latitude})) DESC`;

  // Transform to our custom type
  const pointsOfInterest = result.map(data => {
    return {
      id: data.id,
      location: {
        latitude: (data.st_x as number) || 0,
        longitude: (data.st_y as number) || 0,
      },
      name: data.name,
    };
  });

  // Return data
  return pointsOfInterest;
};

export default {
  create,
  findClosestPoints,
};
