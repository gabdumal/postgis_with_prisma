import { prisma } from "./prisma/prisma.js";
import Park from "./test/Park.js";

const main = async (): Promise<void> => {
  //   await PointOfInterest.create();
  //   await PointOfInterest.findClosestPoints();
  //   await Park.create();
  await Park.findMany();
  //   await Park.findUnique();
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
