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

.. _linePlot:

:trst-function:`linePlot`
=========================

.. container:: collapsible

  .. code-block:: typescript

    function linePlot<A extends PlotAnnotation, C extends Chart>(config: LinePlotConfig <A, C>): d3.Selection

.. container:: content

  This renders PlotAnnotations as line plots in a Chart.

  **Type parameters**

  - A: PlotAnnotation
  - C: Chart

  **Parameters**

  - config: LinePlotConfig <A, C>

  **Returns**: d3.Selection <SVGGElement, string, any, any>