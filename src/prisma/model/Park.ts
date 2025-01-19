import { Park } from "../../types.js";
import { prisma } from "../prisma.js";

const create = async (data: {
  area: {
    latitude: number;
    longitude: number;
  }[][];
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

export default {
  create,
};
