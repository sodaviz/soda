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

.. _horizontalAxis:

:trst-function:`horizontalAxis`
===============================

.. container:: collapsible

  .. code-block:: typescript

    function horizontalAxis<A extends Annotation, C extends Chart>(config: HorizontalAxisConfig <A, C>): d3.Selection

.. container:: content

  This renders Annotations as horizontal axes in a Chart.

  **Type parameters**

  - A: Annotation
  - C: Chart

  **Parameters**

  - config: HorizontalAxisConfig <A, C>

  **Returns**: d3.Selection <SVGGElement, string, any, any>