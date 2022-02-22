// This code was adapted from https://github.com/vasturiano/d3-radial-axis
//
// For posterity, We will maintain the original license:
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

function entering(this: any) {
  return !this.__axis;
}

type TickArguments = [] | [number] | [number, string];

function radialAxis(
  angleScale: d3.ScaleLinear<number, number>,
  startRadius: number,
  endRadius?: number,
  outer?: boolean
) {
  let tickArguments: TickArguments = [];
  let tickValues: number[] | null = null;
  // The domainValue type might be a bit narrow here, but it should be safe for soda
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

  function axis(context: d3.Selection<any, any, any, any>) {
    let isSpiral = endRadius !== undefined && startRadius !== endRadius;

    // endRadius = !isSpiral ? startRadius : endRadius;
    endRadius = endRadius != undefined ? endRadius : startRadius;

    let values =
      tickValues != null
        ? tickValues
        : angleScale.ticks != undefined
        ? angleScale.ticks(tickArguments[0])
        : angleScale.domain();

    let format =
      tickFormat != null
        ? tickFormat
        : angleScale.tickFormat
        ? angleScale.tickFormat.apply(angleScale, tickArguments)
        : identity;

    let spacing = Math.max(tickSizeInner, 0) + tickPadding;
    let radiusScale = angleScale.copy().range([startRadius, endRadius]);
    let angleRange = angleScale.range();
    let anglePos = identity(angleScale.copy());
    let selection = context;
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
        (Math.abs(endAngle - startAngle) >= 2 * Math.PI // Full-circle
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
          Math.abs(endAngle - startAngle) % (2 * Math.PI) > Math.PI ? 1 : 0, // Large arc flag
          endAngle > startAngle ? 1 : 0, // Sweep (clock-wise) flag
        ]
          .concat(polarToCart(endAngle, r))
          .join(",")
      );
    }

    function getSpiralPath(
      startAngle: number,
      endAngle: number,
      startR: number,
      endR: number
    ) {
      // 40 points per 360 deg
      let numPoints = ((endAngle - startAngle) / (Math.PI * 2)) * 40;

      let lineGen = d3
        .lineRadial()
        //@ts-ignore
        .angle(d3.scaleLinear().range([startAngle, endAngle]))
        //@ts-ignore
        .radius(d3.scaleLinear().range([startR, endR]))
        .curve(d3.curveNatural);

      return (
        "M" +
        polarToCart(startAngle, startR).join(",") +
        //@ts-ignore
        lineGen(d3.scaleLinear().ticks(numPoints))
      );
    }

    path.attr(
      "d",
      (isSpiral ? getSpiralPath : getArcPath)(
        angleRange[0],
        angleRange[1],
        startRadius,
        endRadius
      ) +
        getTickPath(angleRange[0], startRadius) +
        getTickPath(angleRange[1], endRadius)
    );

    tick.attr("opacity", 1).attr("transform", function (d: any) {
      return angleTransform(anglePos(d), radiusScale(d));
    });

    line
      .attr("x1", 0)
      .attr("y1", 0)
      .attr("x2", function (d: any) {
        return polarToCart(anglePos(d), tickSizeInner)[0] * (outer ? 1 : -1);
      })
      .attr("y2", function (d: any) {
        return polarToCart(anglePos(d), tickSizeInner)[1] * (outer ? 1 : -1);
      });

    text
      .attr("x", function (d: any) {
        return polarToCart(anglePos(d), spacing)[0] * (outer ? 1 : -1);
      })
      .attr("y", function (d: any) {
        return polarToCart(anglePos(d), spacing)[1] * (outer ? 1 : -1);
      })
      .text(format);

    selection
      .filter(entering)
      .attr("fill", "none")
      .attr("font-size", 10)
      .attr("font-family", "sans-serif");

    selection.each(function (this: any) {
      this.__axis = anglePos;
    });
  }

  axis.angleScale = function (_: any) {
    return arguments.length ? ((angleScale = _), axis) : angleScale;
  };

  axis.radius = function (_: any) {
    return arguments.length
      ? ((startRadius = endRadius = +_), axis)
      : startRadius;
  };

  axis.startRadius = function (radius: number) {
    return arguments.length ? ((startRadius = radius), axis) : startRadius;
  };

  axis.endRadius = function (radius: number) {
    return arguments.length ? ((endRadius = radius), axis) : endRadius;
  };

  return axis;
}

export function axisRadialInner(
  angleScale: d3.ScaleLinear<number, number>,
  startRadius: number,
  endRadius?: number
) {
  return radialAxis(angleScale, startRadius, endRadius, false);
}

export function axisRadialOuter(
  angleScale: d3.ScaleLinear<number, number>,
  startRadius: number,
  endRadius?: number
) {
  return radialAxis(angleScale, startRadius, endRadius, true);
}
