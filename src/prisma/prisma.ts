import { PrismaClient } from "@prisma/client";
import park from "./model/Park.js";
import pointOfInterest from "./model/PointOfInterest.js";

export const prisma = new PrismaClient().$extends({
  model: {
    park,
    pointOfInterest,
  },
});
