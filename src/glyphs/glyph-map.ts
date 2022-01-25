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
   * The selector that was assigned to the glyph when it was created.
   */
  selector: string;
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
  selector: string;
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

    let selection = d3.select(nodes[i]);

    for (const mapping of glyphMapList) {
      if (
        mapping.chart == config.chart &&
        mapping.selector == config.selector
      ) {
        mapping.selection = selection;
        return;
      }
    }

    glyphMapList.push({
      selection,
      selector: config.selector,
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
   * The selector that was assigned to the glyph when it was created. If this is supplied, the queryGlyphMap
   * function will return a list of GlyphMappings that correspond only to glyphs assigned that selector.
   */
  selector?: string;
  /**
   * If a Chart is supplied, the queryGlyphMap function will return a list of GlyphMappings that correspond only to
   * glyphs rendered in that Chart.
   */
  chart?: C;
}

/**
 * This function returns the GlyphMappings for the target Annotation IDs. The query can be constrained by Chart and
 * glyph selector. If both constraints are supplied, the function will return a single mapping. The function will
 * return undefined if no glyphs are mapped with the query constraints.
 * @param config
 */
export function queryGlyphMap<C extends Chart<any>>(
  config: GlyphMapQueryConfig<C>
): GlyphMapping | GlyphMapping[] | undefined {
  let mappings = glyphMap.get(config.id);

  if (mappings == undefined || mappings.length == 0) {
    return undefined;
  }

  if (config.chart == undefined && config.selector == undefined) {
    return mappings;
  } else if (config.selector != undefined && config.chart != undefined) {
    for (const mapping of mappings) {
      if (
        mapping.selector == config.selector &&
        mapping.chart == config.chart
      ) {
        return mapping;
      }
    }
  } else {
    let filteredMappings: GlyphMapping[] = [];
    if (config.selector != undefined) {
      filteredMappings = mappings.filter((m) => m.selector == config.selector);
    } else if (config.chart != undefined) {
      filteredMappings = mappings.filter((m) => m.chart == config.chart);
    }
    if (filteredMappings.length > 0) {
      return filteredMappings;
    } else {
      return undefined;
    }
  }
}
