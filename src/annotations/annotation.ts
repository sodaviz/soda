import { generateId } from "../utilities/id-generation";

/**
 * A base interface that defines every property available in an AnnotationConfig. This interface is extended and
 * narrowed into valid configs by other interfaces.
 */
export interface AnnotationConfig {
  /**
   * A unique identifier for an Annotation object. Currently, it is up to users to make sure that this field is
   * uniquely assigned. SODA may not behave as intended if two distinct Annotations have the same id.
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
   * The y position of the annotation. This rarely has semantic meaning, and is probably used to prevent
   * horizontal overlap or preserve clarity in the visualization.
   */
  row?: number;
  /**
   * This flag suppresses Annotation initialization warnings. Unless you really know what you're doing, you'll
   * probably want to leave this alone.
   */
  suppressWarnings?: boolean;
}

export interface AnnotationConfigWithStart extends AnnotationConfig {
  /**
   * The start position of the annotation in semantic coordinates (generally a position on a chromosome in base
   * pairs).
   */
  start: number;
}

export interface AnnotationConfigWithEnd extends AnnotationConfig {
  /**
   * The end position of the annotation in semantic coordinates (generally a position on a chromosome in base
   * pairs).
   */
  end: number;
}

export interface AnnotationConfigWithWidth extends AnnotationConfig {
  /**
   * The width of the annotation in semantic coordinates.
   */
  width: number;
}

function hasStart(
  config: AnnotationConfig
): config is AnnotationConfigWithStart {
  return config.start != undefined;
}

function hasWidth(
  config: AnnotationConfig
): config is AnnotationConfigWithWidth {
  return config.width != undefined;
}

function hasEnd(config: AnnotationConfig): config is AnnotationConfigWithEnd {
  return config.end != undefined;
}

/**
 * :trst-class:`Annotation` objects are the main data structure used by SODA to store information about alignments. In
 * many cases, this should be sufficient to store the information to represent a single glyph in a visualization. If
 * more information is needed, the Annotation class should be extended.
 */
export class Annotation {
  /**
   * A unique identifier for an Annotation object. Currently, it is up to users to make sure that this field is
   * uniquely assigned. SODA may not behave as intended if two distinct Annotations have the same id.
   */
  id: string;
  /**
   * The start position of the annotation in semantic coordinates (generally a position on a chromosome in base
   * pairs).
   */
  _start: number;
  /**
   * The end position of the annotation in semantic coordinates (generally a position on a chromosome in base
   * pairs).
   */
  _end: number;
  /**
   * The width of the annotation in semantic coordinates.
   */
  _width: number;
  /**
   * The y position of the annotation. This rarely has semantic meaning, and is probably used to prevent
   * horizontal overlap or preserve clarity in the visualization.
   */
  _row: number;
  /**
   * This flag determines whether or not warnings about coordinate properties will be printed to the console.
   */
  suppressWarnings: boolean = false;

  constructor(config: AnnotationConfig) {
    this.id = config.id || generateId("soda-ann");
    if (hasStart(config)) {
      this._start = config.start;
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
      this._start = 0;
    }
    this._row = config.row || 0;

    if (hasWidth(config)) {
      this._width = config.width;
      this._end = this._start + this._width;
    } else if (hasEnd(config)) {
      this._end = config.end;
      this._width = this._end - this._start;
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
      this._end = 0;
      this._width = 0;
    }
  }

  get start() {
    return this._start;
  }

  set start(start: number) {
    this._start = start;
  }

  get end() {
    return this._end;
  }

  set end(end: number) {
    this._end = end;
  }

  get width() {
    return this._width;
  }

  set width(width: number) {
    this._width = width;
  }

  get row() {
    return this._row;
  }

  set row(row: number) {
    this._row = row;
  }

  get x() {
    return this._start;
  }

  set x(x: number) {
    this._start = x;
  }

  get x2() {
    return this._end;
  }

  set x2(x: number) {
    this._end = x;
  }

  get w() {
    return this._width;
  }

  set w(w: number) {
    this._width = w;
  }

  get y() {
    return this._row;
  }

  set y(y: number) {
    this._row = y;
  }
}
