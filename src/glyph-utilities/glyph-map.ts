import * as d3 from "d3";
import { Chart } from "../charts/chart";
import { Annotation } from "../annotations/annotation";
import { Binding } from "./bind";
import { idAnnotationMap } from "./id-map";
import { GlyphQueryConfig, isFullGlyphQueryConfig } from "./glyph-query";

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

export let keySeparator = "|";

/**
 * Set the separator that SODA uses to build map keys. The keys are of the form:
 * <annotation ID><separator><glyph selector><separator><chart ID>.
 * @param separator
 */
export function setKeySeparator(separator: string): void {
  keySeparator = separator;
}

/**
 * A utility function that builds a key for a behavior map from a d3 Selection.
 * @internal
 * @param selection
 */
export function keyFromSelection(
  selection: d3.Selection<any, any, any, any>
): string {
  let datum = selection.datum();
  let selector = selection.attr("class");
  return `${datum.a.id}${keySeparator}${selector}${keySeparator}${datum.c.id}`;
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
    let key = keyFromSelection(selection);
    glyphMap.set(key, selection);
  });
}

/**
 * This unmaps glyphs.
 * @internal
 * @param keys
 */
export function unmapGlyphsByKeys(keys: string[]): void {
  for (const key of keys) {
    glyphMap.delete(key);
  }
}

function filterKeysFromQuery(config: GlyphQueryConfig = {}): string[] {
  let keys = Array.from(glyphMap.keys());
  let keySplits = keys.map((k) => k.split(keySeparator));

  if (config.selector != undefined) {
    keySplits = keySplits.filter((k) => k[1] == config.selector);
  }

  if (config.chart != undefined) {
    keySplits = keySplits.filter((k) => k[2] == config.chart!.id);
  }

  if (config.annotations != undefined) {
    let ids = config.annotations.map((ann) => ann.id);
    keySplits = keySplits.filter((k) => ids.includes(k[0]));
  }

  return keySplits.map(
    (k) => `${k[0]}${keySeparator}${k[1]}${keySeparator}${k[2]}`
  );
}

/**
 * This function returns GlyphMappings. If all three parameters (id, selector, chart) are supplied in the config,
 * the function will return a single D3 selection. Otherwise, the function will return a list of D3 selections.
 * @param config
 */
export function queryGlyphMap(
  config: GlyphQueryConfig = {}
): d3.Selection<any, any, any, any>[] | undefined {
  let keys: string[] = [];
  if (isFullGlyphQueryConfig(config)) {
    for (const ann of config.annotations) {
      keys.push(
        `${ann.id}${keySeparator}${config.selector}${keySeparator}${config.chart.id}`
      );
    }
  } else {
    keys = filterKeysFromQuery(config);
  }

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
