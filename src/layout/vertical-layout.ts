import { Annotation } from "../annotations/annotation";
import { Chart } from "../charts/chart";
import { AnnotationDatum } from "../glyph-utilities/bind";

export interface VerticalLayout {
  (d: AnnotationDatum<Annotation, Chart<any>>): number;

  rowCount: number;
}

let defaultLayout: VerticalLayout;

export function getDefaultVerticalLayout() {
  if (defaultLayout == undefined) {
    defaultLayout = <VerticalLayout>((d) => 0);
    defaultLayout.rowCount = 1;
  }
  return defaultLayout;
}

export interface MapVerticalLayout extends VerticalLayout {
  rowMap: Map<string, number>;
}
