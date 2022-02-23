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

.. _text:

:trst-function:`text`
=====================

.. container:: collapsible

  .. code-block:: typescript

    function text<A extends Annotation, C extends Chart>(config: TextConfig <A, C>): d3.Selection

.. container:: content

  This renders a list of Annotation objects as text in a Chart.

  **Type parameters**

  - A: Annotation
  - C: Chart

  **Parameters**

  - config: TextConfig <A, C>

  **Returns**: d3.Selection <SVGGElement, string, any, any>