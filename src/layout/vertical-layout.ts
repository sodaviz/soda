import { Annotation } from "../annotations/annotation";
import { Chart } from "../charts/chart";
import { GlyphCallback } from "../glyph-utilities/glyph-modifier";

export interface VerticalLayout {
  row: GlyphCallback<Annotation, Chart<any>, number>;
  rowCount: number;
}

export const defaultVerticalLayout: VerticalLayout = {
  row: () => 0,
  rowCount: 1,
};

export interface MapVerticalLayout extends VerticalLayout {
  rowMap: Map<string, number>;
}
