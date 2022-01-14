import * as d3 from "d3";
import { Annotation, AnnotationConfig } from "./annotation";
import { getSliceCoordinates } from "./annotation-utilities";

/**
 * An interface that defines the parameters for initializing a PlotAnnotation.
 */
export interface PlotAnnotationConfig extends AnnotationConfig {
  /**
   * The x values of the plot data.
   */
  xValues?: number[];
  /**
   * The y values of the plot data.
   */
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

  public slice(start: number, end: number): PlotAnnotation | undefined {
    if (this.start < end && this.end > start) {
      let sliceCoords = getSliceCoordinates(this, start, end);
      return new PlotAnnotation({
        id: this.id,
        start: sliceCoords.start,
        end: sliceCoords.end,
        row: this.row,
        xValues: this.points
          .map((p) => p[0])
          .slice(sliceCoords.relativeStart, sliceCoords.relativeEnd),
        yValues: this.points
          .map((p) => p[1])
          .slice(sliceCoords.relativeStart, sliceCoords.relativeEnd),
      });
    } else {
      return undefined;
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
