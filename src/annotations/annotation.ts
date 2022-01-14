import { generateId } from "../utilities/id-generation";

/**
 * An interface that defines the initialization parameters for an Annotation object. For everything to work as
 * expected, you should supply the start property and one of either end or width.
 */
export interface AnnotationConfig {
  /**
   * A unique identifier for an Annotation object.
   */
  id?: string;
  /**
   * The start position of the annotation in semantic coordinates (generally a position on a chromosome in base
   * pairs).
   */
  start?: number;
  /**
   * The end position of the annotation in semantic coordinates (generally a position on a chromosome in base
   * pairs).
   */
  end?: number;
  /**
   * The width of the annotation in semantic coordinates.
   */
  width?: number;
  /**
   * This describes which horizontal row the Annotation will be rendered in a Chart, assuming that the y-positioning
   * is not overwritten during a call to the glyph rendering API.
   */
  row?: number;
  /**
   * This flag suppresses Annotation initialization warnings. Unless you really know what you're doing, you'll
   * probably want to leave this alone.
   */
  suppressWarnings?: boolean;
}

/**
 * @internal
 */
interface AnnotationConfigWithStart extends AnnotationConfig {
  start: number;
}

/**
 * @internal
 */
interface AnnotationConfigWithEnd extends AnnotationConfig {
  end: number;
}

/**
 * @internal
 */
interface AnnotationConfigWithWidth extends AnnotationConfig {
  width: number;
}

/**
 * @internal
 * @param config
 */
function hasStart(
  config: AnnotationConfig
): config is AnnotationConfigWithStart {
  return config.start != undefined;
}

/**
 * @internal
 * @param config
 */
function hasWidth(
  config: AnnotationConfig
): config is AnnotationConfigWithWidth {
  return config.width != undefined;
}

/**
 * @internal
 * @param config
 */
function hasEnd(config: AnnotationConfig): config is AnnotationConfigWithEnd {
  return config.end != undefined;
}

/**
 * An interface that serves to easily let the Annotation class inherit the properties in AnnotationConfig via
 * declaration merging. See https://www.typescriptlang.org/docs/handbook/declaration-merging.html for more info.
 * @internal
 */
export interface Annotation extends AnnotationConfig {}

/**
 * Annotation objects are the main data structure used by SODA to store annotation data.
 */
export class Annotation {
  // these properties shouldn't need to be inline documented since Annotation extends AnnotationConfig with
  // declaration merging
  // they are, however, redefined here to narrow them out of being optional
  id: string;
  start: number;
  end: number;
  width: number;
  row: number;
  suppressWarnings: boolean = false;

  constructor(config: AnnotationConfig) {
    this.id = config.id || generateId("soda-ann");
    if (hasStart(config)) {
      this.start = config.start;
    } else {
      if (!this.suppressWarnings) {
        console.warn(
          "AnnotationConfig",
          config,
          "doesn't have start",
          this,
          "set with start: 0"
        );
      }
      this.start = 0;
    }
    this.row = config.row || 0;

    if (hasWidth(config)) {
      this.width = config.width;
      this.end = this.start + this.width;
    } else if (hasEnd(config)) {
      this.end = config.end;
      this.width = this.end - this.start;
    } else {
      if (!this.suppressWarnings) {
        console.warn(
          "AnnotationConfig",
          config,
          "doesn't have end or width",
          this,
          "set with end: 0 and width: 0"
        );
      }
      this.end = 0;
      this.width = 0;
    }
  }

  /**
   * A convenience getter that returns the start property.
   */
  get x() {
    return this.start;
  }

  /**
   * A convenience setter that sets the start property.
   */
  set x(x: number) {
    this.start = x;
  }

  /**
   * A convenience getter that returns the end property.
   */
  get x2() {
    return this.end;
  }

  /**
   * A convenience setter that sets the end property.
   */
  set x2(x: number) {
    this.end = x;
  }

  /**
   * A convenience getter that returns the width property.
   */
  get w() {
    return this.width;
  }

  /**
   * A convenience setter that sets the width property.
   */
  set w(w: number) {
    this.width = w;
  }

  /**
   * A convenience getter that returns the row property.
   */
  get y() {
    return this.row;
  }

  /**
   * A convenience setter that sets the row property.
   */
  set y(y: number) {
    this.row = y;
  }
}
