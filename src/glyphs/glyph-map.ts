import * as d3 from "d3";
import { Chart } from "../charts/chart";
import { Annotation } from "../annotations/annotation";
import { Binding } from "./bind";
import { idAnnotationMap } from "./id-map";

let keySeparator = "|";

/**
 * Set the separator that SODA uses to build glyph map keys. The keys are of the form:
 * <annotation ID><separator><glyph selector><separator><chart ID>.
 * @param separator
 */
export function setKeySeparator(separator: string): void {
  keySeparator = separator;
}

/**
 * A map of Annotation IDs to their representing glyphs.
 * @internal
 */
export const glyphMap: Map<
  string,
  d3.Selection<any, any, any, any>
> = new Map();

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
}

/**
 * This maps glyphs.
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
    let selection = d3.select(nodes[i]);
    let key = `${d.a.id}${keySeparator}${selection.attr(
      "class"
    )}${keySeparator}${d.c.id}`;
    glyphMap.set(key, selection);
  });
}

/**
 * This unmaps glyphs.
 * @internal
 * @param config
 */
export function unmapGlyphs(config: GlyphMapQueryConfig): void {
  let keys = getKeysFromQuery(config);
  for (const key of keys) {
    glyphMap.delete(key);
  }
}

/**
 * An interface that defines the parameters for a call to the queryGlyphMap() function.
 */
export interface GlyphMapQueryConfig {
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
  chart?: Chart<any>;
}

function getKeysFromQuery(config: GlyphMapQueryConfig = {}): string[] {
  let allKeys = Array.from(glyphMap.keys());
  let returnedKeys = [];
  for (const key of allKeys) {
    let keySplit = key.split(keySeparator);
    let passes = true;
    if (config.id != undefined) {
      if (keySplit[0] != config.id) {
        passes = false;
      }
    }
    if (config.selector != undefined) {
      if (keySplit[1] != config.selector) {
        passes = false;
      }
    }
    if (config.chart != undefined) {
      if (keySplit[2] != config.chart.id) {
        passes = false;
      }
    }
    if (passes) {
      returnedKeys.push(key);
    }
  }
  return returnedKeys;
}

/**
 * This function returns GlyphMappings. If all three parameters (id, selector, chart) are supplied in the config,
 * the function will return a single D3 selection. Otherwise, the function will return a list of D3 selections.
 * @param config
 */
export function queryGlyphMap(
  config: GlyphMapQueryConfig = {}
):
  | d3.Selection<any, any, any, any>
  | d3.Selection<any, any, any, any>[]
  | undefined {
  if (
    config.id != undefined &&
    config.selector != undefined &&
    config.chart != undefined
  ) {
    let key = `${config.id}${keySeparator}${config.selector}${keySeparator}${config.chart.id}`;
    return glyphMap.get(key);
  }

  let keys = getKeysFromQuery(config);
  let selections: d3.Selection<any, any, any, any>[] = [];
  for (const key of keys) {
    let selection = glyphMap.get(key);
    if (selection == undefined) {
      console.error(`glyphMap returned undefined with key ${key}`);
    } else {
      selections.push(selection);
    }
  }
  return selections;
}
