import { Annotation } from "../annotations/annotation";

/**
 * An interface that describes a parameter in a call to the augment function.
 */
export interface AugmentParam<T, V> {
  /**
   * The callback function used to compute the value for the property.
   * @param t
   */
  fn: (t: T) => V;
  /**
   * If this is set to true, the callback function will be added as a getter on the target object. If this is false
   * or omitted, the callback function will be evaluated once and the resulting value will be added on the object as
   * a real property.
   */
  virtual?: boolean;
}

/**
 * An interface that defines the parameters for a call to the augment function.
 */
export interface AugmentConfig<T> {
  /**
   * A list of type T, i.e. an arbitrary object representation of annotation records that fail to implement Annotation.
   */
  objects: T[];
  /**
   * An AugmentParam that describes how to compute the Annotation.id property.
   */
  id?: AugmentParam<T, string>;
  /**
   * An AugmentParam that describes how to compute the Annotation.start property.
   */
  start?: AugmentParam<T, number>;
  /**
   * An AugmentParam that describes how to compute the Annotation.end property.
   */
  end?: AugmentParam<T, number>;
  /**
   * If this is set to true, this skips the validation on the returned objects. That means that the function will be
   * happy to return objects that fail to implement Annotation.
   */
  skipValidate?: boolean;
}

/**
 * A utility to wrap an arrow function inside of a function so that it may be used as a getter.
 * @param f the arrow function
 * @internal
 */
function getterize<T, R>(f: (record: T) => R) {
  return function (this: T): R {
    return f(this);
  };
}

/**
 * Throws an exception if any of the objects handed to it don't seem to be a valid Annotation.
 * @param objects
 * @internal
 */
function validate(objects: any[]) {
  for (const obj of objects) {
    if (typeof obj.id !== "string") {
      console.error(obj);
      throw "augmentation validation failed on object.id";
    }
    if (typeof obj.start !== "number") {
      console.error(obj);
      throw "augmentation validation failed on object.start";
    }
    if (typeof obj.end !== "number") {
      console.error(obj);
      throw "augmentation validation failed on object.start";
    }
  }
}

/**
 *
 * This takes a list of any object T, and a set of callback functions that describe how to give it the id, start,
 * and end properties that satisfy the Annotation interface. The idea here is to allow you to get valid Annotation
 * objects without having to write a class.
 * Each property function is wrapped in an AugmentParam object has one other boolean property called
 * "virtual." If virtual is set to true, the callback function will be applied as a getter for its corresponding
 * property. If virtual is false or undefined, the callback function will be evaluated while augment() is running
 * and the value will be applied as a real property on the object.
 * Finally, the augment function checks to make sure that each Annotation property on each object has the correct
 * type, throwing an exception if there are any incorrect types. This check can be skipped by setting skipValidate
 * to true, probably improving performance measurably. You'll want to be careful if you decide to skip the
 * validation, and if you're really worried about performance you'll probably want to avoid using this function
 * altogether and write a proper class.
 *
 * @param config
 */
export function augment<T>(config: AugmentConfig<T>): (T & Annotation)[] {
  let idGetter = config.id == undefined ? undefined : getterize(config.id.fn);
  let startGetter =
    config.start == undefined ? undefined : getterize(config.start.fn);
  let endGetter =
    config.end == undefined ? undefined : getterize(config.end.fn);

  for (const obj of config.objects) {
    if (config.id != undefined) {
      if (config.id.virtual) {
        Object.defineProperty(obj, "id", { get: idGetter });
      } else {
        Object.defineProperty(obj, "id", { value: config.id.fn(obj) });
      }
    }
    if (config.start != undefined) {
      if (config.start.virtual) {
        Object.defineProperty(obj, "start", { get: startGetter });
      } else {
        Object.defineProperty(obj, "start", { value: config.start.fn(obj) });
      }
    }
    if (config.end != undefined) {
      if (config.end.virtual) {
        Object.defineProperty(obj, "end", { get: endGetter });
      } else {
        Object.defineProperty(obj, "end", { value: config.end.fn(obj) });
      }
    }
  }

  if (config.skipValidate != true) {
    validate(config.objects);
  }

  return <(T & Annotation)[]>config.objects;
}
