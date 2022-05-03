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

.. _radialRectangle:

:trst-function:`radialRectangle`
================================

.. container:: collapsible

  .. code-block:: typescript

    function radialRectangle<A extends Annotation, C extends RadialChart>(config: RectangleConfig <A, C>): d3.Selection

.. container:: content

  This renders a list of Annotation objects as rectangles in a RadialChart.

  **Type parameters**

  - A: Annotation
  - C: RadialChart

  **Parameters**

  - config: RectangleConfig <A, C>

  **Returns**: d3.Selection <SVGGElement, string, any, any>