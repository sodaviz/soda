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

.. _VerticalLayout:

:trst-class:`VerticalLayout`
============================

.. container:: collapsible

  .. code-block:: typescript

    interface VerticalLayout

.. container:: content

  An interface that defines the object that Charts use to store the vertical layout of glyphs.

Properties
----------

row
***

.. container:: collapsible

  .. code-block:: typescript

    row: GlyphCallback <Annotation, Chart <any>, number>

.. container:: content

  This callback is used by default to place a glyph in a Chart's row.

rowCount
********

.. container:: collapsible

  .. code-block:: typescript

    rowCount: number

.. container:: content

  This value is used by default to set the height of a Chart to display the required number of rows.

