import Park from "./objects/Park.js";
import { prisma } from "./prisma.js";

const main = async () => {
  //   await PointOfInterest.create();
  //   await PointOfInterest.findClosestPoints();
  Park.create();
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
