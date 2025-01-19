import { drawPolygon, exportCanvas } from "../canvas.js";
import { Park } from "../types.js";

const create = () => {
  const park: Park = {
    name: "Ibirapuera",
    shape: [
      [
        { latitude: 100, longitude: 100 },
        { latitude: 100, longitude: 900 },
        { latitude: 900, longitude: 900 },
        { latitude: 900, longitude: 100 },
        { latitude: 100, longitude: 100 },
      ],
      [
        { latitude: 200, longitude: 200 },
        { latitude: 200, longitude: 800 },
        { latitude: 800, longitude: 800 },
        { latitude: 800, longitude: 200 },
        { latitude: 200, longitude: 200 },
      ],
    ],
  };
  drawPolygon(park.shape);
  exportCanvas(park.name);
};

export default { create };
