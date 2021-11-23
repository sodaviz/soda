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

.. _SequenceAnnotation:

:trst-class:`SequenceAnnotation`
================================

.. container:: collapsible

  .. code-block:: typescript

    class SequenceAnnotation

.. container:: content

  An Annotation class that holds position specific sequence data. For instance, this can be used to render each character in the query of a sequence alignment at the chromosome position that it was aligned to. This is pretty expensive performance-wise.

Constructors
------------

.. container:: collapsible

  .. code-block:: typescript

    (conf: SequenceAnnotationConfig): SequenceAnnotation

.. container:: content


  **Parameters**

    - conf: SequenceAnnotationConfig

Properties
----------

characters
**********

.. container:: collapsible

  .. code-block:: typescript

    characters: None []

.. container:: content

  An array of [position, character] from the sequence.

columnTypes
***********

.. container:: collapsible

  .. code-block:: typescript

    columnTypes: ColumnType []

.. container:: content

  An array that describes the type of each position

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

row
***

.. container:: collapsible

  .. code-block:: typescript

    row: number

.. container:: content

  This describes which horizontal row the Annotation will be rendered in a Chart, assuming that the y-positioning is not overwritten during a call to the glyph rendering API.

sequence
********

.. container:: collapsible

  .. code-block:: typescript

    sequence: string

.. container:: content

  The sequence string to be rendered in the visualization.

start
*****

.. container:: collapsible

  .. code-block:: typescript

    start: number

.. container:: content

  The start position of the annotation in semantic coordinates (generally a position on a chromosome in base pairs).

suppressWarnings
****************

.. container:: collapsible

  .. code-block:: typescript

    suppressWarnings: boolean

.. container:: content

  This flag suppresses Annotation initialization warnings. Unless you really know what you're doing, you'll probably want to leave this alone.

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
