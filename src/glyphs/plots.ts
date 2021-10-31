import { Chart } from "../charts/chart";
import * as d3 from "d3";
import { PlotAnnotation } from "../annotations/plot-annotation";

export * from "./plots/bar-plot";
export * from "./plots/line-plot";
export * from "./plots/heatmap";

/**
 * @internal
 */
export interface YScaleConfig<A extends PlotAnnotation, C extends Chart<any>> {
  chart: C;
  annotations: A[];
  binSpan?: number;
  rangeStart?: (a: A, c: C) => number;
  rangeEnd?: (a: A, c: C) => number;
  domainStart?: (a: A, c: C) => number;
  domainEnd?: (a: A, c: C) => number;
}

/**
 * @internal
 * @param map
 * @param config
 */
export function setYScales<A extends PlotAnnotation, C extends Chart<any>>(
  map: Map<string, d3.ScaleLinear<number, number>>,
  config: YScaleConfig<A, C>
): void {
  let binSpan = config.binSpan || 1;
  let rangeStart = config.rangeStart || (() => 0);
  let rangeEnd = config.rangeEnd || ((a: A, c: C) => c.rowHeight * binSpan);
  let domainStart = config.domainStart || (() => 0);
  let domainEnd = config.domainEnd || ((a: A) => a.maxValue);

  for (const a of config.annotations) {
    map.set(
      a.id,
      d3
        .scaleLinear()
        .domain([domainStart(a, config.chart), domainEnd(a, config.chart)])
        .range([rangeStart(a, config.chart), rangeEnd(a, config.chart)])
    );
  }
}
