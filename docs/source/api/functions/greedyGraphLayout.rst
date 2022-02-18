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

.. _greedyGraphLayout:

:trst-function:`greedyGraphLayout`
==================================

.. container:: collapsible

  .. code-block:: typescript

    function greedyGraphLayout<A extends Annotation>(ann: A [], tolerance: number, vertSortFunction: (verts: string [], graph: AnnotationGraph <A>): void): number

.. container:: content

  This function takes a list of Annotation objects and uses a deterministic greedy graph coloring algorithm to assign each of them a y coordinate in terms of horizontal bins that will prevent any horizontal overlap when they are rendered in a Chart.

  **Type parameters**

  - A: Annotation

  **Parameters**

  - ann: A []
  - tolerance: number
  - vertSortFunction: (verts: string [], graph: AnnotationGraph <A>): void

  **Returns**: number