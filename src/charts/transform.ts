import * as d3 from "d3";
import { ZoomScale } from "d3-zoom";

/**
 * This is just a port of the D3.Transform object into TypeScript, since D3 only seems to export the interface.
 * @internal
 */
export class Transform implements d3.ZoomTransform {
  k: number;
  x: number;
  y: number;

  constructor(k: number, x: number, y: number) {
    this.k = k;
    this.x = x;
    this.y = y;
  }

  scale(k: number): Transform {
    return k === 1 ? this : new Transform(this.k * k, this.x, this.y);
  }

  translate(x: number, y: number): Transform {
    return x === 0 && y === 0
      ? this
      : new Transform(this.k, this.x + this.k * x, this.y + this.k * y);
  }

  apply(point: [number, number]): [number, number] {
    return [point[0] * this.k + this.x, point[1] * this.k + this.y];
  }

  applyX(x: number) {
    return x * this.k + this.x;
  }

  applyY(y: number) {
    return y * this.k + this.y;
  }

  invert(location: [number, number]): [number, number] {
    return [(location[0] - this.x) / this.k, (location[1] - this.y) / this.k];
  }

  invertX(x: number) {
    return (x - this.x) / this.k;
  }

  invertY(y: number) {
    return (y - this.y) / this.k;
  }

  rescaleX<S extends ZoomScale>(xScale: S): S {
    return <S>(
      xScale
        .copy()
        .domain(
          xScale.range().map(this.invertX, this).map(xScale.invert, xScale)
        )
    );
  }

  rescaleY<S extends ZoomScale>(yScale: S): S {
    return <S>(
      yScale
        .copy()
        .domain(
          yScale.range().map(this.invertY, this).map(yScale.invert, yScale)
        )
    );
  }

  toString() {
    return "translate(" + this.x + "," + this.y + ") scale(" + this.k + ")";
  }
}
