import { Annotation } from "../annotations/annotation";
import { Chart } from "../charts/chart";
import * as d3 from "d3";
import { GlyphConfig } from "./glyph-config";
import { generateId } from "../utilities/id-generation";
import { bind } from "./bind";
import {
  GlyphCallback,
  GlyphModifier,
  GlyphModifierConfig,
  GlyphProperty,
  resolveValue,
} from "./glyph-modifier";

/**
 * @internal
 * @param x
 * @param w
 * @param y
 * @param h
 */
export function buildArcPathDFn<A extends Annotation, C extends Chart<any>>(
  x: GlyphProperty<A, C, number>,
  w: GlyphProperty<A, C, number>,
  y: GlyphProperty<A, C, number>,
  h: GlyphProperty<A, C, number>
): GlyphCallback<A, C, string> {
  return (d) => {
    let mx = resolveValue(x, d);
    let my = resolveValue(y, d);
    let qx1 = resolveValue(x, d) + resolveValue(w, d) / 2;
    let qy1 = resolveValue(y, d) - d.c.rowHeight * 2;
    let qx = resolveValue(x, d) + resolveValue(w, d);
    let qy = resolveValue(y, d);
    return `M ${mx},${my} Q ${qx1},${qy1} ${qx},${qy}`;
  };
}

/**
 * An interface that defines the parameters for instantiating an ArcModifier.
 * @internal
 */
export type ArcModifierConfig<
  A extends Annotation,
  C extends Chart<any>
> = GlyphModifierConfig<A, C> & ArcConfig<A, C>;

/**
 * A class that manages the styling and positioning of a group of arc glyphs.
 * @internal
 */
export class ArcModifier<
  A extends Annotation,
  C extends Chart<any>
> extends GlyphModifier<A, C> {
  d: GlyphProperty<A, C, string | null>;

  constructor(config: ArcModifierConfig<A, C>) {
    super(config);
    this.y = (d) => d.c.rowHeight * (d.a.y + 1);
    this.d = buildArcPathDFn(this.x, this.width, this.y, this.height);
    this.fillColor = config.fillColor || "none";
  }

  defaultZoom(): void {
    this.setD();
  }

  setD(): void {
    this.applyAttr("d", this.d);
  }
}

/**
 * An interface that defines the parameters for a call to the arc rendering function.
 */
export interface ArcConfig<A extends Annotation, C extends Chart<any>>
  extends GlyphConfig<A, C> {
  initializeFn?: (this: ArcModifier<A, C>) => void;
  zoomFn?: (this: ArcModifier<A, C>) => void;
}

/**
 * This renders a list of Annotation objects as arcs in a Chart.
 * @param config
 */
export function arc<A extends Annotation, C extends Chart<any>>(
  config: ArcConfig<A, C>
): d3.Selection<SVGGElement, string, any, any> {
  let selector = config.selector || generateId("soda-arc-glyph");
  let internalSelector = selector + "-internal";

  let binding = bind<A, C, SVGPathElement>({
    ...config,
    selector,
    internalSelector,
    elementType: "path",
  });

  let modifier = new ArcModifier({
    ...config,
    selector: internalSelector,
    selection: binding.merge,
  });

  config.chart.addGlyphModifier(modifier);

  return binding.g;
}
