import { SequenceAnnotation } from "../annotations/sequence-annotation";
import { Chart } from "../charts/chart";
import * as d3 from "d3";
import { generateId } from "../utilities/id-generation";
import { AnnotationDatum, bind } from "../glyph-utilities/bind";
import {
  GlyphModifier,
  GlyphModifierConfig,
} from "../glyph-utilities/glyph-modifier";
import { GlyphConfig } from "../glyph-utilities/glyph-config";
import { callbackifyOrDefault } from "../glyph-utilities/glyph-property";

/**
 * An interface that defines the parameters for a call to the sequence rendering function.
 */
export interface SequenceConfig<
  S extends SequenceAnnotation,
  C extends Chart<any>
> extends GlyphConfig<S, C> {}

/**
 * A class that manages the styling and positioning of a group of sequence glyphs.
 * @internal
 */
export class SequenceModifier<
  S extends SequenceAnnotation,
  C extends Chart<any>
> extends GlyphModifier<S, C> {
  offset: number = 0;

  constructor(config: GlyphModifierConfig<S, C> & SequenceConfig<S, C>) {
    super(config);

    this.x = callbackifyOrDefault(
      config.x,
      (d: AnnotationDatum<S, C>) => d.c.xScale(d.a.start) - this.offset
    );

    this.initializePolicy.attributeRuleMap.set("group", [
      { key: "id", property: this.id },
      { key: "y", property: this.y },
    ]);

    this.initializePolicy.styleRuleMap.set("group", [
      { key: "font-family", property: "monospace" },
      { key: "dominant-baseline", property: "hanging" },
      { key: "stroke-width", property: config.strokeWidth },
      { key: "stroke-opacity", property: config.strokeOpacity },
      { key: "stroke", property: config.strokeColor },
      { key: "stroke-dash-array", property: config.strokeDashArray },
      { key: "stroke-dash-offset", property: config.strokeDashOffset },
      { key: "fill", property: config.fillColor },
      { key: "fill-opacity", property: config.fillOpacity },
    ]);

    this.zoomPolicy.attributeRuleMap.set("group", [
      { key: "x", property: this.x },
      {
        key: "textLength",
        property: (d) =>
          d.c.xScale(d.a.start + (d.a.end - d.a.start) - 1) -
          d.c.xScale(d.a.start) +
          2 * this.offset,
      },
    ]);

    this.updateOffset();
  }

  initialize() {
    super.initialize();
    this.selection.text((d) => d.a.sequence);
  }

  zoom() {
    super.zoom();
    this.updateOffset();
  }

  updateOffset() {
    let selection = d3.select("body").append("svg");

    let width = selection
      .append("text")
      .text("A")
      .attr("font-family", "monospace")
      .node()!
      .getComputedTextLength();

    selection.remove();
    this.offset = width / 2;
  }
}

/**
 * This renders a list of SequenceAnnotation objects as sequence glyphs in a Chart.
 * @param config
 */
export function sequence<S extends SequenceAnnotation, C extends Chart<any>>(
  config: SequenceConfig<S, C>
): d3.Selection<SVGGElement, string, any, any> {
  let selector = config.selector || generateId("soda-sequence-glyph");

  let binding = bind<S, C, SVGTextElement>({
    ...config,
    selector,
    elementType: "text",
  });

  let modifier = new SequenceModifier({
    ...config,
    selector,
    selection: binding.merge,
  });

  config.chart.addGlyphModifier(modifier);

  return binding.g;
}
