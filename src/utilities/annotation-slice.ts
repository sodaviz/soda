import {
  Annotation,
  AnnotationGroup,
  PlotAnnotation,
  SequenceAnnotation,
} from "../index";

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

export interface SliceConfig<A extends Annotation> {
  annotations: A[];
  start: number;
  end: number;
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

export function sliceSequenceAnnotations(
  config: SliceConfig<SequenceAnnotation>
): AnnotationGroup<SequenceAnnotation> | undefined {
  let group = [];
  for (const ann of config.annotations) {
    if (ann.start < config.end && ann.end > config.start) {
      let sliceCoords = getSliceCoordinates(ann, config.start, config.end);
      group.push({
        id: ann.id,
        start: sliceCoords.start,
        end: sliceCoords.end,
        sequence: ann.sequence.slice(
          sliceCoords.relativeStart,
          sliceCoords.relativeEnd
        ),
      });
    }
  }
  if (group.length > 0) {
    return new AnnotationGroup({ annotations: group });
  }
  return undefined;
}

export function slicePlotAnnotations(
  config: SliceConfig<PlotAnnotation>
): AnnotationGroup<PlotAnnotation> | undefined {
  let group = [];
  for (const ann of config.annotations) {
    if (ann.start < config.end && ann.end > config.start) {
      let sliceCoords = getSliceCoordinates(ann, config.start, config.end);
      group.push({
        id: ann.id,
        start: sliceCoords.start,
        end: sliceCoords.end,
        values: ann.values.slice(
          sliceCoords.relativeStart,
          sliceCoords.relativeEnd
        ),
      });
    }
  }
  if (group.length > 0) {
    return new AnnotationGroup({ annotations: group });
  }
  return undefined;
}
