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

.. _BedRecord:

:trst-class:`BedRecord`
=======================

.. container:: collapsible

  .. code-block:: typescript

    interface BedRecord

.. container:: content

  An interface that describes BED records. For more information, see https://genome.ucsc.edu/FAQ/FAQformat.html#format1

Properties
----------

blockCount
**********

.. container:: collapsible

  .. code-block:: typescript

    blockCount: undefined | number

.. container:: content

  A BED12 field for records that should be drawn as discontiguous/fragmented glyphs. This describes the number of fragments.

blockSizes
**********

.. container:: collapsible

  .. code-block:: typescript

    blockSizes: undefined | number []

.. container:: content

  A BED12 field for records that should be drawn as discontiguous/fragmented glyphs. This describes the size of each fragment.

blockStarts
***********

.. container:: collapsible

  .. code-block:: typescript

    blockStarts: undefined | number []

.. container:: content

  A BED12 field for records that should be drawn as discontiguous/fragmented glyphs. This describes the offset of each fragment.

chrom
*****

.. container:: collapsible

  .. code-block:: typescript

    chrom: string

.. container:: content

  A BED3 field that describes the chromosome of the record.

end
***

.. container:: collapsible

  .. code-block:: typescript

    end: number

.. container:: content

  A BED3 field that describes the ending position of the record. This is chromEnd in the BED spec, but it's end here to fit in better with the rest of SODA.

itemRgb
*******

.. container:: collapsible

  .. code-block:: typescript

    itemRgb: undefined | string

.. container:: content

  A BED9 field BED field that defines the color of the feature. It is an RGB string, e.g. (0, 1, 256).

name
****

.. container:: collapsible

  .. code-block:: typescript

    name: undefined | string

.. container:: content

  A BED6 field that describes the name of the record.

score
*****

.. container:: collapsible

  .. code-block:: typescript

    score: undefined | number

.. container:: content

  A BED6 field that describes the "score" of the record.

start
*****

.. container:: collapsible

  .. code-block:: typescript

    start: number

.. container:: content

  A BED3 field that describes the starting position of the record. This is chromStart in the BED spec, but it's start here to fit in better with the rest of SODA.

strand
******

.. container:: collapsible

  .. code-block:: typescript

    strand: undefined | Forward | Reverse | Unknown | Unoriented

.. container:: content

  A BED6 field that describes the orientation/strand of the record.

thickEnd
********

.. container:: collapsible

  .. code-block:: typescript

    thickEnd: undefined | number

.. container:: content

  A BED9 field that describes at which coordinate the feature should stop being drawn "thickly."

thickStart
**********

.. container:: collapsible

  .. code-block:: typescript

    thickStart: undefined | number

.. container:: content

  A BED9 field that describes at which coordinate the feature should start being drawn "thickly."

