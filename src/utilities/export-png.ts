import * as d3 from "d3";
import { Chart } from "../charts/chart";
import { saveAs } from "file-saver";

export interface ExportConfig<C extends Chart<any>> {
  chart: C;
  filename?: string;
  pixelRatio?: number;
}

export function exportPng<C extends Chart<any>>(config: ExportConfig<C>): void {
  let filename = config.filename || "soda-chart.png";
  let pixelRatio = config.pixelRatio || window.devicePixelRatio || 1;

  if (pixelRatio < 1) {
    console.warn(
      "pixelRatio < 1 in exportPng(), this probably won't work well"
    );
  }

  let chartSvg = config.chart.padSelection.node();
  let canvas = d3.create<HTMLCanvasElement>("canvas").node();
  if (canvas == undefined) {
    throw "canvas node undefined after initialization during exportPng()";
  }

  let chartBound = chartSvg.getBoundingClientRect();
  canvas.width = chartBound.width * pixelRatio;
  canvas.height = chartBound.height * pixelRatio;

  let context = canvas.getContext("2d");
  if (context == undefined) {
    throw "canvas context undefined after initialization during exportPng()";
  }
  context.scale(pixelRatio, pixelRatio);

  let blob = new Blob([chartSvg.outerHTML], { type: "image/svg+xml" });
  let url = URL.createObjectURL(blob);
  let image = new Image();

  image.onload = () => {
    if (context == undefined) {
      throw "canvas context undefined in image.onload event callback during exportPng()";
    }
    context.drawImage(image, 0, 0);
    if (canvas == undefined) {
      throw "canvas node undefined in image.onload event during exportPng()";
    }
    saveAs(canvas.toDataURL(), filename);
  };

  image.src = url;
}
