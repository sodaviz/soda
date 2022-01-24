import { Annotation, ContinuousAnnotation, SequenceAnnotation } from "../src";

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

export function sliceSequenceAnnotation(
  annotation: SequenceAnnotation,
  start: number,
  end: number
): SequenceAnnotation | undefined {
  if (annotation.start < end && annotation.end > start) {
    let sliceCoords = getSliceCoordinates(annotation, start, end);
    return new SequenceAnnotation({
      id: annotation.id,
      tag: annotation.tag,
      start: sliceCoords.start,
      end: sliceCoords.end,
      row: annotation.row,
      sequence: annotation.sequence.slice(
        sliceCoords.relativeStart,
        sliceCoords.relativeEnd
      ),
    });
  } else {
    return undefined;
  }
}

export function sliceContinuousAnnotation(
  annotation: ContinuousAnnotation,
  start: number,
  end: number
): ContinuousAnnotation | undefined {
  if (annotation.start < end && annotation.end > start) {
    let sliceCoords = getSliceCoordinates(annotation, start, end);
    return new ContinuousAnnotation({
      id: annotation.id,
      tag: annotation.tag,
      start: sliceCoords.start,
      end: sliceCoords.end,
      row: annotation.row,
      values: annotation.points
        .map((p) => p[1])
        .slice(sliceCoords.relativeStart, sliceCoords.relativeEnd),
    });
  } else {
    return undefined;
  }
}
