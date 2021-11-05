import { Chart } from "../charts/chart";

/**
 * An abstract class for objects that "observe" Charts.
 */
export abstract class ChartObserver {
  /**
   * A list of Charts that the Plugin will pay attention to.
   */
  charts: Chart<any>[] = [];

  /**
   * The method that will be called when the observer is alerted by a Chart.
   * @param chart
   */
  public abstract alert(chart: Chart<any>): void;

  /**
   * This method registers a Chart or list of Charts with the Plugin.
   * @param chart The Chart to be added.
   */
  public add(chart: Chart<any> | Chart<any>[]): void {
    if (Array.isArray(chart)) {
      for (const c of chart) {
        this.addChart(c);
      }
    } else {
      this.addChart(chart);
    }
  }

  /**
   * Add a Chart to the observer.
   * @param chart
   * @protected
   */
  protected addChart(chart: Chart<any>): void {
    this.charts.push(chart);
    chart.observers.push(this);
  }
}
