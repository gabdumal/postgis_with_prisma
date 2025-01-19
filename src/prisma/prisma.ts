import { PrismaClient } from "@prisma/client";
import { pointOfInterest } from "./model/PointOfInterest.js";

export const prisma = new PrismaClient().$extends({
  model: {
    pointOfInterest,
  },
});
