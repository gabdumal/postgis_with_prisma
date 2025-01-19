import { Park } from "../../types.js";
import { prisma } from "../prisma.js";

const create = async (data: {
  area: { latitude: number; longitude: number }[][];
  name: string;
}): Promise<Park & { id: number }> => {
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

  const id = await prisma.$queryRaw<
    { id: null | number }[]
  >`INSERT INTO "Park" (name, area) VALUES (${park.name}, ST_GeomFromText(${area}, 4326)) RETURNING id;`;

  if (!id[0].id) {
    throw new Error("Failed to create park");
  }

  return {
    id: id[0].id,
    ...park,
  };
};

const parseFindResult = (
  result: {
    area: null | unknown;
    id: number;
    name: string;
  }[],
): (Park & { id: number })[] =>
  result.map(park => {
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

const findMany = async (): Promise<(Park & { id: number })[]> => {
  const result = await prisma.$queryRaw<
    {
      area: null | unknown;
      id: number;
      name: string;
    }[]
  >`SELECT "id", "st_asgeojson"("area") AS "area", "name" FROM "Park";`;

  const parks = parseFindResult(result);
  return parks;
};

const findUnique = async ({
  where,
}: {
  where: { id: number };
}): Promise<Park & { id: number }> => {
  const result = await prisma.$queryRaw<
    {
      area: null | unknown;
      id: number;
      name: string;
    }[]
  >`SELECT "id", ST_AsGeoJSON("area") AS "area", "name" FROM "Park" WHERE "id" = ${where.id};`;

  const parks = parseFindResult(result);

  if (!parks[0]) {
    throw new Error("Park not found");
  }
  return parks[0];
};

export default {
  create,
  findMany,
  findUnique,
};
