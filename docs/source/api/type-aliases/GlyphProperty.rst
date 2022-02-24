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

.. _GlyphProperty:

GlyphProperty
=============

.. container:: collapsible

  .. code-block:: typescript

    type GlyphProperty = GlyphCallback | V

.. container:: content

  A type that is simply the union of GlyphCallback<A, C, V> and the value V that it returns.

  **Type parameters**

    - A: Annotation
    - C: Chart
    - V: generic
