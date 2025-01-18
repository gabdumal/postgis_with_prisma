import { PrismaClient } from "@prisma/client";
import { MyPointOfInterest } from "./types.js";

export const prisma = new PrismaClient().$extends({
  model: {
    pointOfInterest: {
      async create(data: {
        name: string;
        latitude: number;
        longitude: number;
      }) {
        // Create an object using the custom types from above
        const poi: MyPointOfInterest = {
          location: {
            latitude: data.latitude,
            longitude: data.longitude,
          },
          name: data.name,
        };

        // Insert the object into the database
        const point = `POINT(${poi.location.longitude} ${poi.location.latitude})`;
        await prisma.$queryRaw`
            INSERT INTO "PointOfInterest" (name, location) VALUES (${poi.name}, ST_GeomFromText(${point}, 4326));
          `;

        // Return the object
        return poi;
      },

      async findClosestPoints(latitude: number, longitude: number) {
        // Query for closest points of interests
        const result = await prisma.$queryRaw<
          {
            id: number;
            name: string;
            st_x: unknown | null;
            st_y: unknown | null;
          }[]
        >`SELECT id, name, ST_X(location::geometry), ST_Y(location::geometry) 
            FROM "PointOfInterest" 
            ORDER BY ST_DistanceSphere(location::geometry, ST_MakePoint(${longitude}, ${latitude})) DESC`;

        // Transform to our custom type
        const pois: MyPointOfInterest[] = result.map(data => {
          return {
            name: data.name,
            location: {
              latitude: (data.st_x as number) || 0,
              longitude: (data.st_y as number) || 0,
            },
          };
        });

        // Return data
        return pois;
      },
    },
  },
});
