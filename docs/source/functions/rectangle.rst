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

.. _rectangle:

:trst-function:`rectangle`
==========================

.. container:: collapsible

  .. code-block:: typescript

    function rectangle<A extends Annotation, C extends Chart>(config: RectangleConfig <A, C>): d3.Selection

.. container:: content

  This renders a list of Annotation objects as rectangles in a Chart.

  **Type parameters**

  - A: Annotation
  - C: Chart

  **Parameters**

  - config: RectangleConfig <A, C>

  **Returns**: d3.Selection <SVGGElement, string, any, any>