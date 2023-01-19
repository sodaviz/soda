// This code was adapted from https://github.com/vasturiano/d3-radial-axis
//
// The source code in this file is licensed under the MIT license.
//
// For posterity, we will maintain the original license here:
//
// MIT License
//
// Copyright (c) 2017 Vasco Asturiano
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

import * as d3 from "d3";
import { Annotation } from "../../annotations/annotation";
import { AxisConfig, AxisModifier, AxisType } from "../axes";
import { generateId } from "../../utilities/id-generation";
import { AnnotationDatum, bind } from "../../glyph-utilities/bind";
import { GlyphModifierConfig } from "../../glyph-utilities/glyph-modifier";
import {
  applyPropertyPolicy,
  callbackifyOrDefault,
  GlyphCallback,
  GlyphProperty,
} from "../../glyph-utilities/glyph-property";
import { RadialChart } from "../../charts/radial-chart";

/**
 *
 * @param x
 * @internal
 */
function identity(x: any) {
  return x;
}

/**
 *
 * @param x
 * @param y
 * @internal
 */
function translate(x: number, y: number) {
  return "translate(" + x + "," + y + ")";
}

/**
 *
 * @param angleScale
 * @param radius
 * @param axisType
 * @param tickSizeInner
 * @param tickSizeOuter
 * @param tickPadding
 * @internal
 */
function _radialAxis(
  angleScale: d3.ScaleLinear<number, number>,
  radius: number,
  axisType: AxisType.Bottom | AxisType.Top,
  tickSizeInner: number,
  tickSizeOuter: number,
  tickPadding: number
) {
  let outer = axisType == AxisType.Top;

  let tickValues: number[] | null = null;
  let tickFormat: ((domainValue: number, index: number) => string) | null =
    null;

  function angleTransform(angle: number, radius: number) {
    return translate(...polarToCartesian(angle, radius));
  }

  function polarToCartesian(angle: number, r: number): [number, number] {
    return [Math.sin(angle) * r, -Math.cos(angle) * r];
  }

  function axis(selection: d3.Selection<any, any, any, any>) {
    let values =
      tickValues != null
        ? tickValues
        : angleScale.ticks != undefined
        ? angleScale.ticks()
        : angleScale.domain();

    let format =
      tickFormat != null
        ? tickFormat
        : angleScale.tickFormat
        ? angleScale.tickFormat()
        : identity;

    let spacing = Math.max(tickSizeInner, 0) + tickPadding;
    let angleRange = angleScale.range();
    let anglePos = identity(angleScale.copy());
    let path = selection.selectAll<any, number>(".domain").data([null]);
    let tick = selection
      .selectAll<any, number>(".tick")
      .data(values, angleScale)
      .order();
    let tickExit = tick.exit();
    let tickEnter = tick.enter().append("g").attr("class", "tick");
    let line = tick.select<SVGLineElement>("line");
    let text = tick.select<SVGTextElement>("text");

    path = path.merge(
      path
        .enter()
        .insert("path", ".tick")
        .attr("class", "domain")
        .attr("stroke", "#000")
    );

    tick = tick.merge(tickEnter);

    line = line.merge(tickEnter.append("line").attr("stroke", "#000"));

    text = text.merge(
      tickEnter
        .append("text")
        .attr("fill", "#000")
        .attr("dy", ".35em")
        .attr("text-anchor", "middle")
    );

    tickExit.remove();

    function getTickPath(angle: number, r: number) {
      return (
        "M" +
        polarToCartesian(angle, r + tickSizeOuter * (outer ? 1 : -1)).join(
          ","
        ) +
        "L" +
        polarToCartesian(angle, r).join(",")
      );
    }

    function getArcPath(startAngle: number, endAngle: number, r: number) {
      return (
        "M" +
        polarToCartesian(startAngle, r).join(",") +
        // Full-circle
        (Math.abs(endAngle - startAngle) >= 2 * Math.PI
          ? "A" +
            [r, r, 0, 1, 1]
              .concat(polarToCartesian(startAngle + Math.PI, r))
              .join(",") +
            "A" +
            [r, r, 0, 1, 1].concat(polarToCartesian(startAngle, r)).join(",")
          : "") +
        "A" +
        [
          r,
          r,
          0,
          // Large arc flag
          Math.abs(endAngle - startAngle) % (2 * Math.PI) > Math.PI ? 1 : 0,
          // Sweep (clock-wise) flag
          endAngle > startAngle ? 1 : 0,
        ]
          .concat(polarToCartesian(endAngle, r))
          .join(",")
      );
    }

    path.attr(
      "d",
      getArcPath(angleRange[0], angleRange[1], radius) +
        getTickPath(angleRange[0], radius) +
        getTickPath(angleRange[1], radius)
    );

    tick
      .attr("opacity", 1)
      .attr("transform", (d: number) => angleTransform(anglePos(d), radius));

    line
      .attr("x1", 0)
      .attr("y1", 0)
      .attr(
        "x2",
        (d: number) =>
          polarToCartesian(anglePos(d), tickSizeInner)[0] * (outer ? 1 : -1)
      )
      .attr(
        "y2",
        (d: number) =>
          polarToCartesian(anglePos(d), tickSizeInner)[1] * (outer ? 1 : -1)
      );

    text
      .attr(
        "x",
        (d: number) =>
          polarToCartesian(anglePos(d), spacing)[0] * (outer ? 1 : -1)
      )
      .attr(
        "y",
        (d: number) =>
          polarToCartesian(anglePos(d), spacing)[1] * (outer ? 1 : -1)
      )
      .text(format);

    selection
      .attr("fill", "none")
      .attr("font-size", 10)
      .attr("font-family", "sans-serif");
  }

  axis.angleScale = (scale?: d3.ScaleLinear<number, number>) => {
    if (scale != undefined) {
      angleScale = scale;
      return axis;
    }
    return angleScale;
  };

  axis.radius = (value?: number) => {
    if (value != undefined) {
      radius = value;
      return axis;
    }
    return radius;
  };
  return axis;
}

/**
 * An interface that defines the parameters for a call to the radialAxis rendering function.
 */
export interface RadialAxisConfig<
  A extends Annotation,
  C extends RadialChart<any>
> extends AxisConfig<A, C> {
  /**
   * This determines whether the ticks and labels will be placed on the top or the bottom of the axis.
   */
  axisType?: GlyphProperty<A, C, AxisType.Bottom | AxisType.Top>;
  /**
   * If this is set to true, the axis glyph will not translate or scale during zoom events.
   */
  fixed?: boolean;
}

/**
 * A class that manages the styling and positioning of a group of radial axis glyphs.
 * @internal
 */
export class RadialAxisModifier<
  A extends Annotation,
  C extends RadialChart<any>
> extends AxisModifier<A, C> {
  axisType: GlyphCallback<A, C, AxisType.Top | AxisType.Bottom>;

  constructor(config: GlyphModifierConfig<A, C> & RadialAxisConfig<A, C>) {
    super(config);

    this.tickSizeOuter = callbackifyOrDefault(config.tickSizeOuter, () => 12);
    this.tickSizeInner = callbackifyOrDefault(config.tickSizeInner, () => 6);

    if (config.fixed) {
      this.domain = callbackifyOrDefault(config.domain, (d) => [
        d.c.xScale.invert(this.chart.range[0]),
        d.c.xScale.invert(this.chart.range[1]),
      ]);
      this.range = callbackifyOrDefault(config.range, () => this.chart.range);
    } else {
      // TODO: implement this :)
      throw "non-fixed radial axis not implemented";
    }

    this.axisType = callbackifyOrDefault(config.axisType, () => AxisType.Top);

    this.initializePolicy.attributeRuleMap.set("group", [
      { key: "id", property: (d) => d.a.id },
    ]);

    this.zoomPolicy.attributeRuleMap.set("group", [
      {
        key: "transform",
        property: (d) =>
          `translate(${d.c.viewportWidthPx / 2}, ${d.c.viewportWidthPx / 2})`,
      },
    ]);
  }

  buildScale(d: AnnotationDatum<A, C>) {
    return d3.scaleLinear().domain(this.domain(d)).range(this.range(d));
  }

  zoom() {
    let axisGroup = this.selectionMap.get("group");
    if (axisGroup == undefined) {
      console.error(
        "group selection undefined in call to zoom(), unable to build axis"
      );
      throw "group selection undefined";
    }

    axisGroup.each((d, i, nodes) => {
      let axis = _radialAxis(
        this.buildScale(d),
        this.chart.outerRadius,
        this.axisType(d),
        this.tickSizeOuter(d),
        this.tickSizeInner(d),
        this.tickPadding(d)
      );

      d3.select(nodes[i]).call(axis);
    });

    this.selectionMap.set("axis-line", this.selection.selectAll("path.domain"));
    this.selectionMap.set("ticks", this.selection.selectAll("g.tick line"));
    this.selectionMap.set(
      "tick-labels",
      this.selection.selectAll("g.tick text")
    );

    applyPropertyPolicy({
      selectionKeys: this.selectionKeys,
      selectionMap: this.selectionMap,
      policy: this.zoomPolicy,
      context: "zoom",
    });
  }
}

/**
 * This renders Annotations as horizontal axes in a Chart.
 * @param config
 */
export function radialAxis<A extends Annotation, C extends RadialChart<any>>(
  config: RadialAxisConfig<A, C>
): d3.Selection<SVGGElement, string, any, any> {
  let selector = config.selector || generateId("soda-radial-axis-glyph");

  let binding = bind<A, C, SVGGElement>({
    ...config,
    selector,
    elementType: "g",
  });

  let modifier = new RadialAxisModifier({
    selector: selector,
    selection: binding.merge,
    ...config,
  });

  config.chart.addGlyphModifier(modifier);

  return binding.g;
}
