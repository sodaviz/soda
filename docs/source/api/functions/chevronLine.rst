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

.. _chevronLine:

:trst-function:`chevronLine`
============================

.. container:: collapsible

  .. code-block:: typescript

    function chevronLine<A extends Annotation, C extends Chart>(config: ChevronLineConfig <A, C>): d3.Selection

.. container:: content

  This renders Annotations as lines with chevron arrows in a Chart.

  **Type parameters**

  - A: Annotation
  - C: Chart

  **Parameters**

  - config: ChevronLineConfig <A, C>

  **Returns**: d3.Selection <SVGGElement, string, any, any>