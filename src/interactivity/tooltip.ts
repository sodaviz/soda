import * as d3 from "d3";
import { Annotation } from "../annotations";
import { Chart } from "../charts/chart";
import { hoverBehavior } from "./hover";
import { AnnotationDatum } from "../glyph-utilities/bind";
import { InteractionConfig } from "./interaction-config";
import {
  GlyphProperty,
  resolveGlyphProperty,
} from "../glyph-utilities/glyph-property";

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
   * The font size of the text.
   */
  fontSize?: GlyphProperty<A, C, number>;
  /**
   * The weight of the font: normal, bold, bolder, lighter. See:
   * https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/font-weight
   */
  fontWeight?: GlyphProperty<A, C, string>;
  /**
   * The font family that will be used. See: https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/font-family
   */
  fontFamily?: GlyphProperty<A, C, string>;
  /**
   * The font style: normal, italic, or oblique. See:
   * https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/font-style
   */
  fontStyle?: GlyphProperty<A, C, string>;
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
    ...config,
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
  let textColor = config.textColor || "black";
  let fontSize = config.fontSize || 10;
  let fontWeight = config.fontWeight || "normal";
  let fontFamily = config.fontFamily || "Titillium Web, Arial, sans-serif";
  let fontStyle = config.fontStyle || "normal";
  let opacity = config.opacity || 1.0;
  let backgroundColor = config.backgroundColor || "lightsteelblue";
  let borderRadius = config.borderRadius || 8;
  let padding = config.padding || 6;

  tooltipSelection
    .style("background-color", resolveGlyphProperty(backgroundColor, d))
    .style("border-radius", resolveGlyphProperty(borderRadius, d) + "px")
    .style("padding", resolveGlyphProperty(padding, d) + "px")
    .interrupt()
    .transition()
    .duration(200)
    .style("opacity", resolveGlyphProperty(opacity, d));

  tooltipSelection
    .html(resolveGlyphProperty(config.text, d))
    .style("color", resolveGlyphProperty(textColor, d))
    .style("font-size", resolveGlyphProperty(fontSize, d))
    .style("font-weight", resolveGlyphProperty(fontWeight, d))
    .style("font-family", resolveGlyphProperty(fontFamily, d))
    .style("font-style", resolveGlyphProperty(fontStyle, d))
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
    .style("opacity", 0)
    .on("end", () => {
      tooltipSelection
        .html("")
        .style("left", "0px")
        .style("top", "0px");
    })
}
