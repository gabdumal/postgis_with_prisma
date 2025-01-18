import { prisma } from "./prisma.js";

const main = async () => {
  //   await prisma.pointOfInterest.create({
  //     name: "Statue of Liberty",
  //     latitude: 40.6892,
  //     longitude: -74.0445,
  //   });

  const pois = await prisma.pointOfInterest.findClosestPoints(0, 0);
  console.log(pois);
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
