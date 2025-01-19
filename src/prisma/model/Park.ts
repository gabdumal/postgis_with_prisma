import { Park } from "../../types.js";

const create = async (data: { name: string }) => {
  // Create an object using the custom types from above
  const park: Park = {
    name: data.name,
  };

  const shape = `POLYGON(${park.shape
    .map(point => point.map(p => `${p.longitude} ${p.latitude}`).join(","))
    .join(",")})`;

  // Insert the object into the database
  await prisma.$queryRaw`
        INSERT INTO "Park" (name, shape) VALUES (${park.name}, ST_GeomFromText(${point}, 4326));
      `;

  // Return the object
  return pointOfInterest;
};
