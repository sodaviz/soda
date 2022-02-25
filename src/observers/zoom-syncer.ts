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
   * The ZoomZyncer alert method synchronizes all of the Transforms on each of the Charts is is observing and
   * fires the zooming functionality.
   * @param caller
   */
  public alert(caller: Chart<any>): void {
    let callerTransform = caller.transform;
    let callerDomain = caller.xScale.domain();
    for (const chart of this.charts) {
      if (chart.id !== caller.id) {
        let chartTransform = chart.transform;
        chartTransform.k = callerTransform.k;
        chart.setDomain([callerDomain[0], callerDomain[1]]);
        chart.applyGlyphModifiers();
        chart.postZoom();
      }
    }
  }
}
