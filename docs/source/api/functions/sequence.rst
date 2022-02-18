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

.. _sequence:

:trst-function:`sequence`
=========================

.. container:: collapsible

  .. code-block:: typescript

    function sequence<S extends SequenceAnnotation, C extends Chart>(config: SequenceConfig <S, C>): d3.Selection

.. container:: content

  This renders a list of SequenceAnnotation objects as sequence glyphs in a Chart.

  **Type parameters**

  - S: SequenceAnnotation
  - C: Chart

  **Parameters**

  - config: SequenceConfig <S, C>

  **Returns**: d3.Selection <SVGGElement, string, any, any>