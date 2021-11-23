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

.. _SequenceAnnotationConfig:

:trst-class:`SequenceAnnotationConfig`
======================================

.. container:: collapsible

  .. code-block:: typescript

    interface SequenceAnnotationConfig

.. container:: content

  An interface that defines the parameters for initializing a SequenceAnnotation.

Properties
----------

columnTypes
***********

.. container:: collapsible

  .. code-block:: typescript

    columnTypes: undefined | ColumnType []

.. container:: content

  An array of ColumnTypes, which should indicate the type of each position in the sequence. This array should be the same length as the sequence string.

end
***

.. container:: collapsible

  .. code-block:: typescript

    end: undefined | number

.. container:: content

  The end position of the annotation in semantic coordinates (generally a position on a chromosome in base pairs).

id
**

.. container:: collapsible

  .. code-block:: typescript

    id: undefined | string

.. container:: content

  A unique identifier for an Annotation object.

row
***

.. container:: collapsible

  .. code-block:: typescript

    row: undefined | number

.. container:: content

  This describes which horizontal row the Annotation will be rendered in a Chart, assuming that the y-positioning is not overwritten during a call to the glyph rendering API.

sequence
********

.. container:: collapsible

  .. code-block:: typescript

    sequence: string

.. container:: content

  The sequence string to be rendered.

start
*****

.. container:: collapsible

  .. code-block:: typescript

    start: undefined | number

.. container:: content

  The start position of the annotation in semantic coordinates (generally a position on a chromosome in base pairs).

suppressWarnings
****************

.. container:: collapsible

  .. code-block:: typescript

    suppressWarnings: undefined | boolean

.. container:: content

  This flag suppresses Annotation initialization warnings. Unless you really know what you're doing, you'll probably want to leave this alone.

width
*****

.. container:: collapsible

  .. code-block:: typescript

    width: undefined | number

.. container:: content

  The width of the annotation in semantic coordinates.

