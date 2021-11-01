import { Annotation, AnnotationConfig } from "./annotation";

export interface AnnotationConfigWithGroup<A extends Annotation>
  extends AnnotationConfig {
  /**
   * A list of Annotations to initially fill an AnnotationGroup with.
   */
  group: A[];
}

function hasGroup<A extends Annotation>(
  config: AnnotationConfig
): config is AnnotationConfigWithGroup<A> {
  return (<AnnotationConfigWithGroup<A>>config).group != undefined;
}

export type AnnotationGroupConfig<A extends Annotation> =
  | AnnotationConfigWithGroup<A>
  | AnnotationConfig;

/**
 * An Annotation class that contains a group of Annotations. Mostly, this is used to maintain the group of
 * Annotations at the same vertical position--all Annotations in the group will be set to the same y coordinate
 * when the setY() method is called on the AnnotationGroup.
 * @typeParam A The type of annotation that will live in this group.
 */
export class AnnotationGroup<A extends Annotation> extends Annotation {
  /**
   * The group of Annotations that live in this object.
   */
  group: A[] = [];
  suppressWarnings = true;
  constructor(config: AnnotationGroupConfig<A>) {
    super(config);
    if (hasGroup(config)) {
      for (const ann of config.group) {
        this.add(ann);
      }
    }
  }

  /**
   * Add an Annotation to the group.
   * @param ann The Annotation to be added.
   */
  public add(ann: A) {
    if (this.group == []) {
      this.start = ann.start;
      this.end = ann.end;
    } else {
      if (this.start > ann.start) {
        this.start = ann.start;
      }
      this.start = Math.min(this.start, ann.start);
      this.end = Math.max(this.end, ann.end);
      this.w = this.end - this.start;
    }
    this.group.push(ann);
  }

  get row() {
    return this._row;
  }

  set row(row: number) {
    this._row = row;
    for (const ann of this.group) {
      ann.row = row;
    }
  }

  set y(y: number) {
    this.row = y;
  }

  get y() {
    return this._row;
  }
}
