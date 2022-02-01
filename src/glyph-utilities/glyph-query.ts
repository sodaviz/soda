import { Chart } from "../charts/chart";

/**
 * An interface that defines the parameters for a call to the queryGlyphMap() function.
 */
export interface GlyphQueryConfig {
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

export interface FullGlyphQueryConfig extends GlyphQueryConfig {
  id: string;
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
    config.id != undefined &&
    config.selector != undefined &&
    config.chart != undefined
  );
}
