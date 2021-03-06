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

.. _MapVerticalLayout:

:trst-class:`MapVerticalLayout`
===============================

.. container:: collapsible

  .. code-block:: typescript

    interface MapVerticalLayout

.. container:: content

  An extension of VerticalLayout that additionally has a Map. This object is returned by SODA's default layout functions, and the Map is used to build the row() callback.

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

rowMap
******

.. container:: collapsible

  .. code-block:: typescript

    rowMap: Map <string, number>

.. container:: content

  

