import { Annotation } from "../annotations/annotation";
import { Chart } from "../charts/chart";
import { GlyphCallback } from "../glyph-utilities/glyph-modifier";

/**
 * An interface that defines the object that Charts use to store the vertical layout of glyphs.
 */
export interface VerticalLayout {
  /**
   * This callback is used by default to place a glyph in a Chart's row.
   */
  row: GlyphCallback<Annotation, Chart<any>, number>;
  /**
   * This value is used by default to set the height of a Chart to display the required number of rows.
   */
  rowCount: number;
}

/**
 * A placeholder VerticalLayout object--it just places every glyph in row 0.
 */
export const defaultVerticalLayout: VerticalLayout = {
  row: () => 0,
  rowCount: 1,
};

/**
 * An extension of VerticalLayout that additionally has a Map. This object is returned by SODA's default layout
 * functions, and the Map is used to build the row() callback.
 */
export interface MapVerticalLayout extends VerticalLayout {
  rowMap: Map<string, number>;
}
