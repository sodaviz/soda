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

.. _queryGlyphMap:

:trst-function:`queryGlyphMap`
==============================

.. container:: collapsible

  .. code-block:: typescript

    function queryGlyphMap<C extends Chart>(config: GlyphMapQueryConfig <C>): None

.. container:: content

  This function returns the GlyphMappings for the target Annotation IDs.

  **Type parameters**

  - C: Chart

  **Parameters**

  - config: GlyphMapQueryConfig <C>

  **Returns**: GlyphMapping | GlyphMapping [] | undefined