import * as d3 from "d3";
import { Annotation, AnnotationConfig } from "./annotation";

/**
 * A simple interface that holds the arguments for a PlotAnnotation constructor.
 */
export interface PlotAnnotationConfig extends AnnotationConfig {
  /**
   * The point data that will be plotted.
   */
  xValues?: number[];
  yValues: number[];
}

/**
 * An Annotation object that can be used to represent data that should be visualized as a plot.
 */
export class PlotAnnotation extends Annotation {
  /**
   * The individual data points for the plot.
   */
  points: [number, number][];
  minValue: number;
  maxValue: number;
  pointWidth: number;

  constructor(config: PlotAnnotationConfig) {
    super(config);
    let xValues;
    if (config.xValues !== undefined) {
      xValues = config.xValues;
    } else {
      xValues = distributeXValues(
        config.yValues.length,
        this.start,
        this.width
      );
    }
    this.minValue = Math.min(...config.yValues.map((y) => y));
    this.maxValue = Math.max(...config.yValues.map((y) => y));
    this.pointWidth = xValues[1] - xValues[0];

    this.points = [];
    for (let i = 0; i < config.yValues.length; i++) {
      this.points.push([xValues[i], config.yValues[i]]);
    }
  }
}

/**
 * @internal
 */
function distributeXValues(
  nValues: number,
  start: number,
  width: number
): number[] {
  let values = [...Array(nValues).keys()].map((v) => v + start);
  const xScale = d3
    .scaleLinear<number, number>()
    .domain([0, nValues])
    .range([0, width]);

  let xValues = values.map((v) => xScale(v));
  return xValues;
}
