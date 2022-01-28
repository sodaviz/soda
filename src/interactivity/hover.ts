import { Annotation } from "../annotations/annotation";
import { Chart } from "../charts/chart";
import { InteractionCallback } from "./interaction-callback";
import { InteractionConfig } from "./interaction-config";
import { GlyphMapping, queryGlyphMap } from "../glyphs/glyph-map";
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
function getMouseoverList(mapping: GlyphMapping): Function[] {
  return getBehaviorList(mapping, mouseoverBehaviorMap);
}

/**
 * This function returns the list of mouseout behaviors that are associated with an Annotation object.
 * @internal
 */
function getMouseoutList(mapping: GlyphMapping): Function[] {
  return getBehaviorList(mapping, mouseoutBehaviorMap);
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
 * This applies hover interactions to a list of Annotations.
 * @param config
 */
export function hoverBehavior<A extends Annotation, C extends Chart<any>>(
  config: HoverConfig<A, C>
): void {
  for (const ann of config.annotations) {
    let mapping = queryGlyphMap({
      id: ann.id,
      selector: config.selector,
      chart: config.chart,
    });

    if (mapping == undefined) {
      console.warn("No glyph mapping found");
      return;
    }

    if (Array.isArray(mapping)) {
      for (const map of mapping) {
        applyHoverCallbacks(map, config);
      }
    } else {
      applyHoverCallbacks(mapping, config);
    }
  }
}

function applyHoverCallbacks(
  mapping: GlyphMapping,
  config: HoverConfig<any, any>
): void {
  getMouseoverList(mapping).push(config.mouseover);
  getMouseoutList(mapping).push(config.mouseout);

  mapping.selection
    .on("mouseover", () => mouseover(mapping))
    .on("mouseout", () => mouseout(mapping));
}

/**
 * A generic function that is routed to the mouseover event on a SODA glyph. When called, it will retrieve the
 * list of mouseover behaviors associated with that glyph, and run the callback function for each behavior.
 * @internal
 */
function mouseover<A extends Annotation, C extends Chart<any>>(
  mapping: GlyphMapping
): void {
  let datum = mapping.selection.datum();
  let behaviors = getMouseoverList(mapping);

  for (const behavior of behaviors) {
    behavior(mapping.selection, datum);
  }
}

/**
 * A generic function that is routed to the mouseover event on a SODA glyph. When called, it will retrieve the
 * list of mouseout behaviors associated with that glyph, and run the callback function for each behavior.
 * @internal
 */
function mouseout<A extends Annotation, C extends Chart<any>>(
  mapping: GlyphMapping
): void {
  let datum = mapping.selection.datum();
  let behaviors = getMouseoutList(mapping);

  for (const behavior of behaviors) {
    behavior(mapping.selection, datum);
  }
}
