import { PrismaClient } from "@prisma/client";

import { PointOfInterest } from "./types.js";

export const prisma = new PrismaClient().$extends({
  model: {
    pointOfInterest: {
      async create(data: {
        latitude: number;
        longitude: number;
        name: string;
      }) {
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
        await prisma.$queryRaw`
            INSERT INTO "PointOfInterest" (name, location) VALUES (${pointOfInterest.name}, ST_GeomFromText(${point}, 4326));
          `;

        // Return the object
        return pointOfInterest;
      },

      async findClosestPoints(latitude: number, longitude: number) {
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
        const pointsOfInterest: PointOfInterest[] = result.map(data => {
          return {
            location: {
              latitude: (data.st_x as number) || 0,
              longitude: (data.st_y as number) || 0,
            },
            name: data.name,
          };
        });

        // Return data
        return pointsOfInterest;
      },
    },
  },
});
