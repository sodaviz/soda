import { Annotation, AnnotationConfig } from "./annotation";

/**
 * An interface that extends AnnotationConfig for initializing AnnotationGroups.
 */
export interface AnnotationConfigWithGroup<A extends Annotation>
  extends AnnotationConfig {
  /**
   * A list of Annotations to initially fill an AnnotationGroup with.
   */
  group: A[];
}

/**
 * @internal
 * @param config
 */
function hasGroup<A extends Annotation>(
  config: AnnotationConfig
): config is AnnotationConfigWithGroup<A> {
  return (<AnnotationConfigWithGroup<A>>config).group != undefined;
}

/**
 * A type that is simply the union of AnnotationConfig and AnnotationConfigWithGroup.
 */
export type AnnotationGroupConfig<A extends Annotation> =
  | AnnotationConfigWithGroup<A>
  | AnnotationConfig;

/**
 * An Annotation class that contains a group of Annotations.
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
   * Add an Annotation or list of Annotations to the group.
   */
  public add(ann: A | A[]): void {
    if (Array.isArray(ann)) {
      for (const a of ann) {
        this.addAnnotation(a);
      }
    } else {
      this.addAnnotation(ann);
    }
  }

  /**
   * Add an Annotation to the group.
   * @param ann
   * @protected
   */
  protected addAnnotation(ann: A) {
    if (this.group.length == 0) {
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

  /**
   * A convenience setter that sets the row property. It also sets the row property on every member of the group
   * property.
   * @param y
   */
  set y(y: number) {
    this.row = y;
    for (const ann of this.group) {
      ann.row = y;
    }
  }

  /**
   * A convenience getter that returns the row property.
   */
  get y(): number {
    return this.row;
  }
}
