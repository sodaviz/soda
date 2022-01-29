import * as d3 from "d3";
import { FullGlyphQueryConfig } from "./glyph-query";

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

export function keyFromQueryConfig(config: FullGlyphQueryConfig): string {
  return `${config.id}${keySeparator}${config.selector}${keySeparator}${config.chart.id}`;
}
