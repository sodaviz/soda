import { GlyphMapping } from "../glyphs/glyph-map";

/**
 * A utility function that builds a key for a behavior map from a GlyphMapping.
 * @internal
 * @param mapping
 */
function keyFromMapping(mapping: GlyphMapping): string {
  let datum = mapping.selection.datum();
  let selector = mapping.selection.attr("class");
  return `${datum.a.id}.${selector}.${datum.c.id}`;
}

/**
 * A utility function that retrieves a list of behavior functions for an interaction.
 * @internal
 * @param mapping
 * @param behaviorMap
 */
export function getBehaviorList(
  mapping: GlyphMapping,
  behaviorMap: Map<string, Function[]>
): Function[] {
  let key = keyFromMapping(mapping);
  let list = behaviorMap.get(key);
  if (list == undefined) {
    list = [];
    behaviorMap.set(key, list);
  }
  return list;
}
