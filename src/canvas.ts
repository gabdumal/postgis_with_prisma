import { createCanvas } from "canvas";
import fs from "fs";
import { Point, Polygon } from "./types.js";

const canvas = createCanvas(200, 200, "svg");
const ctx = canvas.getContext("2d");
ctx.lineWidth = 2;

const normalizeCoordinate = (
  coordinate: {
    latitude: number;
    longitude: number;
  },
  system = {
    horizontalOffset: -100,
    verticalOffset: -100,
  },
): Point => {
  return {
    latitude: coordinate.latitude - system.verticalOffset,
    longitude: coordinate.longitude - system.horizontalOffset,
  };
};

export const exportCanvas = (name: string): void => {
  fs.writeFile(
    `${import.meta.dirname}/../images/${name}.svg`,
    canvas.toBuffer(),
    null,
    () => {
      console.log("The SVG file was created.");
    },
  );
  ctx.clearRect(0, 0, canvas.width, canvas.height);
};

export const drawPolygon = (polygon: Polygon): void => {
  const hueColor = Math.floor(Math.random() * 360);
  const hueInvertedColor = (hueColor + 180) % 360;

  polygon.forEach(ring => {
    ctx.beginPath();

    ring.forEach((point, i) => {
      const normalizedPoint = normalizeCoordinate(point);
      if (i === 0) {
        ctx.moveTo(normalizedPoint.longitude, normalizedPoint.latitude);
      } else {
        ctx.lineTo(normalizedPoint.longitude, normalizedPoint.latitude);
      }
    });

    ctx.closePath();

    ctx.fillStyle = `hsla(${hueColor}, 100%, 50%, 100%)`;
    ctx.fill();
    ctx.fillStyle = "transparent";

    ctx.strokeStyle = `hsl(${hueInvertedColor}, 100%, 50%)`;
    ctx.stroke();
    ctx.strokeStyle = "transparent";
  });
};
