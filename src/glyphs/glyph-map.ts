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
 */
export interface GlyphMapQueryConfig<C extends Chart<any>> {
  /**
   * Constrain the query to Annotations with this ID.
   */
  id?: string;
  /**
   * Constrain the query to Annotations with this selector.
   */
  selector?: string;
  /**
   * Constrain the query to Annotations rendered in this Chart.
   */
  chart?: C;
}

/**
 * This function returns GlyphMappings. If all three parameters (id, selector, chart) are supplied in the config,
 * the function will return a single D3 selection. Otherwise, the function will return a list of D3 selections.
 * @param config
 */
export function queryGlyphMap<C extends Chart<any>>(
  config: GlyphMapQueryConfig<C> = {}
): GlyphMapping | GlyphMapping[] | undefined {
  let mappings: GlyphMapping[] | undefined;

  if (config.id == undefined) {
    mappings = Array.from(glyphMap.values()).reduce((previous, current) => {
      return previous.concat(current);
    }, []);
  } else {
    mappings = glyphMap.get(config.id);
  }

  if (mappings == undefined || mappings.length == 0) {
    return undefined;
  }

  if (config.selector != undefined) {
    mappings = mappings.filter((m) => m.selector == config.selector);
  }

  if (config.chart != undefined) {
    mappings = mappings.filter((m) => m.chart == config.chart);
  }

  if (mappings.length == 0) {
    return undefined;
  }

  if (
    config.id != undefined &&
    config.selector != undefined &&
    config.chart != undefined
  ) {
    if (mappings.length > 1) {
      console.error(
        `Multiple results in queryGlyphMap() with id: ${config.id}` +
          `, selector: ${config.selector},` +
          ` chart: ${config.chart},` +
          ` returning only the first result.`
      );
    }
    return mappings[0];
  }

  return mappings;
}
