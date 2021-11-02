/**
 * A simple enum to define strand orientation.
 */
export enum Orientation {
  /**
   * Represents the forward strand.
   */
  Forward = "+",
  /**
   * Represents the reverse strand.
   */
  Reverse = "-",
  /**
   * Represents an unknown strand where strand information would be relevant (if it were known).
   */
  Unknown = "?",
  /**
   * Represents no strand.
   */
  Unoriented = ".",
}
