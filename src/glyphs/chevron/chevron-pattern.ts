import { Annotation } from "../../annotations/annotation";
import { Chart } from "../../charts/chart";
import {
  GlyphModifier,
  GlyphModifierConfig,
} from "../../glyph-utilities/glyph-modifier";
import { Orientation } from "../../annotations/orientation";
import { ChevronGlyphConfig } from "../chevron";
import {
  applyPropertyPolicy,
  callbackifyOrDefault,
  GlyphCallback,
} from "../../glyph-utilities/glyph-property";

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
  height: GlyphCallback<A, C, number>,
  chevronHeight: GlyphCallback<A, C, number>,
  chevronWidth: GlyphCallback<A, C, number>,
  orientation: GlyphCallback<A, C, Orientation>
): GlyphCallback<A, C, string> {
  return (d) => {
    let heightValue = height(d);
    let chevronHeightValue = chevronHeight(d);
    let chevronWidthValue = chevronWidth(d);
    let orientationValue = orientation(d);
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
>(orientation: GlyphCallback<A, C, Orientation>): GlyphCallback<A, C, number> {
  return (d) => {
    let orientationValue = orientation(d);
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
export class ChevronPatternModifier<
  A extends Annotation,
  C extends Chart<any>
> extends GlyphModifier<A, C> {
  d: GlyphCallback<A, C, string>;

  constructor(config: GlyphModifierConfig<A, C> & ChevronGlyphConfig<A, C>) {
    super(config);

    let orientation = callbackifyOrDefault(
      config.orientation,
      () => Orientation.Forward
    );
    let chevronSpacing = callbackifyOrDefault(config.chevronSpacing, () => 0);

    this.x = callbackifyOrDefault(
      config.x,
      buildChevronPatternXFn(orientation)
    );

    this.width = callbackifyOrDefault(
      config.width,
      (d) => this.height(d) / 2 + chevronSpacing(d)
    );

    let chevronHeight = callbackifyOrDefault(config.chevronHeight, this.height);
    let chevronWidth = callbackifyOrDefault(
      config.chevronWidth,
      (d) => chevronHeight(d) / 2
    );

    this.d = buildChevronPatternPathDFn(
      this.height,
      chevronHeight,
      chevronWidth,
      orientation
    );

    // the group of pattern nodes
    this.initializePolicy.attributeRuleMap.set("group", [
      { key: "id", property: this.id },
      { key: "patternUnits", property: "userSpaceOnUse" },
      { key: "y", property: this.y },
      { key: "height", property: this.height },
      { key: "width", property: this.width },
    ]);

    // the rectangle that makes up the background
    this.initializePolicy.attributeRuleMap.set("background", [
      { key: "x", property: 0 },
      { key: "y", property: 0 },
      { key: "height", property: this.height },
      { key: "width", property: this.width },
    ]);

    // no stroke on the background, since that's controlled by the
    // external rectangle that is filled by the pattern
    this.initializePolicy.styleRuleMap.set("background", [
      { key: "fill", property: config.fillColor || "none" },
      { key: "fill-opacity", property: config.fillOpacity },
    ]);

    // the arrow path, the path definition never changes
    this.initializePolicy.attributeRuleMap.set("arrow", [
      { key: "d", property: this.d },
    ]);

    this.initializePolicy.styleRuleMap.set("arrow", [
      { key: "fill", property: config.chevronFillColor || "none" },
      { key: "fill-opacity", property: config.chevronFillOpacity },
      { key: "stroke", property: config.chevronStrokeColor || "black" },
      { key: "stroke-opacity", property: config.chevronStrokeOpacity },
    ]);

    // the only thing we need to do on zoom is move the pattern
    this.zoomPolicy.attributeRuleMap.set("group", [
      { key: "x", property: this.x },
    ]);
  }

  initialize() {
    // this rectangle is the "background" of the pattern
    this.selectionMap.set("background", this.selection.append("rect"));
    // this path is what forms the chevron "arrow"
    this.selectionMap.set("arrow", this.selection.append("path"));

    applyPropertyPolicy({
      selectionKeys: this.selectionKeys,
      selectionMap: this.selectionMap,
      policy: this.initializePolicy,
      context: "initialize",
    });
  }
}
