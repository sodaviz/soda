import * as d3 from "d3";
import { Chart } from "../../charts/chart";
import { Annotation } from "../../annotations/annotation";
import { AxisType, getAxis } from "../axes";
import { GlyphConfig } from "../../glyph-utilities/glyph-config";
import { generateId } from "../../utilities/id-generation";
import { bind } from "../../glyph-utilities/bind";
import {
  GlyphModifier,
  GlyphModifierConfig,
  GlyphProperty,
  resolveValue,
} from "../../glyph-utilities/glyph-modifier";

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

/**
 * A utility function that returns an Annotation object that is convenient to use for rendering a horizontal axis
 * that spans a Chart's viewport.
 * @param chart
 * @param row
 */
export function getHorizontalAxisAnnotation(
  chart: Chart<any>,
  row = 0
): Annotation {
  return {
    id: "soda-horizontal-axis",
    start: 0,
    end: chart.viewportWidth - 1,
  };
}

/**
 * An interface that defines the parameters for instantiating a HorizontalAxisModifier.
 * @internal
 */
export type HorizontalAxisModifierConfig<
  A extends Annotation,
  C extends Chart<any>
> = GlyphModifierConfig<A, C> & HorizontalAxisConfig<A, C>;

/**
 * A class that manages the styling and positioning of a group of horizontal axis glyphs.
 * @internal
 */
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
        ((d) => [
          d.c.xScale.invert(0),
          d.c.xScale.invert(d.c.viewportWidth - 1),
        ]);
      this.range = config.range || ((d) => [0, d.c.viewportWidth - 1]);
    } else {
      this.domain =
        config.domain ||
        ((d) => [d.a.start, d.a.start + (d.a.end - d.a.start)]);
      this.range =
        config.range ||
        ((d) => [
          d.c.xScale(d.a.start),
          d.c.xScale(d.a.start + (d.a.end - d.a.start)),
        ]);
    }
    this.strokeColor = config.strokeColor || "none";
    this.ticks = config.ticks || 5;
    this.tickSizeOuter = config.tickSizeOuter || 6;
    this.axisType = config.axisType || AxisType.Bottom;
    this.scaleToBinHeight = config.scaleToBinHeight || false;
  }

  defaultZoom(): void {
    this.selection
      .attr("transform", (d) => `translate(0, ${resolveValue(this.y, d)})`)
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
}

/**
 * An interface that defines the parameters for a call to the horizontalAxis rendering function.
 */
export interface HorizontalAxisConfig<
  A extends Annotation,
  C extends Chart<any>
> extends GlyphConfig<A, C> {
  /**
   * This defines the domain of the D3 scale used to create the axis glyph.
   */
  domain?: GlyphProperty<A, C, [number, number]>;
  /**
   * This defines the range of the D3 scale used to create the axis glyph.
   */
  range?: GlyphProperty<A, C, [number, number]>;
  /**
   * This defines the tick property that will be passed to D3's axis.ticks function. For more information, see
   * https://github.com/d3/d3-axis#axis_ticks
   */
  ticks?: GlyphProperty<A, C, number>;
  /**
   * This defines the tick property that will be passed to D3's axis.tickSizeOuter function. For more information, see
   * https://github.com/d3/d3-axis#axis_tickSizeOuter
   */
  tickSizeOuter?: GlyphProperty<A, C, number>;
  /**
   * This determines whether the ticks and labels with be placed on the top or the bottom of the axis.
   */
  axisType?: AxisType.Bottom | AxisType.Top;
  /**
   * If this is set to true, the axis glyph will be forced (by stretching) into the height of a row in the Chart.
   */
  scaleToBinHeight?: boolean;
  /**
   * If this is set to true, the axis glyph will not translate or scale during zoom events.
   */
  fixed?: boolean;
  initializeFn?: (this: HorizontalAxisModifier<A, C>) => void;
  zoomFn?: (this: HorizontalAxisModifier<A, C>) => void;
}

/**
 * This renders Annotations as horizontal axes in a Chart.
 * @param config
 */
export function horizontalAxis<A extends Annotation, C extends Chart<any>>(
  config: HorizontalAxisConfig<A, C>
): d3.Selection<SVGGElement, string, any, any> {
  let selector = config.selector || generateId("soda-horizontal-axis-glyph");
  let internalSelector = selector + "-internal";

  let binding = bind<A, C, SVGGElement>({
    ...config,
    selector,
    internalSelector,
    elementType: "g",
  });

  let modifier = new HorizontalAxisModifier({
    selector: internalSelector,
    selection: binding.merge,
    ...config,
  });

  config.chart.addGlyphModifier(modifier);

  return binding.g;
}
