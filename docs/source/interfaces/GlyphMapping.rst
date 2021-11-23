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

.. _GlyphMapping:

:trst-class:`GlyphMapping`
==========================

.. container:: collapsible

  .. code-block:: typescript

    interface GlyphMapping

.. container:: content

  An interface that contains a D3 selection to a glyph and the Chart it's rendered in.

Properties
----------

chart
*****

.. container:: collapsible

  .. code-block:: typescript

    chart: Chart <any>

.. container:: content

  A reference to the Chart that the glyph is rendered in.

selection
*********

.. container:: collapsible

  .. code-block:: typescript

    selection: Selection <any, any, any, any>

.. container:: content

  The D3 selection to the glyph.

