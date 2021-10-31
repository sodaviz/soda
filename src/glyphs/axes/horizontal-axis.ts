import * as d3 from "d3";
import { Chart } from "../../charts/chart";
import { Annotation } from "../../annotations/annotation";
import { AxisType, getAxis } from "../axes";
import { GlyphConfig } from "../glyph-config";
import { generateId } from "../../utilities/id-generation";
import { bind } from "../bind";
import {
  GlyphModifier,
  GlyphModifierConfig,
  GlyphProperty,
  resolveValue,
} from "../glyph-modifier";

/**
 * @internal
 */
const horizontalAxisAxisMap: Map<
  String,
  d3.Axis<number | { valueOf(): number }>
> = new Map();
/**
 * @internal
 */
const horizontalAxisScaleMap: Map<
  String,
  d3.ScaleLinear<number, number>
> = new Map();

export function getHorizontalAxisAnnotation(
  chart: Chart<any>,
  row = 0
): Annotation {
  return new Annotation({
    id: "soda-horizontal-axis",
    start: 0,
    width: chart.viewportWidth,
    row: row,
  });
}

export function defaultHorizontalAxisInitialize<
  A extends Annotation,
  C extends Chart<any>
>(this: HorizontalAxisModifier<A, C>): void {
  this.setId();
  this.zoom();
}

export function defaultHorizontalAxisZoom<
  A extends Annotation,
  C extends Chart<any>
>(this: HorizontalAxisModifier<A, C>): void {
  this.selection
    .attr("transform", (d) => `translate(1, ${resolveValue(this.y, d)})`)
    .each((d, i, nodes) => {
      let xScale = d3
        .scaleLinear()
        .domain(resolveValue(this.domain, d))
        .range(resolveValue(this.range, d));

      let axis = getAxis(xScale, this.axisType);

      axis
        .ticks(resolveValue(this.ticks, d))
        .tickSizeOuter(resolveValue(this.tickSizeOuter, d));

      d3.select(nodes[i]).call(axis);

      horizontalAxisScaleMap.set(d.a.id, xScale);
      horizontalAxisAxisMap.set(d.a.id, axis);

      if (this.scaleToBinHeight) {
        let gBound = nodes[i].getBBox();
        let k = this.chart.rowHeight / gBound.height;
        d3.select(nodes[i]).attr("transform", `scale(1, ${k})`);
      }
    });
}

export type HorizontalAxisModifierConfig<
  A extends Annotation,
  C extends Chart<any>
> = GlyphModifierConfig<A, C> & HorizontalAxisConfig<A, C>;

export class HorizontalAxisModifier<
  A extends Annotation,
  C extends Chart<any>
> extends GlyphModifier<A, C> {
  domain: GlyphProperty<A, C, [number, number]>;
  range: GlyphProperty<A, C, [number, number]>;
  ticks: GlyphProperty<A, C, number>;
  tickSizeOuter: GlyphProperty<A, C, number>;
  axisType: AxisType.Bottom | AxisType.Top;
  scaleToBinHeight: boolean;

  constructor(config: HorizontalAxisModifierConfig<A, C>) {
    super(config);
    if (config.fixed) {
      this.domain =
        config.domain ||
        ((d) => [d.c.xScale.invert(0), d.c.xScale.invert(d.c.viewportWidth)]);
      this.range = config.range || ((d) => [0, d.c.viewportWidth]);
    } else {
      this.domain = config.domain || ((d) => [d.a.x, d.a.x + d.a.w]);
      this.range =
        config.range || ((d) => [d.c.xScale(d.a.x), d.c.xScale(d.a.x + d.a.w)]);
    }
    this.ticks = config.ticks || 5;
    this.tickSizeOuter = config.tickSizeOuter || 6;
    this.axisType = config.axisType || AxisType.Bottom;
    this.scaleToBinHeight = config.scaleToBinHeight || false;

    this.initializeFn = defaultHorizontalAxisInitialize;
    this.zoomFn = defaultHorizontalAxisZoom;
  }
}

/**
 * An interface that holds the parameters to style a horizontal axis.
 */
export interface HorizontalAxisConfig<
  A extends Annotation,
  C extends Chart<any>
> extends GlyphConfig<A, C> {
  domain?: GlyphProperty<A, C, [number, number]>;
  range?: GlyphProperty<A, C, [number, number]>;
  ticks?: GlyphProperty<A, C, number>;
  tickSizeOuter?: GlyphProperty<A, C, number>;
  axisType?: AxisType.Bottom | AxisType.Top;
  scaleToBinHeight?: boolean;
  fixed?: boolean;
  fixedRange?: GlyphProperty<A, C, [number, number]>;
  /**
   *
   */
  initializeFn?: (this: HorizontalAxisModifier<A, C>) => void;
  /**
   *
   */
  zoomFn?: (this: HorizontalAxisModifier<A, C>) => void;
}

/**
 * This renders Annotations as horizontal axes in a chart.
 * @param chart The Chart in which we will render the axes.
 * @param ann The Annotations to be rendered.
 * @param config The parameters for configuring the styling of the axes.
 */
export function horizontalAxis<A extends Annotation, C extends Chart<any>>(
  config: HorizontalAxisConfig<A, C>
): d3.Selection<SVGGElement, string, any, any> {
  let selector = config.selector || generateId("soda-horizontal-axis-glyph");
  let internalSelector = generateId("soda-horizontal-axis-glyph-internal");

  let binding = bind<A, C, SVGGElement>(selector, "g", config);

  let modifier = new HorizontalAxisModifier({
    selector: internalSelector,
    selection: binding.merge,
    ...config,
  });

  config.chart.addGlyphModifier(modifier);

  return binding.g;
}
