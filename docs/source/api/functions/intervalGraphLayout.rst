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

.. _intervalGraphLayout:

:trst-function:`intervalGraphLayout`
====================================

.. container:: collapsible

  .. code-block:: typescript

    function intervalGraphLayout(ann: Annotation [], tolerance: number): number

.. container:: content

  This function takes a list of Annotation objects and uses a greedy interval scheduling algorithm to assign each of them a y coordinate in terms of horizontal bins that will prevent any horizontal overlap when they are rendered in a Chart.

  **Parameters**

  - ann: Annotation []
  - tolerance: number

  **Returns**: number