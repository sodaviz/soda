import { Annotation } from "../../annotations/annotation";
import { Chart } from "../../charts/chart";
import {
  GlyphCallback,
  GlyphModifier,
  GlyphModifierConfig,
  GlyphProperty,
  resolveValue,
} from "../glyph-modifier";
import { Orientation } from "../../annotations/oriented-annotation";
import * as d3 from "d3";
import { AnnotationDatum } from "../bind";
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

export function defaultChevronPatternModifierInitialize<
  A extends Annotation,
  C extends Chart<any>
>(this: ChevronPatternModifier<A, C>) {
  this.setId();
  this.setClass();
  this.setAttr("patternUnits", "userSpaceOnUse");

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

  this.setFillColor();
  this.setFillOpacity();
  this.setChevronFillColor();
  this.setChevronFillOpacity();
  this.setChevronStrokeColor();
  this.setChevronStrokeOpacity();
  this.zoom();
}

/**
 * @internal
 * @param a
 * @param c
 * @param orientation
 */
export function buildChevronPatternXFn<
  A extends Annotation,
  C extends Chart<any>
>(orientation: GlyphProperty<A, C, Orientation>): GlyphCallback<A, C, number> {
  return (d) => {
    let orientationValue = resolveValue(orientation, d);
    if (orientationValue == Orientation.Forward) {
      return d.c.xScale(d.a.x);
    } else if (orientationValue == Orientation.Reverse) {
      return d.c.xScale(d.a.x2);
    } else {
      console.error("Bad orientation in chevron pattern x callback");
      return 0;
    }
  };
}

/**
 * An interface that defines the common parameters for rendering chevron glyphs.
 */
export interface ChevronPatternConfig<
  A extends Annotation,
  C extends Chart<any>
> extends ChevronGlyphConfig<A, C> {
  /**
   * The semantic query width at which the chevron patterns will be disabled. At this point, they will look like
   * regular rectangles or lines.
   */
  disableAt?: number;
  /**
   *
   */
  initializeFn?: (this: ChevronPatternModifier<A, C>) => void;
  /**
   *
   */
  zoomFn?: (this: ChevronPatternModifier<A, C>) => void;
}

export type ChevronPatternModifierConfig<
  A extends Annotation,
  C extends Chart<any>
> = GlyphModifierConfig<A, C> & ChevronPatternConfig<A, C>;

export class ChevronPatternModifier<
  A extends Annotation,
  C extends Chart<any>
> extends GlyphModifier<A, C> {
  orientation: GlyphProperty<A, C, Orientation>;
  /**
   * The fill color of the pattern rectangle.
   */
  fillColor: GlyphProperty<A, C, string>;
  /**
   * The fill opacity of the pattern rectangle.
   */
  fillOpacity: GlyphProperty<A, C, number>;
  /**
   * The fill color of the pattern path.
   */
  chevronFillColor: GlyphProperty<A, C, string>;
  /**
   * The fill opacity of the pattern path.
   */
  chevronFillOpacity: GlyphProperty<A, C, number>;
  /**
   * The stroke color of the pattern path.
   */
  chevronStrokeColor: GlyphProperty<A, C, string>;
  /**
   * The stroke opacity of the pattern path.
   */
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

    this.initializeFn =
      config.initializeFn || defaultChevronPatternModifierInitialize;
  }

  setFillColor(): void {
    this.selection.each((d, i, nodes) => {
      d3.select(nodes[i])
        .selectAll("rect")
        .style("fill", resolveValue(this.fillColor, d));
    });
  }

  setFillOpacity(): void {
    this.selection.each((d, i, nodes) => {
      d3.select(nodes[i])
        .selectAll("rect")
        .attr("fill-opacity", resolveValue(this.fillOpacity, d));
    });
  }

  setChevronStrokeColor(): void {
    this.selection.each((d, i, nodes) => {
      d3.select(nodes[i])
        .selectAll("path")
        .style("stroke", resolveValue(this.chevronStrokeColor, d));
    });
  }

  setChevronStrokeOpacity(): void {
    this.selection.each((d, i, nodes) => {
      d3.select(nodes[i])
        .selectAll("path")
        .attr("stroke-opacity", resolveValue(this.chevronStrokeOpacity, d));
    });
  }

  setChevronFillColor(): void {
    this.selection.each((d, i, nodes) => {
      d3.select(nodes[i])
        .selectAll("path")
        .style("fill", resolveValue(this.chevronFillColor, d));
    });
  }

  setChevronFillOpacity(): void {
    this.selection.each((d, i, nodes) => {
      d3.select(nodes[i])
        .selectAll("path")
        .attr("fill-opacity", resolveValue(this.chevronFillOpacity, d));
    });
  }
}
