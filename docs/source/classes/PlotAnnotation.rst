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

.. _PlotAnnotation:

:trst-class:`PlotAnnotation`
============================

.. container:: collapsible

  .. code-block:: typescript

    class PlotAnnotation

.. container:: content

  An Annotation object that can be used to represent data that should be visualized as a plot.

Constructors
------------

.. container:: collapsible

  .. code-block:: typescript

    (config: PlotAnnotationConfig): PlotAnnotation

.. container:: content


  **Parameters**

    - config: PlotAnnotationConfig

Properties
----------

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

maxValue
********

.. container:: collapsible

  .. code-block:: typescript

    maxValue: number

.. container:: content

  The maximum y value in the data points.

minValue
********

.. container:: collapsible

  .. code-block:: typescript

    minValue: number

.. container:: content

  The minimum y value in the data points.

pointWidth
**********

.. container:: collapsible

  .. code-block:: typescript

    pointWidth: number

.. container:: content

  The distance between two consecutive data points.

points
******

.. container:: collapsible

  .. code-block:: typescript

    points: None []

.. container:: content

  The individual data points for the plot.

row
***

.. container:: collapsible

  .. code-block:: typescript

    row: number

.. container:: content

  This describes which horizontal row the Annotation will be rendered in a Chart, assuming that the y-positioning is not overwritten during a call to the glyph rendering API.

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
