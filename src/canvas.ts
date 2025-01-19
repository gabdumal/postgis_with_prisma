import { createCanvas } from "canvas";
import fs from "fs";
import { Polygon } from "./types.js";

const canvas = createCanvas(1000, 1000, "svg");
const ctx = canvas.getContext("2d");
ctx.fillStyle = "darkseagreen";
ctx.strokeStyle = "forestgreen";
ctx.lineWidth = 8;

export const exportCanvas = (name: string) => {
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

export const drawPolygon = (polygon: Polygon, closePath = true) => {
  ctx.beginPath();
  polygon.forEach(ring => {
    ring.forEach((point, i) => {
      if (i === 0) {
        ctx.moveTo(point.longitude, point.latitude);
      } else {
        ctx.lineTo(point.longitude, point.latitude);
      }
    });
  });

  if (closePath) {
    ctx.closePath();
  }
  ctx.stroke();
  ctx.fill();
};
