import { Chart } from "../charts/chart";
import { Annotation } from "../annotations/annotation";

/**
 * An interface that defines the parameters for a call to the queryGlyphMap() function.
 */
export interface GlyphQueryConfig {
  /**
   * Constrain the query to these Annotations.
   */
  annotations?: Annotation[];
  /**
   * Constrain the query to glyphs with this selector.
   */
  selector?: string;
  /**
   * Constrain the query to glyphs rendered in this Chart.
   */
  chart?: Chart<any>;
}

export interface FullGlyphQueryConfig extends GlyphQueryConfig {
  annotations: Annotation[];
  selector: string;
  chart: Chart<any>;
}

/**
 * A type guard for FullGlyphMapQueryConfig
 * @internal
 * @param config
 */
export function isFullGlyphQueryConfig(
  config: GlyphQueryConfig
): config is FullGlyphQueryConfig {
  return (
    config.annotations != undefined &&
    config.selector != undefined &&
    config.chart != undefined
  );
}
