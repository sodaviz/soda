import * as d3 from "d3";
import { Annotation, AnnotationConfig } from "./annotation";

/**
 * An interface that defines the parameters for initializing a ContinuousAnnotation.
 */
export interface ContinuousAnnotationConfig extends AnnotationConfig {
  /**
   * The list of values that describe the continuous data.
   */
  values: number[];
}

/**
 * An Annotation object that can be used to represent data that should be visualized as a plot.
 */
export class ContinuousAnnotation extends Annotation {
  /**
   * The individual data points for the plot.
   */
  points: [number, number][];
  /**
   * The minimum y value in the data points.
   */
  minValue: number;
  /**
   * The maximum y value in the data points.
   */
  maxValue: number;
  /**
   * The distance between two consecutive data points.
   */
  pointWidth: number;

  constructor(config: ContinuousAnnotationConfig) {
    super(config);
    let xValues = distributeXValues(
      config.values.length,
      this.start,
      this.width
    );
    this.minValue = Math.min(...config.values.map((y) => y));
    this.maxValue = Math.max(...config.values.map((y) => y));

    if (config.values.length > 1) {
      this.pointWidth = xValues[1] - xValues[0];
    } else {
      this.pointWidth = 1;
    }

    this.points = [];
    for (let i = 0; i < config.values.length; i++) {
      this.points.push([xValues[i], config.values[i]]);
    }
  }
}

/**
 * A utility function to get distributed x values across the width of a PlotAnnotation.
 * @internal
 */
function distributeXValues(
  nValues: number,
  start: number,
  width: number
): number[] {
  let values = [...Array(nValues).keys()];
  const xScale = d3
    .scaleLinear<number, number>()
    .domain([0, nValues])
    .range([start, start + width]);

  let xValues = values.map((v) => xScale(v));
  return xValues;
}
