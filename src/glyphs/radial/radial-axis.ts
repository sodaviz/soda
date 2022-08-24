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

function identity(x: any) {
  return x;
}

function translate(x: number, y: number) {
  return "translate(" + x + "," + y + ")";
}

function radialAxis(
  angleScale: d3.ScaleLinear<number, number>,
  radius: number,
  outer?: boolean
) {
  let tickValues: number[] | null = null;
  let tickFormat: ((domainValue: number, index: number) => string) | null =
    null;
  let tickSizeInner = 6;
  let tickSizeOuter = 6;
  let tickPadding = 12;

  function angleTransform(angle: number, radius: number) {
    return translate(...polarToCart(angle, radius));
  }

  function polarToCart(angle: number, r: number): [number, number] {
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
        polarToCart(angle, r + tickSizeOuter * (outer ? 1 : -1)).join(",") +
        "L" +
        polarToCart(angle, r).join(",")
      );
    }

    function getArcPath(startAngle: number, endAngle: number, r: number) {
      return (
        "M" +
        polarToCart(startAngle, r).join(",") +
        // Full-circle
        (Math.abs(endAngle - startAngle) >= 2 * Math.PI
          ? "A" +
            [r, r, 0, 1, 1]
              .concat(polarToCart(startAngle + Math.PI, r))
              .join(",") +
            "A" +
            [r, r, 0, 1, 1].concat(polarToCart(startAngle, r)).join(",")
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
          .concat(polarToCart(endAngle, r))
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
          polarToCart(anglePos(d), tickSizeInner)[0] * (outer ? 1 : -1)
      )
      .attr(
        "y2",
        (d: number) =>
          polarToCart(anglePos(d), tickSizeInner)[1] * (outer ? 1 : -1)
      );

    text
      .attr(
        "x",
        (d: number) => polarToCart(anglePos(d), spacing)[0] * (outer ? 1 : -1)
      )
      .attr(
        "y",
        (d: number) => polarToCart(anglePos(d), spacing)[1] * (outer ? 1 : -1)
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

export function axisRadialInner(
  angleScale: d3.ScaleLinear<number, number>,
  radius: number
) {
  return radialAxis(angleScale, radius, false);
}

export function axisRadialOuter(
  angleScale: d3.ScaleLinear<number, number>,
  radius: number
) {
  return radialAxis(angleScale, radius, true);
}
