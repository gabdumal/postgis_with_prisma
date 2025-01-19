import { Park } from "../../types.js";
import { prisma } from "../prisma.js";

const create = async (data: {
  area: { latitude: number; longitude: number }[][];
  name: string;
}) => {
  const park: Park = {
    area: data.area,
    name: data.name,
  };

  const area = `POLYGON(${park.area
    .map(path => {
      return `(${path
        .map(point => `${point.longitude} ${point.latitude}`)
        .join(", ")})`;
    })
    .join(", ")})`;

  await prisma.$queryRaw`
          INSERT INTO "Park" (name, area) VALUES (${park.name}, ST_GeomFromText(${area}, 4326));
        `;

  return park;
};

const findMany = async () => {
  const result = await prisma.$queryRaw<
    {
      area: null | unknown;
      id: number;
      name: string;
    }[]
  >`SELECT "id", "st_asgeojson"("area") AS "area", "name" FROM "Park";`;

  const parks = result.map(park => {
    let area: Park["area"] = [];

    if (park.area) {
      try {
        const parsedJson = JSON.parse(park.area as string) as {
          coordinates: number[][][];
          type: "string";
        };

        area = parsedJson.coordinates.map(path => {
          return path.map(point => {
            return {
              latitude: point[1],
              longitude: point[0],
            };
          });
        });
      } catch (error) {
        console.error(error);
      }
    }

    return {
      area,
      id: park.id,
      name: park.name,
    };
  });

  return parks;
};

export default {
  create,
  findMany,
};
