.. role:: trst-class
.. role:: trst-interface
.. role:: trst-function
.. role:: trst-property
.. role:: trst-property-desc
.. role:: trst-method
.. role:: trst-method-desc
.. role:: trst-parameter
.. role:: trst-type
.. role:: trst-type-parameter

.. _BedAnnotation:

:trst-class:`BedAnnotation`
===========================

.. container:: collapsible

  .. code-block:: typescript

    class BedAnnotation

.. container:: content

  An Annotation definition for any BED records. Any fields up through BED12 are supported by this class, but nothing beyond the BED3 fields are guaranteed to be defined. For more information on BED records, see https://genome.ucsc.edu/FAQ/FAQformat.html#format1.

Constructors
------------

.. container:: collapsible

  .. code-block:: typescript

    (config: BedAnnotationConfig): BedAnnotation

.. container:: content


  **Parameters**

    - config: BedAnnotationConfig

Properties
----------

blockCount
**********

.. container:: collapsible

  .. code-block:: typescript

    blockCount: undefined | number

.. container:: content

  A BED12 field for records that should be drawn as discontiguous/fragmented glyphs. This describes the number of fragments.

blockSizes
**********

.. container:: collapsible

  .. code-block:: typescript

    blockSizes: undefined | number []

.. container:: content

  A BED12 field for records that should be drawn as discontiguous/fragmented glyphs. This describes the size of each fragment.

blockStarts
***********

.. container:: collapsible

  .. code-block:: typescript

    blockStarts: undefined | number []

.. container:: content

  A BED12 field for records that should be drawn as discontiguous/fragmented glyphs. This describes the offset of each fragment.

chrom
*****

.. container:: collapsible

  .. code-block:: typescript

    chrom: string

.. container:: content

  A BED3 field that describes the chromosome of the record.

end
***

.. container:: collapsible

  .. code-block:: typescript

    end: number

.. container:: content

  A BED3 field that describes the ending position of the record. This is chromEnd in the BED spec, but it's end here to fit in better with the rest of SODA.

id
**

.. container:: collapsible

  .. code-block:: typescript

    id: string

.. container:: content

  A unique identifier for an Annotation object.

itemRgb
*******

.. container:: collapsible

  .. code-block:: typescript

    itemRgb: undefined | string

.. container:: content

  A BED9 field BED field that defines the color of the feature. It is an RGB string, e.g. (0, 1, 256).

name
****

.. container:: collapsible

  .. code-block:: typescript

    name: undefined | string

.. container:: content

  A BED6 field that describes the name of the record.

row
***

.. container:: collapsible

  .. code-block:: typescript

    row: number

.. container:: content

  This describes which horizontal row the Annotation will be rendered in a Chart, assuming that the y-positioning is not overwritten during a call to the glyph rendering API.

score
*****

.. container:: collapsible

  .. code-block:: typescript

    score: undefined | number

.. container:: content

  A BED6 field that describes the "score" of the record.

start
*****

.. container:: collapsible

  .. code-block:: typescript

    start: number

.. container:: content

  A BED3 field that describes the starting position of the record. This is chromStart in the BED spec, but it's start here to fit in better with the rest of SODA.

strand
******

.. container:: collapsible

  .. code-block:: typescript

    strand: undefined | Forward | Reverse | Unknown | Unoriented

.. container:: content

  A BED6 field that describes the orientation/strand of the record.

suppressWarnings
****************

.. container:: collapsible

  .. code-block:: typescript

    suppressWarnings: boolean

.. container:: content

  This flag suppresses Annotation initialization warnings. Unless you really know what you're doing, you'll probably want to leave this alone.

thickEnd
********

.. container:: collapsible

  .. code-block:: typescript

    thickEnd: undefined | number

.. container:: content

  A BED9 field that describes at which coordinate the feature should stop being drawn "thickly."

thickStart
**********

.. container:: collapsible

  .. code-block:: typescript

    thickStart: undefined | number

.. container:: content

  A BED9 field that describes at which coordinate the feature should start being drawn "thickly."

width
*****

.. container:: collapsible

  .. code-block:: typescript

    width: number

.. container:: content

  The width of the annotation in semantic coordinates.


Accessors
---------

w
*

.. container:: collapsible

 .. code-block:: typescript

    get w(): number

.. container:: content

  A convenience getter that returns the width property.

.. container:: collapsible

 .. code-block:: typescript

    set w(w: number): void

.. container:: content

  A convenience setter that sets the width property.

x
*

.. container:: collapsible

 .. code-block:: typescript

    get x(): number

.. container:: content

  A convenience getter that returns the start property.

.. container:: collapsible

 .. code-block:: typescript

    set x(x: number): void

.. container:: content

  A convenience setter that sets the start property.

x2
**

.. container:: collapsible

 .. code-block:: typescript

    get x2(): number

.. container:: content

  A convenience getter that returns the end property.

.. container:: collapsible

 .. code-block:: typescript

    set x2(x: number): void

.. container:: content

  A convenience setter that sets the end property.

y
*

.. container:: collapsible

 .. code-block:: typescript

    get y(): number

.. container:: content

  A convenience getter that returns the row property.

.. container:: collapsible

 .. code-block:: typescript

    set y(y: number): void

.. container:: content

  A convenience setter that sets the row property.
