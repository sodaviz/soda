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
 * An interface that defines the parameters for a call to the verticalAxis rendering function.
 */
export interface VerticalAxisConfig<A extends Annotation, C extends Chart<any>>
  extends GlyphConfig<A, C> {
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
   * This determines whether the ticks and labels will be placed on the left or the right of the axis.
   */
  axisType?: AxisType.Left | AxisType.Right;
  /**
   * If this is set to true, the axis glyph will not translate or scale during zoom events.
   */
  fixed?: boolean;
  /**
   * The number of bins that the axis will span. This defaults to 1, which forces the axis to fit into one row. If
   * an argument is supplied, it will cause the axis to grow downward. It will have no effect if a custom domain
   * function is supplied.
   */
  rowSpan?: number;
  initializeFn?: (this: VerticalAxisModifier<A, C>) => void;
  zoomFn?: (this: VerticalAxisModifier<A, C>) => void;
}

/**
 * An interface that defines the parameters for instantiating a VerticalAxisModifier.
 * @internal
 */
export type VerticalAxisModifierConfig<
  A extends Annotation,
  C extends Chart<any>
> = GlyphModifierConfig<A, C> & VerticalAxisConfig<A, C>;

/**
 * A class that manages the styling and positioning of a group of vertical axis glyphs.
 * @internal
 */
export class VerticalAxisModifier<
  A extends Annotation,
  C extends Chart<any>
> extends GlyphModifier<A, C> {
  domain: GlyphProperty<A, C, [number, number]>;
  range: GlyphProperty<A, C, [number, number]>;
  rowSpan: number;
  ticks: GlyphProperty<A, C, number>;
  tickSizeOuter: GlyphProperty<A, C, number>;
  axisType: AxisType.Left | AxisType.Right;
  fixed: boolean;

  constructor(config: VerticalAxisModifierConfig<A, C>) {
    super(config);
    this.strokeColor = config.strokeColor || "none";
    this.domain = config.domain || [0, 100];
    this.rowSpan = config.rowSpan || 1;
    this.range = config.range || [0, config.chart.rowHeight * this.rowSpan];
    this.ticks = config.ticks || 5;
    this.tickSizeOuter = config.tickSizeOuter || 6;
    this.axisType = config.axisType || AxisType.Right;
    this.fixed = config.fixed || false;
  }

  defaultZoom(): void {
    this.selection
      .attr(
        "transform",
        (d) =>
          `translate(${resolveValue(this.x, d)}, ${resolveValue(this.y, d)})`
      )
      .each((d, i, nodes) => {
        let yScale = d3
          .scaleLinear()
          .domain(resolveValue(this.domain, d))
          .range(resolveValue(this.range, d));

        let axis = getAxis(yScale, this.axisType);

        axis
          .ticks(resolveValue(this.ticks, d))
          .tickSizeOuter(resolveValue(this.ticks, d));

        d3.select(nodes[i]).call(axis);
      });
  }
}

/**
 * This renders Annotations as vertical axes in a chart. This is intended to be used in conjunction with one of the
 * plotting glyph modules. The vertical axes can be fixed in place, but they are configured to move during zoom
 * events by default.
 * @param config The parameters for configuring the styling of the axes.
 */
export function verticalAxis<A extends Annotation, C extends Chart<any>>(
  config: VerticalAxisConfig<A, C>
): d3.Selection<SVGGElement, string, any, any> {
  let selector = config.selector || generateId("soda-vertical-axis-glyph");
  let internalSelector = selector + "-internal";

  let binding = bind<A, C, SVGGElement>({
    ...config,
    selector,
    internalSelector,
    elementType: "g",
  });

  let modifier = new VerticalAxisModifier({
    selector: internalSelector,
    selection: binding.merge,
    ...config,
  });
  config.chart.addGlyphModifier(modifier);

  return binding.g;
}
