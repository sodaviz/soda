import * as d3 from "d3";

/**
 * A simple enum to serve as an argument for selecting which D3 Axis function to call.
 */
export enum AxisType {
  Bottom = "bottom",
  Top = "top",
  Left = "left",
  Right = "right",
}

/**
 * A utility function that returns the results of the various d3 axis functions.
 * @param scale
 * @param axisType
 */
export function getAxis(
  scale: d3.ScaleLinear<number, number>,
  axisType: AxisType
): d3.Axis<number | { valueOf(): number }> {
  if (axisType == AxisType.Bottom) {
    return d3.axisBottom(scale);
  } else if (axisType == AxisType.Top) {
    return d3.axisTop(scale);
  } else if (axisType == AxisType.Left) {
    return d3.axisLeft(scale);
  } else if (axisType == AxisType.Right) {
    return d3.axisRight(scale);
  } else {
    throw "Invalid AxisType " + axisType + " on getAxis() call";
  }
}
