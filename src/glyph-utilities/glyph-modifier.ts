import * as d3 from "d3";
import { Annotation } from "../annotations/annotation";
import { Chart } from "../charts/chart";
import { GlyphConfig } from "./glyph-config";
import { AnnotationDatum } from "./bind";
import {
  AnnotationDatumSelection,
  applyPropertyPolicy,
  callbackifyOrDefault,
  GlyphCallback,
  GlyphPropertyPolicy,
  resolveGlyphProperty,
} from "./glyph-property";

/**
 * An interface that defines the parameters to initialize a GlyphModifier.
 * @internal
 */
export interface GlyphModifierConfig<
  A extends Annotation,
  C extends Chart<any>
> {
  selector: string;
  /**
   * A D3 selection of the glyphs that the modifier will manage.
   */
  selection: d3.Selection<any, AnnotationDatum<A, C>, any, any>;
}

export const UserSelectNonePolicy = [
  { key: "-webkit-user-select", property: "none" },
  { key: "-khtml-user-select", property: "none" },
  { key: "-moz-user-select", property: "none" },
  { key: "-ms-user-select", property: "none" },
  { key: "-o-user-select", property: "none" },
  { key: "user-select", property: "none" },
];

/**
 * The base class that manages the styling and positioning of glyphs.
 *
 * @internal
 */
export class GlyphModifier<A extends Annotation, C extends Chart<any>> {
  chart: C;
  annotations: A[];
  selector: string;
  selection: d3.Selection<any, AnnotationDatum<A, C>, any, any>;
  selectionMap: Map<string, AnnotationDatumSelection<A, C>>;
  initializePolicy: GlyphPropertyPolicy<A, C>;
  zoomPolicy: GlyphPropertyPolicy<A, C>;
  id: GlyphCallback<A, C, string>;
  x: GlyphCallback<A, C, number>;
  row: GlyphCallback<A, C, number>;
  y: GlyphCallback<A, C, number>;
  width: GlyphCallback<A, C, number>;
  height: GlyphCallback<A, C, number>;

  constructor(config: GlyphModifierConfig<A, C> & GlyphConfig<A, C>) {
    this.chart = config.chart;
    this.annotations = config.annotations;
    this.selector = config.selector;
    this.selection = config.selection;

    this.selectionMap = new Map();
    this.selectionMap.set("group", this.selection);

    this.initializePolicy = {
      attributeRuleMap: new Map(),
      styleRuleMap: new Map(),
    };

    this.zoomPolicy = {
      attributeRuleMap: new Map(),
      styleRuleMap: new Map(),
    };
    this.id = (d) => d.a.id;
    this.x = callbackifyOrDefault(config.x, (d) => d.c.xScale(d.a.start));
    this.row = callbackifyOrDefault(config.row, (d) => d.c.layout.row(d));
    this.y = callbackifyOrDefault(
      config.y,
      (d) => resolveGlyphProperty(this.row, d) * d.c.rowHeight + 2
    );
    this.width = callbackifyOrDefault(
      config.width,
      (d) => d.c.xScale(d.a.end) - d.c.xScale(d.a.start)
    );
    this.height = callbackifyOrDefault(config.height, (d) => d.c.rowHeight - 4);
  }

  get selectionKeys(): string[] {
    return Array.from(this.selectionMap.keys());
  }

  initialize(): void {
    applyPropertyPolicy({
      selectionKeys: this.selectionKeys,
      selectionMap: this.selectionMap,
      policy: this.initializePolicy,
      context: "initialize",
    });
    this.zoom();
  }

  zoom(): void {
    applyPropertyPolicy({
      selectionKeys: this.selectionKeys,
      selectionMap: this.selectionMap,
      policy: this.zoomPolicy,
      context: "zoom",
    });
  }
}
