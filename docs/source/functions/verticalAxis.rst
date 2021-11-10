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

.. _verticalAxis:

:trst-function:`verticalAxis`
=============================

.. container:: collapsible

  .. code-block:: typescript

    function verticalAxis<A extends Annotation, C extends Chart>(config: VerticalAxisConfig <A, C>): d3.Selection

.. container:: content

  This renders Annotations as vertical axes in a chart. This is intended to be used in conjunction with one of the plotting glyph modules. The vertical axes can be fixed in place, but they are configured to move during zoom events by default.

  **Type parameters**

  - A: Annotation
  - C: Chart

  **Parameters**

  - config: VerticalAxisConfig <A, C>

  **Returns**: d3.Selection <SVGGElement, string, any, any>