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

.. _barPlot:

:trst-function:`barPlot`
========================

.. container:: collapsible

  .. code-block:: typescript

    function barPlot<P extends PlotAnnotation, C extends Chart>(config: BarPlotConfig <P, C>): d3.Selection

.. container:: content

  This renders PlotAnnotations as bar plots in a Chart.

  **Type parameters**

  - P: PlotAnnotation
  - C: Chart

  **Parameters**

  - config: BarPlotConfig <P, C>

  **Returns**: d3.Selection <SVGGElement, string, any, any>