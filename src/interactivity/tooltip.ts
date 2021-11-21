import * as d3 from "d3";
import { Annotation } from "../annotations";
import { Chart } from "../charts/chart";
import { hoverBehavior } from "./hover";
import { GlyphProperty, resolveValue } from "../glyphs/glyph-modifier";
import { AnnotationDatum } from "../glyphs/bind";
import { InteractionConfig } from "./interaction-config";

/**
 * @internal
 */
let tooltipDivInitialized: boolean = false;
/**
 * @internal
 */
let tooltipSelection: d3.Selection<any, any, any, any>;

/**
 * @internal
 */
function initTooltipDiv(): void {
  if (!tooltipDivInitialized) {
    tooltipSelection = d3
      .select("body")
      .append("div")
      .attr("class", "soda-tooltip")
      .style("background-color", "lightsteelblue")
      .style("border-radius", "8px")
      .style("padding", "4px")
      .style("position", "absolute")
      .style("opacity", 0);

    tooltipDivInitialized = true;
    return;
  }
}

/**
 * An interface that defines the parameters for a call to the tooltip function.
 */
export interface TooltipConfig<A extends Annotation, C extends Chart<any>>
  extends InteractionConfig<A, C> {
  /**
   * This defines the text for the tooltip.
   * @param a The Annotation object.
   * @param c The Chart that the glyph has been rendered in.
   */
  text: GlyphProperty<A, C, string>;
  /**
   * This defines the tooltip text color.
   * @param a The Annotation object.
   * @param c The Chart that the glyph has been rendered in.
   */
  textColor?: GlyphProperty<A, C, string>;
  /**
   * This defines the opacity of the tooltip.
   * @param a The Annotation object.
   * @param c The Chart that the glyph has been rendered in.
   */
  opacity?: GlyphProperty<A, C, number>;
  /**
   * This defines the background color of the tooltip.
   * @param a The Annotation object.
   * @param c The Chart that the glyph has been rendered in.
   */
  backgroundColor?: GlyphProperty<A, C, string>;
  /**
   * This defines the border radius of the tooltip.
   * @param a The Annotation object.
   * @param c The Chart that the glyph has been rendered in.
   */
  borderRadius?: GlyphProperty<A, C, number>;
  /**
   * This defines the CSS padding of the tooltip.
   * @param a The Annotation object.
   * @param c The Chart that the glyph has been rendered in.
   */
  padding?: GlyphProperty<A, C, number>;
}

/**
 * This applies tooltip interactions to a list of Annotations.
 * @param config The Annotation whose representative glyph we are binding the tooltip to.
 */
export function tooltip<A extends Annotation, C extends Chart<any>>(
  config: TooltipConfig<A, C>
) {
  initTooltipDiv();
  hoverBehavior<A, C>({
    annotations: config.annotations,
    mouseover: (s, d) => {
      defaultTooltipMouseover(s, d, config);
    },
    mouseout: () => {
      defaultTooltipMouseout();
    },
  });
}

/**
 * The default tooltip mouseover callback function. It moves the tooltip div to the appropriate spot and then uses
 * the config to style the tooltip.
 * @param s
 * @param d
 * @param config The config to be applied to the tooltip.
 * @internal
 */
export function defaultTooltipMouseover<
  A extends Annotation,
  C extends Chart<any>
>(s: any, d: AnnotationDatum<A, C>, config: TooltipConfig<A, C>): void {
  const opacity = config.opacity || 1.0;
  const backgroundColor = config.backgroundColor || "lightsteelblue";
  const textColor = config.textColor || "black";
  const borderRadius = config.borderRadius || 8;
  const padding = config.padding || 4;

  tooltipSelection
    .style("background-color", resolveValue(backgroundColor, d))
    .style("border-radius", resolveValue(borderRadius, d) + "px")
    .style("padding", resolveValue(padding, d) + "px")
    .transition()
    .duration(200)
    .style("opacity", resolveValue(opacity, d));

  tooltipSelection
    .html(resolveValue(config.text, d))
    .style("color", resolveValue(textColor, d))
    .style("left", d3.event.pageX + "px")
    .style("top", d3.event.pageY + 20 + "px");
}

/**
 * The default tooltip mouseout callback function. It just moves the tooltip div out of the way, shrinks it, and
 * makes it invisible.
 * @internal
 */
export function defaultTooltipMouseout<A extends Annotation>(): void {
  // prettier-ignore
  tooltipSelection
    .transition()
    .duration(500)
    .style("opacity", 0);
  // prettier-ignore
  tooltipSelection
    .html("")
    .style("left", "0px")
    .style("top", "0px");
}
