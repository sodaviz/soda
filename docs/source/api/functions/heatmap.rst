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

    function heatmap<A extends ContinuousAnnotation, C extends Chart>(config: HeatmapConfig <A, C>): d3.Selection

.. container:: content

  This renders PlotAnnotations as heatmaps in a Chart.

  **Type parameters**

  - A: ContinuousAnnotation
  - C: Chart

  **Parameters**

  - config: HeatmapConfig <A, C>

  **Returns**: d3.Selection <SVGGElement, string, any, any>