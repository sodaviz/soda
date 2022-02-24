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

.. _resolveValue:

:trst-function:`resolveValue`
=============================

.. container:: collapsible

  .. code-block:: typescript

    function resolveValue<A extends Annotation, C extends Chart, V>(property: GlyphProperty <A, C, V>, d: AnnotationDatum <A, C>): V

.. container:: content

  A utility function that resolves the value from a GlyphProperty. If the property is a callback function, it will be called to retrieve the value. Otherwise, it will just return the value.

  **Type parameters**

  - A: Annotation
  - C: Chart
  - V: generic

  **Parameters**

  - property: GlyphProperty <A, C, V>
  - d: AnnotationDatum <A, C>

  **Returns**: V