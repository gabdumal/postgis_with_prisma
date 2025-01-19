import { prisma } from "../prisma/prisma.js";

const create = async (): Promise<void> => {
  const pointOfInterest = await prisma.pointOfInterest.create({
    latitude: 40.6892,
    longitude: -74.0445,
    name: "Statue of Liberty",
  });
  console.log(pointOfInterest);
};

const findClosestPoints = async (): Promise<void> => {
  const pointsOfInterest = await prisma.pointOfInterest.findClosestPoints(0, 0);
  console.log(pointsOfInterest);
};

export default {
  create,
  findClosestPoints,
};
