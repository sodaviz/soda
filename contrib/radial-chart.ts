import * as d3 from "d3";
import { axisRadialOuter } from "d3-radial-axis";
import {
  Annotation,
  Chart,
  ChartConfig,
  RenderParams,
  Transform,
} from "../src";

/**
 * A simple interface that defines the parameters that initialize a RadialChart
 */
export interface RadialChartConfig<P extends RenderParams>
  extends ChartConfig<P> {
  /**
   * The "height" of the radial track on which annotations will be rendered. Conceptually, this is equal to to the
   * difference of the radii of two concentric circles that define an annulus.
   */
  trackHeight?: number;
  /**
   * The initial number of ticks on the chart axis.
   */
  tickCount?: number;
}

/**
 * This Chart class is designed for rendering features in a circular context, e.g. bacterial genomes.
 */
export class RadialChart<P extends RenderParams> extends Chart<P> {
  /**
   * The "height" of the radial track on which annotations will be rendered. Conceptually, this is equal to to the
   * difference of the radii of two concentric circles that define an annulus.
   */
  trackHeight: number;
  /**
   * The inner radius of the conceptual annulus that defines the Chart annotation track.
   */
  innerRadius: number;
  /**
   * The outer radius of the conceptual annulus that defines the Chart annotation track.
   */
  outerRadius: number;
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

  public constructor(config: RadialChartConfig<P>) {
    super(config);

    this.trackHeight = config.trackHeight || this.viewportWidth / 4;

    this.outerRadius = this.viewportWidth / 2;
    this.innerRadius = this.outerRadius - this.trackHeight;
    this.rowCount = config.rowCount || 1;
    this.rowHeight = this.trackHeight / this.rowCount;
    this.tickCount = config.tickCount || 10;

    this.preRender = function (params): void {
      this.applyLayoutAndSetRowCount(params);
      this.updateDivProperties();
      this.addAxis();
      this.fitPadHeight();
      this.fitViewport();
      this.squareToContainerWidth();
      this.initializeXScaleFromRenderParams(params);
      this.renderTrackOutline();
    };

    this.inRender = function (params): void {
      if (params.annotations != undefined) {
        this.viewportSelection
          .append("g")
          .attr(
            "transform",
            `translate(${this.viewportWidth / 2}, ${this.viewportWidth / 2})`
          )
          .selectAll("path.ann")
          .data(params.annotations)
          .enter()
          .append("path")
          .attr("class", "ann")
          .attr("d", (a: Annotation) => {
            return d3
              .arc<any, Annotation>()
              .startAngle(this.xScale(a.start))
              .endAngle(this.xScale(a.end))(a);
          })
          .attr("fill", "green");
      }
    };
    this.configureZoom();
  }

  public applyLayoutAndSetRowCount(params: P) {
    super.applyLayoutAndSetRowCount(params);
    this.rowHeight = this.trackHeight / this.rowCount;
  }

  public configureZoom(): void {
    const self = this;
    this.padSelection
      .call(
        d3
          .zoom()
          .filter(() => {
            if (d3.event.type === "wheel") {
              return d3.event.ctrlKey;
            }
            return true;
          })
          .scaleExtent([1, Infinity])
          .on("zoom", () => self.zoom())
      )
      .on("dblclick.zoom", null);
  }

  public renderTrackOutline() {
    this.viewportSelection
      .selectAll("path.track-outline")
      .data(["track-outline"])
      .enter()
      .append("path")
      .attr("class", "track-outline")
      .attr(
        "transform",
        `translate(${this.viewportWidth / 2}, ${this.viewportWidth / 2})`
      )
      .attr(
        "d",
        d3
          .arc<any, null>()
          .innerRadius(this.innerRadius - 1)
          .outerRadius(this.innerRadius)
          .startAngle(0)
          .endAngle(2 * Math.PI)(null)!
      );
  }

  public addAxis() {
    let axis = axisRadialOuter(this.xScale, this.outerRadius);
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
    let axis = axisRadialOuter(this.xScale, this.outerRadius);
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

    let vertical = source.layerY - this.upperPadSize - this.viewportWidth / 2;
    let horizontal = source.layerX - this.leftPadSize - this.viewportWidth / 2;
    let hypotenuse = Math.sqrt(vertical * vertical + horizontal * horizontal);

    let theta = Math.asin(horizontal / hypotenuse);
    if (vertical < 0) {
      if (horizontal < 0) {
        theta += 2 * Math.PI;
      }
    } else {
      theta = Math.PI - theta;
    }
    let semanticTheta = this.xScale.invert(theta);
    let originalDomain = this.xScaleBase.domain();
    let currentDomain = this.xScale.domain();

    let originalDomainWidth = originalDomain[1] - originalDomain[0];
    let currentDomainWidth = currentDomain[1] - currentDomain[0];

    let newDomain = [currentDomain[0], currentDomain[1]];

    if (source.type == "wheel") {
      let leftDomainRatio =
        (semanticTheta - currentDomain[0]) / currentDomainWidth;
      let rightDomainRatio =
        (currentDomain[1] - semanticTheta) / currentDomainWidth;
      let newDomainWidth = originalDomainWidth / transform.k;
      let leftDelta = newDomainWidth * leftDomainRatio;
      let rightDelta = newDomainWidth * rightDomainRatio;

      newDomain = [semanticTheta - leftDelta, semanticTheta + rightDelta];

      newDomain[0] = Math.max(newDomain[0], originalDomain[0]);
      newDomain[1] = Math.min(newDomain[1], originalDomain[1]);
    } else if (source.type == "mousemove") {
      let deltaX = source.movementX / transform.k;
      if (newDomain[0] + deltaX <= originalDomain[0]) {
        deltaX = originalDomain[0] - newDomain[0];
      } else if (newDomain[1] + deltaX >= originalDomain[1]) {
        deltaX = originalDomain[1] - newDomain[1];
      }
      newDomain[0] += deltaX;
      newDomain[1] += deltaX;
    }

    this.xScale = d3
      .scaleLinear()
      .domain(newDomain)
      .range([0, 2 * Math.PI]);

    this.viewportSelection
      .selectAll<any, Annotation>("path.ann")
      .attr("d", (a) => {
        return d3
          .arc<any, Annotation>()
          .innerRadius((a) => this.innerRadius + a.y * this.rowHeight)
          .outerRadius((a) => this.innerRadius + (a.y + 1) * this.rowHeight)
          .startAngle(Math.max(this.xScale(a.start), 0))
          .endAngle(Math.min(this.xScale(a.end), 2 * Math.PI))(a);
      })
      .attr("visibility", (a) => {
        if (a.start < newDomain[1] && a.end > newDomain[0]) {
          return "visible";
        } else {
          return "hidden";
        }
      });

    this.zoomAxis();
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
