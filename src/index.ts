import { PrismaClient } from "@prisma/client";

interface MyPoint {
  latitude: number;
  longitude: number;
}

interface MyPointOfInterest {
  name: string;
  location: MyPoint;
}

const prisma = new PrismaClient().$extends({
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
    },
  },
});

const main = async () => {
  console.log(import.meta.url);
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error: unknown) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
