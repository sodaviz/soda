import * as d3 from "d3";
import { axisRadialOuter } from "./radial-axis";
import {
  Chart,
  ChartConfig,
  generateId,
  RenderParams,
  Transform,
} from "../src";
import { radialRectangle } from "./radial-rectangle";
import { HighlightConfig } from "../src/charts/chart";

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
   * A d3 selection to the track outline.
   */
  trackOutlineSelection: d3.Selection<any, any, any, any> | undefined;

  public constructor(config: RadialChartConfig<P>) {
    super(config);

    this.trackHeight = config.trackHeight || this.calculateViewportWidth() / 4;

    this.outerRadius = this.calculateViewportWidth() / 2;
    this.innerRadius = this.outerRadius - this.trackHeight;
    this.rowCount = config.rowCount || 1;
    this.rowHeight = this.trackHeight / this.rowCount;

    // this.preRender = function (params): void {
    //   this.initializeXScaleFromRenderParams(params);
    //   this.applyLayoutAndSetRowCount(params);
    //   this.updateDivProperties();
    //   this.addAxis();
    //   this.squareToDivWidth();
    //   this.fitRadialDimensions();
    //   this.renderTrackOutline();
    // };

    this.draw =
      config.draw ||
      function (params): void {
        radialRectangle({
          chart: this,
          annotations: params.annotations || [],
        });
      };
    this.configureZoom();
  }

  public fitRadialDimensions(): void {
    this.trackHeight = this.calculateViewportWidth() / 4;
    this.outerRadius = this.calculateViewportWidth() / 2;
    this.innerRadius = this.outerRadius - this.trackHeight;
    this.rowHeight = this.trackHeight / this.rowCount;
  }

  public applyLayoutAndSetRowCount(params: P) {
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

  public addTrackOutline() {
    this.trackOutlineSelection = this.viewportSelection
      .selectAll<SVGPathElement, string>("path.track-outline")
      .data(["track-outline"])
      .enter()
      .append<SVGPathElement>("path")
      .attr("class", "track-outline");

    this.renderTrackOutline();
  }

  public renderTrackOutline() {
    if (this.trackOutlineSelection != undefined) {
      this.trackOutlineSelection
        .attr(
          "transform",
          `translate(${this.calculateViewportWidth() / 2}, ${
            this.calculateViewportWidth() / 2
          })`
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
  }

  public addAxis() {
    this.overflowViewportSelection
      .selectAll("g.radial-axis")
      .data(["radial-axis"])
      .enter()
      .append("g")
      .attr("class", "radial-axis");

    this.renderAxis();
  }

  public renderAxis() {
    let axis = axisRadialOuter(this.xScale, this.outerRadius);

    this.overflowViewportSelection
      .selectAll("g.radial-axis")
      .call(axis)
      .attr(
        "transform",
        `translate(${this.calculateViewportWidth() / 2}, ${
          this.calculateViewportWidth() / 2
        })`
      );
  }

  public squareToDivWidth(): void {
    let dims = this.calculateDivDimensions();
    this._divHeight = `${dims.width}px`;
    this.padSelection.attr("width", dims.width);
    this.padSelection.attr("height", dims.height);
    this.updateViewportProperties();
    // this.updateDivProperties();
  }

  public resize() {
    this.squareToDivWidth();
    this.fitRadialDimensions();
    this.renderAxis();
    this.renderTrackOutline();
    this.applyGlyphModifiers();
    this.postResize();
  }

  public zoom() {
    super.zoom();
    this.renderAxis();
    this.renderTrackOutline();
  }

  public domainFromWheelEvent(
    transform: Transform,
    sourceEvent: WheelEvent
  ): [number, number] {
    let currentDomain = this.xScale.domain();
    let currentDomainWidth = currentDomain[1] - currentDomain[0];
    let originalDomainWidth = this.initialDomain[1] - this.initialDomain[0];

    let vertical =
      sourceEvent.offsetY -
      this.upperPadSize -
      this.calculateViewportWidth() / 2;
    let horizontal =
      sourceEvent.offsetX -
      this.leftPadSize -
      this.calculateViewportWidth() / 2;
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

    let leftDomainRatio =
      (semanticTheta - currentDomain[0]) / currentDomainWidth;

    let rightDomainRatio =
      (currentDomain[1] - semanticTheta) / currentDomainWidth;

    let newDomainWidth = originalDomainWidth / transform.k;

    let leftDelta = newDomainWidth * leftDomainRatio;
    let rightDelta = newDomainWidth * rightDomainRatio;

    let newDomain: [number, number] = [
      semanticTheta - leftDelta,
      semanticTheta + rightDelta,
    ];

    newDomain[0] = Math.max(newDomain[0], this.initialDomain[0]);
    newDomain[1] = Math.min(newDomain[1], this.initialDomain[1]);

    return newDomain;
  }

  public domainFromMousemoveEvent(
    transform: Transform,
    sourceEvent: WheelEvent
  ): [number, number] {
    let currentDomain = this.xScale.domain();

    let newDomain: [number, number] = [currentDomain[0], currentDomain[1]];
    let radiusFraction = sourceEvent.movementX / this.outerRadius;
    let deltaTheta = radiusFraction * Math.PI * -1;
    let deltaX = this.xScale.invert(deltaTheta) - this.xScale.invert(0);

    if (newDomain[0] + deltaX <= this.initialDomain[0]) {
      deltaX = this.initialDomain[0] - newDomain[0];
    } else if (newDomain[1] + deltaX >= this.initialDomain[1]) {
      deltaX = this.initialDomain[1] - newDomain[1];
    }
    newDomain[0] += deltaX;
    newDomain[1] += deltaX;

    return newDomain;
  }

  public updateRange(): void {
    this.xScale.range([0, 2 * Math.PI]);
  }

  public highlight(config: HighlightConfig): string {
    let selector = config.selector || generateId("highlight");
    let selection = this.highlightSelection
      .selectAll<SVGPathElement, string>(`path.${selector}`)
      .data([config]);

    let enter = selection
      .enter()
      .append("path")
      .attr("class", selector)
      .attr(
        "transform",
        `translate(${this.calculateViewportWidth() / 2 + this.leftPadSize}, ${
          this.calculateViewportWidth() / 2 + this.upperPadSize
        })`
      );

    enter
      .merge(selection)
      .attr("d", (d) =>
        d3
          .arc<any, HighlightConfig>()
          .innerRadius(() => this.innerRadius)
          .outerRadius(() => this.outerRadius)
          .startAngle((d) => Math.max(this.xScale(d.start), 0))
          .endAngle((d) => Math.min(this.xScale(d.end), 2 * Math.PI))(d)
      )
      .attr("fill", config.color || "black")
      .attr("fill-opacity", config.opacity || 0.1);
    selection.exit().remove();
    return selector;
  }

  public clearHighlight(selector?: string): void {
    if (selector == undefined) {
      this.highlightSelection.selectAll("rect").remove();
    } else {
      this.highlightSelection
        .selectAll<SVGRectElement, string>(`rect.${selector}`)
        .remove();
    }
  }

  public zoomHighlight(): void {
    this.highlightSelection
      .selectAll<any, HighlightConfig>("path")
      .attr(
        "transform",
        `translate(${this.calculateViewportWidth() / 2 + this.leftPadSize}, ${
          this.calculateViewportWidth() / 2 + this.upperPadSize
        })`
      )
      .attr("d", (d) =>
        d3
          .arc<any, HighlightConfig>()
          .innerRadius((d) => this.innerRadius)
          .outerRadius((d) => this.outerRadius)
          .startAngle((d) => Math.max(this.xScale(d.start), 0))
          .endAngle((d) => Math.min(this.xScale(d.end), 2 * Math.PI))(d)
      );
  }
}
