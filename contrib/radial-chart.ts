import * as d3 from "d3";
import { axisRadialOuter } from "d3-radial-axis";
import {
  Annotation,
  Chart,
  ChartConfig,
  RenderParams,
  Transform,
} from "../src";

// export class RadialChartArcZoomBehavior<
//   A extends Annotation,
//   C extends RadialChart<any>
// > implements ZoomBehavior<C, d3.Selection<SVGElement, A, HTMLElement, any>>
// {
//   selector: string;
//   id = "radial-chart-arc-zoom-behavior";
//
//   constructor(selector: string) {
//     this.selector = `path.${selector}`;
//   }
//
//   public apply(
//     chart: C,
//     selection: d3.Selection<SVGElement, A, HTMLElement, any>
//   ): void {
//     let chartTransform = chart.viewportSelection.node().__zoom;
//     selection
//       .attr(
//         "d",
//         d3
//           .arc<any, A>()
//           .outerRadius((a) => chart.outerRadius(chart) - a.y * chart.rowHeight)
//           .innerRadius(
//             (a) => chart.outerRadius(chart) - (a.y + 1) * chart.rowHeight
//           )
//           .startAngle((a) => chart.xScale(a.x))
//           .endAngle((a) => chart.xScale(a.x + a.w))
//       )
//       .attr("transform", chartTransform);
//   }
// }

// export class RadialChartBrushZoomBehavior<
//   A extends Annotation,
//   C extends RadialChart<any>
// > implements ZoomBehavior<C, d3.Selection<SVGElement, A, HTMLElement, any>>
// {
//   selector: string;
//   id = "radial-chart-brush-zoom-behavior";
//
//   constructor(selector: string) {
//     this.selector = `path.${selector}`;
//   }
//
//   public apply(
//     chart: C,
//     selection: d3.Selection<SVGElement, A, HTMLElement, any>
//   ): void {
//     let chartTransform = chart.viewportSelection.node().__zoom;
//     selection
//       .attr(
//         "d",
//         d3
//           .arc<any, A>()
//           .outerRadius(() => chart.outerRadius(chart))
//           .innerRadius(
//             () => chart.outerRadius(chart) - chart.rowCount * chart.rowHeight
//           )
//           .startAngle((a) => chart.xScale(a.x))
//           .endAngle((a) => chart.xScale(a.x + a.w))
//       )
//       .attr("transform", chartTransform)
//       .each((a, i, nodes) => {
//         nodes[i].parentNode!.appendChild(nodes[i]);
//       });
//   }
// }
//
// export class RadialChartTrackZoomBehavior<
//   A extends Annotation,
//   C extends RadialChart<any>
// > implements ZoomBehavior<C, d3.Selection<SVGElement, A, HTMLElement, any>>
// {
//   selector: string;
//   id = "radial-chart-track-zoom-behavior";
//
//   constructor(selector: string) {
//     this.selector = `path.${selector}`;
//   }
//
//   public apply(
//     chart: C,
//     selection: d3.Selection<SVGElement, A, HTMLElement, any>
//   ): void {
//     let chartTransform = chart.viewportSelection.node().__zoom;
//     selection
//       .attr(
//         "d",
//         d3
//           .arc<any, A>()
//           .outerRadius((a) => chart.outerRadius(chart) - a.y * chart.rowHeight)
//           .innerRadius(
//             (a) => chart.outerRadius(chart) - (a.y + 1) * chart.rowHeight
//           )
//           .startAngle(3.14)
//           .endAngle(6.28 * 2)
//       )
//       .attr("transform", chartTransform);
//   }
// }
//
// export class RadialAxisZoomBehavior<
//   A extends Annotation,
//   C extends RadialChart<any>
// > implements ZoomBehavior<C, d3.Selection<SVGElement, A, HTMLElement, any>>
// {
//   selector: string;
//   id = "radial-axis-zoom-behavior";
//
//   constructor(selector: string) {
//     this.selector = `path.${selector}`;
//   }
//
//   public apply(
//     chart: C,
//     selection: d3.Selection<SVGElement, A, HTMLElement, any>
//   ): void {
//     let chartTransform = chart.viewportSelection.node().__zoom;
//     selection.attr("transform", chartTransform);
//
//     // TODO: I'd rather not create a new axis every time
//     let axis = axisRadialOuter(chart.xScale, chart.outerRadius(chart));
//
//     // we'll set the ticks by multiplying the tick
//     // count by the transform scale factor k rounded
//     // this seems to work well enough for now
//     let kRounded = Math.round(chartTransform.k);
//     axis.ticks(chart.tickCount * kRounded);
//
//     selection.call(axis);
//
//     // scale the ticks by the inverse of the scaling factor
//     selection
//       .selectAll("text")
//       .style("stroke", "#181d24")
//       .style("fill", "#181d24")
//       .style("font-size", 12)
//       .attr("transform", `scale(${1 / chartTransform.k})`);
//
//     selection
//       .selectAll("line")
//       .attr("transform", `scale(${1 / chartTransform.k})`);
//   }
// }

/**
 * A simple interface that defines the parameters that initialize a RadialChart
 */
export interface RadialChartConfig<P extends RenderParams>
  extends ChartConfig<P> {
  /**
   * The radius of the circle that defines the empty space in the center of the chart.
   */
  innerRadius?: (c: RadialChart<P>) => number;
  /**
   * The radius of the circle that defines the outer boundary of the chart.
   */
  outerRadius?: (c: RadialChart<P>) => number;
  /**
   * The initial number of ticks on the chart axis.
   */
  tickCount?: number;
  /**
   * This controls whether or not the chart will resize itself to match its container's dimensions.
   */
  resizable?: boolean;
}

/**
 * This Chart class is designed for rendering features in a circular context, e.g. bacterial genomes.
 */
export class RadialChart<P extends RenderParams> extends Chart<P> {
  /**
   * The radius of the circle that defines the empty space in the center of the chart.
   */
  innerRadius: (c: RadialChart<P>) => number;
  /**
   * The radius of the circle that defines the outer boundary of the chart.
   */
  outerRadius: (c: RadialChart<P>) => number;
  /**
   * The radius of the circle that defines the axis placement.
   */
  axisRadius?: number;
  /**
   * A d3 selection to the radial axis.
   */
  _axisSelection?: d3.Selection<any, any, any, any>;
  /**
   * The initial number of ticks to display on the radial axis. D3 usually refuses to use the actual number
   * supplied, and instead it tries really hard to make it even and "pretty."
   */
  tickCount: number;
  previousX: number = 0;
  previousY: number = 0;
  previousK: number = 1;

  public constructor(config: RadialChartConfig<P>) {
    super(config);

    this.innerRadius =
      config.innerRadius || ((c: RadialChart<P>) => c.viewportWidth / 3);
    this.outerRadius =
      config.outerRadius || ((c: RadialChart<P>) => c.viewportWidth / 2);
    this.rowCount = config.rowCount || 1;
    this.rowHeight =
      (this.outerRadius(this) - this.innerRadius(this)) / this.rowCount;
    this.tickCount = config.tickCount || 10;

    // this.preRender = () => {};
    // this.inRender = () => {};
    // this.postRender = () => {};

    this.configureZoom();
  }

  public configureZoom(): void {
    const self = this;
    this.padSelection
      .call(
        d3
          .zoom()
          .filter(() => {
            if (d3.event.type === "wheel") {
              // don't allow zooming without pressing ctrl
              return d3.event.ctrlKey;
            }
            return true;
          })
          .scaleExtent([1, Infinity])
          .on("zoom", () => self.zoom())
      )
      .on("dblclick.zoom", null);

    this.overflowViewportSelection
      .selectAll("path.point")
      .data(["point"])
      .enter()
      .append("path")
      .attr("class", "point")
      .attr("fill", "red")
      .attr(
        "transform",
        `translate(${this.viewportWidth / 2}, ${this.viewportWidth / 2})`
      );
  }

  public addAxis() {
    let axis = axisRadialOuter(this.xScale, this.outerRadius(this));
    axis.ticks(this.tickCount);

    this._axisSelection = this.overflowViewportSelection
      .append("g")
      .attr("class", "radial-axis")
      .call(axis);

    this._axisSelection.attr(
      "transform",
      `translate(${this.viewportWidth / 2}, ${this.viewportWidth / 2})`
    );
  }

  public zoomAxis() {
    let axis = axisRadialOuter(this.xScale, this.outerRadius(this));
    axis.ticks(this.tickCount);

    this._axisSelection = this.overflowViewportSelection
      .select("g.radial-axis")
      .call(axis);

    this._axisSelection.attr(
      "transform",
      `translate(${this.viewportWidth / 2}, ${this.viewportWidth / 2})`
    );
  }

  public zoom() {
    let transform;
    let source: any;
    if (d3.event != undefined) {
      transform = d3.event.transform;
      source = d3.event.sourceEvent;
    } else {
      console.warn(`d3.event is undefined in zoom() call on chart: ${this.id}`);
    }

    // console.log(transform);
    // console.log(source);

    let a = source.layerY - this.upperPadSize - this.viewportWidth / 2;
    let b = source.layerX - this.leftPadSize - this.viewportWidth / 2;
    let c = Math.sqrt(a * a + b * b);

    let theta = Math.asin(b / c);
    let semanticTheta = this.xScale.invert(theta);
    this.overflowViewportSelection.selectAll<any, null>("path.point").attr(
      "d",
      d3
        .arc<null>()
        .innerRadius(0)
        .outerRadius(this.outerRadius(this))
        .startAngle(this.xScale(semanticTheta - 1))
        .endAngle(this.xScale(semanticTheta + 1))
    );

    let originalDomain = this.xScaleBase.domain();
    let currentDomain = this.xScale.domain();

    let originalDomainWidth = originalDomain[1] - originalDomain[0];
    let currentDomainWidth = currentDomain[1] - currentDomain[0];

    let leftDomainRatio =
      (semanticTheta - currentDomain[0]) / currentDomainWidth;
    let rightDomainRatio =
      (currentDomain[1] - semanticTheta) / currentDomainWidth;

    let newDomainWidth = originalDomainWidth / transform.k;

    let newDomain = currentDomain;
    if (newDomainWidth != currentDomainWidth) {
      let leftDomainDelta = newDomainWidth * leftDomainRatio;
      let rightDomainDelta = newDomainWidth * rightDomainRatio;

      newDomain[0] = semanticTheta - leftDomainDelta;
      newDomain[1] = semanticTheta + rightDomainDelta;
    }

    let newRange = [0, 2 * Math.PI];

    this.xScale = d3.scaleLinear().domain(newDomain).range(newRange);

    this.viewportSelection
      .selectAll<any, Annotation>("path.ann")
      .attr("d", (a) => {
        return d3
          .arc<any, Annotation>()
          .innerRadius(400)
          .outerRadius(405)
          .startAngle(this.xScale(a.start))
          .endAngle(this.xScale(a.end))(a);
      });

    // this.rescaleXScale(transform);
    this.zoomAxis();
    // this.applyGlyphModifiers();
    this.alertObservers();
    this.postZoom();
  }

  get axisSelection(): d3.Selection<any, any, any, any> {
    if (this._axisSelection == null) {
      throw "_axisSelection is null or undefined";
    }
    return this._axisSelection;
  }

  public rescaleXScale(transformArg?: Transform) {
    let transform = transformArg || this.transform;
  }

  /**
   * Set the internal d3 scale to map from the provided semantic query range to the Chart's current
   * viewport dimensions.
   * @param start
   * @param end
   */
  public initializeXScale(start: number, end: number): void {
    this._renderStart = start;
    this._renderEnd = end;

    this.xScaleBase = d3
      .scaleLinear()
      .domain([this._renderStart, this._renderEnd])
      .range([0, 2 * Math.PI]);

    this.xScale = this.xScaleBase;
  }
}
