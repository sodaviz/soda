import * as d3 from "d3";
import { Annotation } from "../annotations/annotation";
import { Chart } from "../charts/chart";
import { InteractionCallback } from "./interaction-callback";
import { InteractionConfig } from "./interaction-config";
import { queryGlyphMap } from "../glyph-utilities/glyph-map";
import { getBehaviorList } from "./interaction-list";

/**
 * @internal
 */
const mouseoverBehaviorMap: Map<string, Function[]> = new Map();
/**
 * @internal
 */
const mouseoutBehaviorMap: Map<string, Function[]> = new Map();

/**
 * This function returns the list of mouseover behaviors that are associated with an Annotation object.
 * @internal
 */
function getMouseoverList(
  selection: d3.Selection<any, any, any, any>
): Function[] {
  return getBehaviorList(selection, mouseoverBehaviorMap);
}

/**
 * This function returns the list of mouseout behaviors that are associated with an Annotation object.
 * @internal
 */
function getMouseoutList(
  selection: d3.Selection<any, any, any, any>
): Function[] {
  return getBehaviorList(selection, mouseoutBehaviorMap);
}

/**
 * An interface that defines the parameters for a call to the hoverBehavior function.
 */
export interface HoverConfig<A extends Annotation, C extends Chart<any>>
  extends InteractionConfig<A, C> {
  /**
   * A callback function that will be responsible for executing the mouseover behavior. It receives a d3 selection
   * of the glyph and the Annotation object it represents as arguments.
   */
  mouseover: InteractionCallback<A, C>;
  /**
   * A callback function that will be responsible for executing the mouseout behavior. It receives a d3 selection
   * of the glyph and the Annotation object it represents as arguments.
   */
  mouseout: InteractionCallback<A, C>;
}

/**
 * Remove all hover behaviors by associated keys.
 * @internal
 * @param keys
 */
export function removeHoverBehaviorsByKeys(keys: string[]): void {
  for (const key of keys) {
    mouseoverBehaviorMap.delete(key);
    mouseoutBehaviorMap.delete(key);
  }
}

/**
 * This applies hover interactions to a list of Annotations.
 * @param config
 */
export function hoverBehavior<A extends Annotation, C extends Chart<any>>(
  config: HoverConfig<A, C>
): void {
  let selections = queryGlyphMap(config);

  if (selections == undefined) {
    console.warn("Glyph query failed when attempting to map click behavior");
    return;
  }

  for (const selection of selections) {
    applyHoverCallbacks(selection, config);
  }
}

function applyHoverCallbacks(
  selection: d3.Selection<any, any, any, any>,
  config: HoverConfig<any, any>
): void {
  getMouseoverList(selection).push(config.mouseover);
  getMouseoutList(selection).push(config.mouseout);

  selection
    .on("mouseover", () => mouseover(selection))
    .on("mouseout", () => mouseout(selection));
}

/**
 * A generic function that is routed to the mouseover event on a SODA glyph. When called, it will retrieve the
 * list of mouseover behaviors associated with that glyph, and run the callback function for each behavior.
 * @internal
 */
function mouseover<A extends Annotation, C extends Chart<any>>(
  selection: d3.Selection<any, any, any, any>
): void {
  let datum = selection.datum();
  let behaviors = getMouseoverList(selection);

  for (const behavior of behaviors) {
    behavior(selection, datum);
  }
}

/**
 * A generic function that is routed to the mouseover event on a SODA glyph. When called, it will retrieve the
 * list of mouseout behaviors associated with that glyph, and run the callback function for each behavior.
 * @internal
 */
function mouseout<A extends Annotation, C extends Chart<any>>(
  selection: d3.Selection<any, any, any, any>
): void {
  let datum = selection.datum();
  let behaviors = getMouseoutList(selection);

  for (const behavior of behaviors) {
    behavior(selection, datum);
  }
}
