import { drawPolygon, exportCanvas } from "../canvas.js";
import prismaPark from "../prisma/model/Park.js";
import { prisma } from "../prisma/prisma.js";

const create = async () => {
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

  await prismaPark.create({
    area: park.area,
    name: park.name,
  });
};

const findMany = async () => {
  const parks = await prisma.park.findMany();
  console.log(JSON.stringify(parks, null, 2));
};

export default { create, findMany };
