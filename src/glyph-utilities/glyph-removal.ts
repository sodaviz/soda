import * as d3 from "d3";
import { GlyphQueryConfig } from "./glyph-query";
import { queryGlyphMap, unmapGlyphsByKeys } from "./glyph-map";
import { keyFromSelection } from "./map-keys";
import { removeHoverBehaviorsByKeys } from "../interactivity/hover";
import { removeClickBehaviorsByKeys } from "../interactivity/click";

export function removeGlyphsByQuery(config: GlyphQueryConfig): void {
  let selections = queryGlyphMap(config);
  if (selections != undefined) {
    if (!Array.isArray(selections)) {
      selections = [selections];
    }
    removeGlyphsBySelection(selections);
    let keys = selections.map((s) => keyFromSelection(s));
    unmapGlyphsByKeys(keys);
    removeHoverBehaviorsByKeys(keys);
    removeClickBehaviorsByKeys(keys);
  }
}

function removeGlyphsBySelection(
  selections: d3.Selection<any, any, any, any>[]
): void {
  for (const selection of selections) {
    selection.remove();
  }
}