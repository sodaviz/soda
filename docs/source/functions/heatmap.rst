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

.. _heatmap:

:trst-function:`heatmap`
========================

.. container:: collapsible

  .. code-block:: typescript

    function heatmap<P extends PlotAnnotation, C extends Chart>(config: HeatmapConfig <P, C>): d3.Selection

.. container:: content

  This renders PlotAnnotations as heatmaps in a Chart.

  **Type parameters**

  - P: PlotAnnotation
  - C: Chart

  **Parameters**

  - config: HeatmapConfig <P, C>

  **Returns**: d3.Selection <SVGGElement, string, any, any>