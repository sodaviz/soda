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

.. _Gff3AnnotationConfig:

:trst-class:`Gff3AnnotationConfig`
==================================

.. container:: collapsible

  .. code-block:: typescript

    interface Gff3AnnotationConfig

.. container:: content

  An interface that defines the initialization parameters for a Gff3Annotation.

Properties
----------

attributes
**********

.. container:: collapsible

  .. code-block:: typescript

    attributes: undefined | Map <string, string>

.. container:: content

  A horrifying GFF3 field that is essentially an anything goes set of key value pairs describing anything anybody every wants to add to a GFF3 record.

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

phase
*****

.. container:: collapsible

  .. code-block:: typescript

    phase: undefined | None | None | None

.. container:: content

  A GFF3 field that describes the phase for CDS (coding sequence) annotations.

row
***

.. container:: collapsible

  .. code-block:: typescript

    row: undefined | number

.. container:: content

  This describes which horizontal row the Annotation will be rendered in a Chart, assuming that the y-positioning is not overwritten during a call to the glyph rendering API.

score
*****

.. container:: collapsible

  .. code-block:: typescript

    score: undefined | number

.. container:: content

  A GFF3 field that should describe the score of the annotation.

seqid
*****

.. container:: collapsible

  .. code-block:: typescript

    seqid: undefined | string

.. container:: content

  A GFF3 field: "The ID of the landmark used to establish the coordinate system for the current feature..."

source
******

.. container:: collapsible

  .. code-block:: typescript

    source: undefined | string

.. container:: content

  A GFF3 field: "The source is a free text qualifier intended to describe the algorithm or operating procedure that generated this feature..."

start
*****

.. container:: collapsible

  .. code-block:: typescript

    start: undefined | number

.. container:: content

  The start position of the annotation in semantic coordinates (generally a position on a chromosome in base pairs).

strand
******

.. container:: collapsible

  .. code-block:: typescript

    strand: undefined | Forward | Reverse | Unknown | Unoriented

.. container:: content

  A GFF3 field that describes the strand of the annotation.

suppressWarnings
****************

.. container:: collapsible

  .. code-block:: typescript

    suppressWarnings: undefined | boolean

.. container:: content

  This flag suppresses Annotation initialization warnings. Unless you really know what you're doing, you'll probably want to leave this alone.

type
****

.. container:: collapsible

  .. code-block:: typescript

    type: undefined | string

.. container:: content

  A GFF3 field that is supposed to be "constrained to be either: (a) a term from the "lite" sequence ontology, SOFA; or (b) a SOFA accession number." However, this is currently not enforced by SODA.

width
*****

.. container:: collapsible

  .. code-block:: typescript

    width: undefined | number

.. container:: content

  The width of the annotation in semantic coordinates.

