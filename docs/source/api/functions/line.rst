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

.. _line:

:trst-function:`line`
=====================

.. container:: collapsible

  .. code-block:: typescript

    function line<A extends Annotation, C extends Chart>(config: LineConfig <A, C>): d3.Selection

.. container:: content

  This renders a list of Annotation objects as lines in a Chart.

  **Type parameters**

  - A: Annotation
  - C: Chart

  **Parameters**

  - config: LineConfig <A, C>

  **Returns**: d3.Selection <SVGGElement, string, any, any>