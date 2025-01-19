import { prisma } from "./prisma.js";

const create = async () => {
  const pointOfInterest = await prisma.pointOfInterest.create({
    latitude: 40.6892,
    longitude: -74.0445,
    name: "Statue of Liberty",
  });
  console.log(pointOfInterest);
};

const findClosestPoints = async () => {
  const pointsOfInterest = await prisma.pointOfInterest.findClosestPoints(0, 0);
  console.log(pointsOfInterest);
};

const main = async () => {
  //   await create();
  await findClosestPoints();
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
