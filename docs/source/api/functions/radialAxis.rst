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

.. _radialAxis:

:trst-function:`radialAxis`
===========================

.. container:: collapsible

  .. code-block:: typescript

    function radialAxis<A extends Annotation, C extends RadialChart>(config: RadialAxisConfig <A, C>): d3.Selection

.. container:: content

  This renders Annotations as horizontal axes in a Chart.

  **Type parameters**

  - A: Annotation
  - C: RadialChart

  **Parameters**

  - config: RadialAxisConfig <A, C>

  **Returns**: d3.Selection <SVGGElement, string, any, any>