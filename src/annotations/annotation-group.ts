import { Annotation } from "./annotation";
import { generateId } from "../utilities/id-generation";

export interface AnnotationGroupConfig<A extends Annotation> {
  id?: string;
  start?: number;
  end?: number;
  group?: A[];
}

/**
 * An Annotation class that contains a group of Annotations.
 * @typeParam A The type of annotation that will live in this group.
 */
export class AnnotationGroup<A extends Annotation> implements Annotation {
  id: string;
  start: number;
  end: number;
  /**
   * The group of Annotations that live in this object.
   */
  group: A[] = [];

  constructor(config: AnnotationGroupConfig<A>) {
    this.id =
      config.id != undefined ? config.id : generateId("annotation-group");
    this.start = config.start || 0;
    this.end = config.end || 0;
    if (config.group != undefined) {
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
    }
    this.group.push(ann);
  }
}
