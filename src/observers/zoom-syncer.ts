import { Chart } from "../charts/chart";
import { ChartObserver } from "./chart-observer";

/**
 * This class can be used to synchronize the zoom level across different Charts.
 */
export class ZoomSyncer extends ChartObserver {
  constructor() {
    super();
  }

  /**
   * @param caller
   */
  public alert(caller: Chart<any>): void {
    let callerTransform = caller.transform;
    for (const chart of this.charts) {
      if (chart.id !== caller.id) {
        let chartTransform = chart.transform;
        chartTransform.x = callerTransform.x;
        chartTransform.y = callerTransform.y;
        chartTransform.k = callerTransform.k;
        chart.rescaleXScale();
        chart.applyGlyphModifiers();
      }
    }
  }
}
