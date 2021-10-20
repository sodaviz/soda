import { Chart } from "../charts/chart";

export abstract class ChartObserver {
  /**
   * A list of Charts that the Plugin will pay attention to.
   */
  charts: Chart<any>[] = [];

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

  protected addChart(chart: Chart<any>): void {
    this.charts.push(chart);
    chart.observers.push(this);
  }
}
