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

    function queryGlyphMap(config: GlyphQueryConfig): None

.. container:: content

  This function returns GlyphMappings. If all three parameters (id, selector, chart) are supplied in the config, the function will return a single D3 selection. Otherwise, the function will return a list of D3 selections.

  **Parameters**

  - config: GlyphQueryConfig

  **Returns**: d3.Selection | d3.Selection <any, any, any, any> [] | undefined