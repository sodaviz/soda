import { Annotation } from "./annotation";

/**
 * @internal
 */
export interface SliceCoordinates {
  /**
   * The absolute (e.g. chromosome) start coordinate of the sliced annotation.
   */
  start: number;
  /**
   * The absolute (e.g. chromosome) end coordinate of the sliced annotation.
   */
  end: number;
  /**
   * The position at which the sliced annotation starts relative to the original start.
   */
  relativeStart: number;
  /**
   * The position at which the sliced annotation ends relative to the original start.
   */
  relativeEnd: number;
}

/**
 * @internal
 * @param annotation
 * @param start
 * @param end
 */
export function getSliceCoordinates(
  annotation: Annotation,
  start: number,
  end: number
) {
  let leftDelta = start - annotation.start;
  let rightDelta = annotation.end - end;
  return {
    start: Math.max(annotation.start, start),
    end: Math.min(annotation.end, end),
    relativeStart: Math.max(0, leftDelta),
    relativeEnd: Math.min(annotation.width, annotation.width - rightDelta),
  };
}
