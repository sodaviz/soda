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

.. _Bed9Annotation:

:trst-class:`Bed9Annotation`
============================

.. container:: collapsible

  .. code-block:: typescript

    class Bed9Annotation

.. container:: content

  An annotation object to represent BED annotations explicitly constrained in the BED9 format.

Constructors
------------

.. container:: collapsible

  .. code-block:: typescript

    (config: Bed9AnnotationConfig): Bed9Annotation

.. container:: content


  **Parameters**

    - config: Bed9AnnotationConfig

Properties
----------

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

  The end position of the annotation in semantic coordinates (generally a position on a chromosome in base pairs).

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

    itemRgb: string

.. container:: content

  

name
****

.. container:: collapsible

  .. code-block:: typescript

    name: string

.. container:: content

  

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

    score: number

.. container:: content

  

start
*****

.. container:: collapsible

  .. code-block:: typescript

    start: number

.. container:: content

  The start position of the annotation in semantic coordinates (generally a position on a chromosome in base pairs).

strand
******

.. container:: collapsible

  .. code-block:: typescript

    strand: Orientation

.. container:: content

  

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

    thickEnd: number

.. container:: content

  

thickStart
**********

.. container:: collapsible

  .. code-block:: typescript

    thickStart: number

.. container:: content

  

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
