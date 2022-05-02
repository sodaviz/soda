import { Annotation, PlotAnnotation, SequenceAnnotation } from "../index";

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
  let annotationWidth = annotation.end - annotation.start;
  return {
    start: Math.max(annotation.start, start),
    end: Math.min(annotation.end, end),
    relativeStart: Math.max(0, leftDelta),
    relativeEnd: Math.min(annotationWidth, annotationWidth - rightDelta),
  };
}

export function sliceSequenceAnnotation(
  annotation: SequenceAnnotation,
  start: number,
  end: number
): SequenceAnnotation | undefined {
  if (annotation.start < end && annotation.end > start) {
    let sliceCoords = getSliceCoordinates(annotation, start, end);
    return {
      id: annotation.id,
      start: sliceCoords.start,
      end: sliceCoords.end,
      sequence: annotation.sequence.slice(
        sliceCoords.relativeStart,
        sliceCoords.relativeEnd
      ),
    };
  } else {
    return undefined;
  }
}

export function slicePlotAnnotation(
  annotation: PlotAnnotation,
  start: number,
  end: number
): PlotAnnotation | undefined {
  if (annotation.start < end && annotation.end > start) {
    let sliceCoords = getSliceCoordinates(annotation, start, end);
    return {
      id: annotation.id,
      start: sliceCoords.start,
      end: sliceCoords.end,
      values: annotation.values.slice(
        sliceCoords.relativeStart,
        sliceCoords.relativeEnd
      ),
    };
  } else {
    return undefined;
  }
}
