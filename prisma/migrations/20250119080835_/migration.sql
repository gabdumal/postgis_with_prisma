-- CreateTable
CREATE TABLE "Park" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "area" Geometry(Polygon, 4326) NOT NULL,

    CONSTRAINT "Park_pkey" PRIMARY KEY ("id")
);
