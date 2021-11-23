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

.. _arc:

:trst-function:`arc`
====================

.. container:: collapsible

  .. code-block:: typescript

    function arc<A extends Annotation, C extends Chart>(config: ArcConfig <A, C>): d3.Selection

.. container:: content

  This renders a list of Annotation objects as arcs in a Chart.

  **Type parameters**

  - A: Annotation
  - C: Chart

  **Parameters**

  - config: ArcConfig <A, C>

  **Returns**: d3.Selection <SVGGElement, string, any, any>