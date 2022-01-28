import { Annotation } from "../annotations/annotation";
import { InteractionCallback } from "./interaction-callback";
import { Chart } from "../charts/chart";
import { InteractionConfig } from "./interaction-config";
import { GlyphMapping, queryGlyphMap } from "../glyphs/glyph-map";
import { getBehaviorList } from "./interaction-list";

/**
 * @internal
 */
const clickBehaviorMap: Map<string, Function[]> = new Map();

/**
 * This function returns the list of click behaviors that are associated with an Annotation object.
 * @internal
 * @param mapping
 */
function getClickList(mapping: GlyphMapping): Function[] {
  return getBehaviorList(mapping, clickBehaviorMap);
}

/**
 * An interface that defines the parameters for a call to the clickBehavior function.
 */
export interface ClickConfig<A extends Annotation, C extends Chart<any>>
  extends InteractionConfig<A, C> {
  /**
   * A callback function that will be responsible for executing the click behavior. It will implicitly receive
   * references to both a D3 Selection to the Annotation's representative glyph and the Annotation object itself.
   */
  click: InteractionCallback<A, C>;
}

/**
 * This applies click interactions to a list of Annotations.
 * @param config
 */
export function clickBehavior<A extends Annotation, C extends Chart<any>>(
  config: ClickConfig<A, C>
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
        applyClickCallbacks(map, config);
      }
    } else {
      applyClickCallbacks(mapping, config);
    }
  }
}

function applyClickCallbacks(
  mapping: GlyphMapping,
  config: ClickConfig<any, any>
): void {
  getClickList(mapping).push(config.click);
  mapping.selection.on("click", () => click(mapping));
}

/**
 * A generic function that is actually routed to the click event on a SODA glyph. When called, it will retrieve the
 * list of click behaviors associated with that glyph, and run the callback function for each behavior.
 * @internal
 * @param mapping
 */
function click<A extends Annotation, C extends Chart<any>>(
  mapping: GlyphMapping
): void {
  let datum = mapping.selection.datum();
  let behaviors = getClickList(mapping);

  for (const behavior of behaviors) {
    behavior(mapping.selection, datum);
  }
}
