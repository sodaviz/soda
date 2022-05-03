import { Annotation } from "../../annotations/annotation";
import { Chart } from "../../charts/chart";
import {
  GlyphCallback,
  GlyphModifier,
  GlyphModifierConfig,
  GlyphProperty,
  resolveValue,
} from "../../glyph-utilities/glyph-modifier";
import { Orientation } from "../../annotations/orientation";
import * as d3 from "d3";
import { AnnotationDatum } from "../../glyph-utilities/bind";
import { ChevronGlyphConfig } from "../chevron";

/**
 * @internal
 * @param height
 * @param chevronHeight
 * @param chevronWidth
 * @param orientation
 */
export function buildChevronPatternPathDFn<
  A extends Annotation,
  C extends Chart<any>
>(
  height: GlyphProperty<A, C, number>,
  chevronHeight: GlyphProperty<A, C, number>,
  chevronWidth: GlyphProperty<A, C, number>,
  orientation: GlyphProperty<A, C, Orientation>
): GlyphCallback<A, C, string> {
  return (d) => {
    let heightValue = resolveValue(height, d);
    let chevronHeightValue = resolveValue(chevronHeight, d);
    let chevronWidthValue = resolveValue(chevronWidth, d);
    let orientationValue = resolveValue(orientation, d);
    let heightDiff = heightValue - chevronHeightValue;

    let x1, x2, x3, y1, y2, y3;
    if (orientationValue == Orientation.Forward) {
      x1 = 0;
      y1 = heightDiff / 2;
      x2 = chevronWidthValue;
      y2 = y1 + chevronHeightValue / 2;
      x3 = 0;
      y3 = y2 + chevronHeightValue / 2;
    } else if (orientationValue == Orientation.Reverse) {
      x1 = chevronWidthValue;
      y1 = heightDiff / 2;
      x2 = 0;
      y2 = y1 + chevronHeightValue / 2;
      x3 = chevronWidthValue;
      y3 = y2 + chevronHeightValue / 2;
    } else {
      console.error("Bad orientation in chevron pattern path D callback");
      return "";
    }
    return `M ${x1},${y1} L ${x2},${y2} L ${x3},${y3}`;
  };
}

/**
 * @internal
 * @param orientation
 */
export function buildChevronPatternXFn<
  A extends Annotation,
  C extends Chart<any>
>(orientation: GlyphProperty<A, C, Orientation>): GlyphCallback<A, C, number> {
  return (d) => {
    let orientationValue = resolveValue(orientation, d);
    if (orientationValue == Orientation.Forward) {
      return d.c.xScale(d.a.start);
    } else if (orientationValue == Orientation.Reverse) {
      return d.c.xScale(d.a.end);
    } else {
      console.error("Bad orientation in chevron pattern x callback");
      return 0;
    }
  };
}

/**
 * @internal
 */
export interface ChevronPatternConfig<
  A extends Annotation,
  C extends Chart<any>
> extends ChevronGlyphConfig<A, C> {
  /**
   * The semantic view width at which the chevron patterns will be disabled. Above this point, they will look like
   * regular rectangles or lines.
   */
  disableAt?: number;
  initializeFn?: (this: ChevronPatternModifier<A, C>) => void;
  zoomFn?: (this: ChevronPatternModifier<A, C>) => void;
}

/**
 * @internal
 */
export type ChevronPatternModifierConfig<
  A extends Annotation,
  C extends Chart<any>
> = GlyphModifierConfig<A, C> & ChevronPatternConfig<A, C>;

/**
 * @internal
 */
export class ChevronPatternModifier<
  A extends Annotation,
  C extends Chart<any>
> extends GlyphModifier<A, C> {
  orientation: GlyphProperty<A, C, Orientation>;
  fillColor: GlyphProperty<A, C, string>;
  fillOpacity: GlyphProperty<A, C, number>;
  chevronFillColor: GlyphProperty<A, C, string>;
  chevronFillOpacity: GlyphProperty<A, C, number>;
  chevronStrokeColor: GlyphProperty<A, C, string>;
  chevronStrokeOpacity: GlyphProperty<A, C, number>;
  chevronSpacing: GlyphProperty<A, C, number>;
  chevronWidth?: GlyphProperty<A, C, number>;
  chevronHeight: GlyphProperty<A, C, number>;
  pathD: GlyphProperty<A, C, string>;
  disableAt: number;

  constructor(config: ChevronPatternModifierConfig<A, C>) {
    super(config);
    this.orientation = config.orientation || Orientation.Forward;
    this.x = config.x || buildChevronPatternXFn(this.orientation);
    this.height =
      config.height || ((d: AnnotationDatum<A, C>) => d.c.rowHeight - 4);
    this.width =
      config.width ||
      ((d: AnnotationDatum<A, C>) =>
        resolveValue(this.height, d) / 2 +
        resolveValue(this.chevronSpacing, d));

    this.fillColor = config.fillColor || "None";
    this.fillOpacity = config.fillOpacity || 1.0;

    this.disableAt = config.disableAt || Infinity;

    this.chevronFillColor = config.chevronFillColor || "None";
    this.chevronFillOpacity = config.chevronFillOpacity || 0;

    this.chevronStrokeColor = config.chevronStrokeColor || "black";
    this.chevronStrokeOpacity = config.chevronStrokeOpacity || 1;

    this.chevronHeight = config.chevronHeight || this.height;
    this.chevronWidth =
      config.chevronWidth ||
      ((d: AnnotationDatum<A, C>) => resolveValue(this.chevronHeight, d) / 2);

    this.chevronSpacing = config.chevronSpacing || 0;

    this.pathD = buildChevronPatternPathDFn(
      this.height,
      this.chevronHeight,
      this.chevronWidth,
      this.orientation
    );
  }

  defaultInitialize() {
    this.applyId();
    this.applyClass();
    this.applyAttr("patternUnits", "userSpaceOnUse");

    this.selection
      .append("rect")
      .attr("x", 0)
      .attr("y", 0)
      .attr("width", (d) => resolveValue(this.width, d))
      .attr("height", (d) => resolveValue(this.height, d));

    this.selection
      .append("path")
      .style("stroke-linejoin", "miter")
      .attr("d", (d) => resolveValue(this.pathD, d));

    this.applyFillColor();
    this.applyFillOpacity();
    this.applyChevronFillColor();
    this.applyChevronFillOpacity();
    this.applyChevronStrokeColor();
    this.applyChevronStrokeOpacity();
    this.zoom();
  }

  applyFillColor(): void {
    this.selection.each((d, i, nodes) => {
      d3.select(nodes[i])
        .selectAll("rect")
        .style("fill", resolveValue(this.fillColor, d));
    });
  }

  applyFillOpacity(): void {
    this.selection.each((d, i, nodes) => {
      d3.select(nodes[i])
        .selectAll("rect")
        .attr("fill-opacity", resolveValue(this.fillOpacity, d));
    });
  }

  applyChevronStrokeColor(): void {
    this.selection.each((d, i, nodes) => {
      d3.select(nodes[i])
        .selectAll("path")
        .style("stroke", resolveValue(this.chevronStrokeColor, d));
    });
  }

  applyChevronStrokeOpacity(): void {
    this.selection.each((d, i, nodes) => {
      d3.select(nodes[i])
        .selectAll("path")
        .attr("stroke-opacity", resolveValue(this.chevronStrokeOpacity, d));
    });
  }

  applyChevronFillColor(): void {
    this.selection.each((d, i, nodes) => {
      d3.select(nodes[i])
        .selectAll("path")
        .style("fill", resolveValue(this.chevronFillColor, d));
    });
  }

  applyChevronFillOpacity(): void {
    this.selection.each((d, i, nodes) => {
      d3.select(nodes[i])
        .selectAll("path")
        .attr("fill-opacity", resolveValue(this.chevronFillOpacity, d));
    });
  }
}
