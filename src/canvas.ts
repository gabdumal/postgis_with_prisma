import { createCanvas } from "canvas";
import fs from "fs";
import { Polygon } from "./types.js";

const canvas = createCanvas(1000, 1000, "svg");
const ctx = canvas.getContext("2d");
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

export const drawPolygon = (polygon: Polygon) => {
  const hueColor = Math.floor(Math.random() * 360);
  const hueInvertedColor = (hueColor + 180) % 360;

  polygon.forEach(ring => {
    ctx.beginPath();

    ring.forEach((point, i) => {
      if (i === 0) {
        ctx.moveTo(point.longitude, point.latitude);
      } else {
        ctx.lineTo(point.longitude, point.latitude);
      }
    });

    ctx.closePath();

    ctx.strokeStyle = `hsl(${hueInvertedColor}, 100%, 50%)`;
    ctx.stroke();
    ctx.strokeStyle = "transparent";

    ctx.fillStyle = `hsla(${hueColor}, 100%, 50%, 100%)`;
    ctx.fill();
    ctx.fillStyle = "transparent";
  });
};
