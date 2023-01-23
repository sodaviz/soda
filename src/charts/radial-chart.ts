import * as d3 from "d3";
import { radialAxis } from "../glyphs/radial/radial-axis";
import {
  Chart,
  ChartConfig,
  generateId,
  RenderParams,
  Transform,
} from "../index";
import { radialRectangle } from "../glyphs/radial/radial-rectangle";
import { HighlightConfig } from "./chart";

/**
 * A simple interface that defines the parameters that initialize a RadialChart
 */
export interface RadialChartConfig<P extends RenderParams>
  extends ChartConfig<P> {
  /**
   * The angle (in radians) of the "notch" at the top of the radial chart.
   */
  notchAngle?: number;
  /**
   * The outer radius of the Chart in pixels. If supplied, the outerRadiusRatio will take precedence over this value.
   *
   * If the chart is in resizable mode, this value is used to compute the the outerRadiusRatio, which will be used
   * to resize the outer radius in response to resize events.
   */
  outerRadius?: number;
  /**
   * The outer radius of the Chart expressed as the ratio (outer radius / viewport width).
   */
  outerRadiusRatio?: number;
  /**
   * The "height" of the radial track on which annotations will be rendered. This is equal to to the
   * difference of the radii of two concentric circles that define an annulus.
   *
   * If the Chart is in resizable mode, this value is used to compute the trackHeightRatio, which will be used to
   * resize the inner radius in response to resize events.
   */
  trackHeight?: number;
  /**
   * The track height expressed as the ratio ( track height / viewport width)
   */
  trackHeightRatio?: number;
}

/**
 * This Chart class is designed for rendering features in a circular context, e.g. bacterial genomes.
 */
export class RadialChart<P extends RenderParams> extends Chart<P> {
  /**
   * The angle (in radians) of the "notch" at the top of the radial chart.
   */
  notchAngle: number;
  /**
   * The "height" of the radial track on which annotations will be rendered. Conceptually, this is equal to to the
   * difference of the radii of two concentric circles that define an annulus.
   */
  trackHeight: number;
  /**
   * The track height expressed as the ratio ( track height / viewport width)
   */
  trackHeightRatio: number;
  /**
   * The inner radius of the Chart in pixels.
   */
  innerRadius: number;
  /**
   * The outer radius of the Chart in pixels.
   */
  outerRadius: number;
  /**
   * The outer radius of the Chart expressed as the ratio (outer radius / viewport width).
   */
  outerRadiusRatio: number;
  /**
   * A d3 selection to the track outline.
   */
  trackOutlineSelection: d3.Selection<any, any, any, any> | undefined;

  public constructor(config: RadialChartConfig<P>) {
    super(config);

    // default the notch angle to ~1% of a circle
    this.notchAngle =
      config.notchAngle != undefined ? config.notchAngle : Math.PI / 200;

    // we can set the range here once and forget about it
    this.xScale.range([this.notchAngle, 2 * Math.PI - this.notchAngle]);

    this.trackHeight = config.trackHeight || this.viewportWidthPx / 4;
    this.trackHeightRatio =
      config.trackHeightRatio || this.trackHeight / this.viewportWidthPx;

    this.outerRadius = config.outerRadius || this.viewportWidthPx / 2;
    this.outerRadiusRatio =
      config.outerRadiusRatio || this.outerRadius / this.viewportWidthPx;

    this.innerRadius = this.outerRadius - this.trackHeight;
    this.rowCount = config.rowCount || 1;
    this.rowHeight = this.trackHeight / this.rowCount;

    this.setPadAttribute("height", "100%");

    this.updateDimensions =
      config.updateDimensions ||
      function (this): void {
        this.squareToDivWidth();
        this.updateViewportProperties();
        this.fitRadialDimensions();
        this.renderTrackOutline();
      };

    this.draw =
      config.draw ||
      function (this, params): void {
        this.addAxis();
        radialRectangle({
          chart: this,
          annotations: params.annotations || [],
        });
      };
    this.configureZoom();
  }

  public fitRadialDimensions(): void {
    this.outerRadius = this.viewportWidthPx * this.outerRadiusRatio;
    // set the inner radius based off of the track height because it's probably
    // easier to think about the outer radius and the track height, as opposed
    // to thinking about the outer radius and inner radius
    this.trackHeight = this.viewportWidthPx * this.trackHeightRatio;
    this.innerRadius = this.outerRadius - this.trackHeight;
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
      .attr("class", "track-outline")
      .attr("stroke", "black")
      .attr("fill", "none");

    this.renderTrackOutline();
  }

  public renderTrackOutline() {
    if (this.trackOutlineSelection != undefined) {
      this.trackOutlineSelection
        .attr(
          "transform",
          `translate(${this.viewportWidthPx / 2}, ${this.viewportWidthPx / 2})`
        )
        .attr(
          "d",
          d3
            .arc<any, null>()
            .innerRadius(this.innerRadius - 1)
            .outerRadius(this.outerRadius)
            .startAngle(this.range[0])
            // TODO: why can this return null?
            .endAngle(this.range[1])(null)!
        );
    }
  }

  public addAxis() {
    radialAxis(this.axisConfig);
  }

  public squareToDivWidth(): void {
    let dims = this.calculateDivDimensions();
    this.divHeight = dims.width;
  }

  public updateViewportHeight(): void {
    if (this._viewportHeight != undefined) {
      return;
    }

    let height =
      this.calculatePadHeight() - (this.upperPadSize + this.lowerPadSize);

    this.viewportHeightPx = height;
    this.setViewportAttribute("height", `${height}`);
  }

  public updateViewportWidth(): void {
    if (this._viewportWidth != undefined) {
      return;
    }

    let width =
      this.calculatePadWidth() - (this.leftPadSize + this.rightPadSize);

    this.viewportWidthPx = width;
    this.setViewportAttribute("width", `${width}`);
  }

  public resize() {
    this.squareToDivWidth();
    this.updateViewportProperties();
    this.fitRadialDimensions();
    this.renderTrackOutline();
    this.applyGlyphModifiers();
    this.postResize();
  }

  public zoom() {
    super.zoom();
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
      sourceEvent.offsetY - this.upperPadSize - this.viewportWidthPx / 2;
    let horizontal =
      sourceEvent.offsetX - this.leftPadSize - this.viewportWidthPx / 2;
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
    // this is a no-op for now, but it won't be if we implement
    // closing/opening of the sector based on zoom level
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
        `translate(${this.viewportWidthPx / 2 + this.leftPadSize}, ${
          this.viewportWidthPx / 2 + this.upperPadSize
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
        `translate(${this.viewportWidthPx / 2 + this.leftPadSize}, ${
          this.viewportWidthPx / 2 + this.upperPadSize
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
