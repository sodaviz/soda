import { Annotation, PlotAnnotation, SequenceAnnotation } from "../src";

export namespace Contrib {
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

  export function slicePlotAnnotation(
    annotation: PlotAnnotation,
    start: number,
    end: number
  ): PlotAnnotation | undefined {
    if (annotation.start < end && annotation.end > start) {
      let sliceCoords = getSliceCoordinates(annotation, start, end);
      return new PlotAnnotation({
        id: annotation.id,
        start: sliceCoords.start,
        end: sliceCoords.end,
        row: annotation.row,
        xValues: annotation.points
          .map((p) => p[0])
          .slice(sliceCoords.relativeStart, sliceCoords.relativeEnd),
        yValues: annotation.points
          .map((p) => p[1])
          .slice(sliceCoords.relativeStart, sliceCoords.relativeEnd),
      });
    } else {
      return undefined;
    }
  }
}
