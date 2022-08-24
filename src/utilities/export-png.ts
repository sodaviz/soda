import * as d3 from "d3";
import { Chart } from "../charts/chart";

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
    if (canvas == undefined) {
      throw "canvas node undefined in image.onload event during exportPng()";
    }
    context.drawImage(image, 0, 0);
    saveAs(canvas.toDataURL(), filename);
  };

  image.src = url;
}

/**
 * This saves a URL to a blob as a local file.
 * @param url
 * @param filename
 */
function saveAs(url: string, filename: string) {
  // This code was adapted from https://github.com/eligrey/FileSaver.js/
  //
  // The source code in this function is licensed under the MIT license.
  //
  // For posterity, we will maintain the original license here:
  //
  // The MIT License
  //
  // Copyright © 2016 Eli Grey.
  //
  // Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
  // documentation files (the "Software"), to deal in the Software without restriction, including without limitation
  // the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and
  // to permit persons to whom the Software is furnished to do so, subject to the following conditions:  The above
  // copyright notice and this permission notice shall be included in all copies or substantial portions of the
  // Software.  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT
  // LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT
  // SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
  // OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
  // DEALINGS IN THE SOFTWARE

  let xhr = new XMLHttpRequest();
  xhr.open("GET", url);
  xhr.responseType = "blob";

  xhr.onload = function (this) {
    let blob: Blob = this.response;
    // make an anchor element that we can trigger the download from
    let a = document.createElement("a");
    a.download = filename;
    // this provides some defense against tabnabbing
    a.rel = "noopener";
    a.href = URL.createObjectURL(blob);

    // trigger the download by simulating a click
    a.click();

    // perform a little cleanup
    URL.revokeObjectURL(a.href);
  };

  xhr.onerror = function () {
    console.error("could not download file");
  };

  xhr.send();
}
