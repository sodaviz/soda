import * as d3 from "d3";
import { Chart } from "../charts/chart";
import { Annotation } from "../annotations/annotation";
import { Binding } from "./bind";
import { idAnnotationMap } from "./id-map";

/**
 * An interface that contains a D3 selection to a glyph and the Chart it's rendered in.
 */
export interface GlyphMapping {
  /**
   * The D3 selection to the glyph.
   */
  selection: d3.Selection<any, any, any, any>;
  /**
   * A reference to the Chart that the glyph is rendered in.
   */
  chart: Chart<any>;
}

/**
 * A map of Annotation IDs to their representing glyphs.
 * @internal
 */
export const glyphMap: Map<string, GlyphMapping[]> = new Map();

/**
 * An interface that defines the parameters for a call to the mapGlyhs() function.
 * @internal
 */
export interface GlyphMapConfig<
  A extends Annotation,
  C extends Chart<any>,
  E extends Element
> {
  binding: Binding<A, C, E>;
  chart: C;
}

/**
 * This maps glyphs to the Chart's they are rendered in.
 * @param config
 * @internal
 */
export function mapGlyphs<
  A extends Annotation,
  C extends Chart<any>,
  E extends Element
>(config: GlyphMapConfig<A, C, E>): void {
  config.binding.merge.each((d, i, nodes) => {
    idAnnotationMap.set(d.a.id, d.a);
    let glyphMapList = glyphMap.get(d.a.id) || [];
    glyphMapList.push({
      selection: d3.select(nodes[i]),
      chart: config.chart,
    });
    glyphMap.set(d.a.id, glyphMapList);
  });
}

/**
 * An interface that defines the parameters for a call to the queryGlyphMap() function.
 * @internal
 */
export interface GlyphMapQueryConfig<C extends Chart<any>> {
  /**
   * The Annotation ID that is the target of the query.
   */
  id: string;
  /**
   * If a Chart is supplied, the queryGlyphMap function will return a single GlyphMapping. If no Chart is supplied,
   * it will return a list of GlyphMappings, one for each Chart the glyph is mapped to.
   */
  chart?: C;
}

/**
 * This function returns the GlyphMappings for the target Annotation IDs.
 * @param config
 */
export function queryGlyphMap<C extends Chart<any>>(
  config: GlyphMapQueryConfig<C>
): GlyphMapping | GlyphMapping[] | undefined {
  let mappings = glyphMap.get(config.id);

  if (mappings == undefined || mappings.length == 0) {
    return undefined;
  }

  if (config.chart == undefined) {
    return mappings;
  } else {
    for (const mapping of mappings) {
      if (mapping.chart == config.chart) {
        return mapping;
      }
    }
    return undefined;
  }
}
