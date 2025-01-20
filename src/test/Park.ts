import { drawPolygon, exportCanvas } from "../canvas.js";
import { prisma } from "../prisma/prisma.js";

const create = async (): Promise<void> => {
  const park = await prisma.park.create({
    area: [
      [
        { latitude: -100, longitude: -100 },
        { latitude: -100, longitude: 0 },
        { latitude: 0, longitude: 0 },
        { latitude: 0, longitude: -100 },
        { latitude: -100, longitude: -100 },
      ],
      [
        { latitude: -70, longitude: -70 },
        { latitude: -70, longitude: 90 },
        { latitude: 90, longitude: 90 },
        { latitude: 90, longitude: -70 },
        { latitude: -70, longitude: -70 },
      ],
      [
        { latitude: -50, longitude: -50 },
        { latitude: -50, longitude: 70 },
        { latitude: 70, longitude: 70 },
        { latitude: 70, longitude: -50 },
        { latitude: -50, longitude: -50 },
      ],
    ],
    name: "Ibirapuera",
  });

  drawPolygon(park.area);
  exportCanvas(park.name);

  console.log(JSON.stringify(park, null, 2));
};

const findMany = async (): Promise<void> => {
  const parks = await prisma.park.findMany();
  console.log(JSON.stringify(parks, null, 2));
};

const findUnique = async (): Promise<void> => {
  const park = await prisma.park.findUnique({
    where: {
      id: 1,
    },
  });
  console.log(JSON.stringify(park, null, 2));
};

export default { create, findMany, findUnique };
