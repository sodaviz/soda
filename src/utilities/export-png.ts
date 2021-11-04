import * as d3 from "d3";
import { Chart } from "../charts/chart";
import { saveAs } from "file-saver";

/**
 * An interface that defines the parameters for a call to the exportPng function.
 */
export interface ExportConfig<C extends Chart<any>> {
  /**
   * The Chart to export.
   */
  chart: C;
  /**
   * The filename for the exported PNG.
   */
  filename?: string;
  /**
   * The pixel ratio of the rendered PNG. Using a number larger than 1 will over-render the PNG, making it larger.
   * Using smaller numbers currently has strange behavior, and it's not recommended.
   */
  pixelRatio?: number;
}

/**
 * Save the current view in a chart as a PNG image.
 * @param config
 */
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
