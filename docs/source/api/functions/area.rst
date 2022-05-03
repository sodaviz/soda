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

.. _area:

:trst-function:`area`
=====================

.. container:: collapsible

  .. code-block:: typescript

    function area<A extends PlotAnnotation, C extends Chart>(config: AreaConfig <A, C>): d3.Selection

.. container:: content

  This renders PlotAnnotations as area glyphs in a Chart.

  **Type parameters**

  - A: PlotAnnotation
  - C: Chart

  **Parameters**

  - config: AreaConfig <A, C>

  **Returns**: d3.Selection <SVGGElement, string, any, any>