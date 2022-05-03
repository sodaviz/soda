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

.. _Gff3Annotation:

:trst-class:`Gff3Annotation`
============================

.. container:: collapsible

  .. code-block:: typescript

    interface Gff3Annotation

.. container:: content

  An interface that describes the fields in a GFF3 record. For more information see http://gmod.org/wiki/GFF3/

Properties
----------

attributes
**********

.. container:: collapsible

  .. code-block:: typescript

    attributes: undefined | Map <string, string>

.. container:: content

  A GFF3 field that is essentially an anything goes set of key value pairs describing anything anybody every wants to add to a GFF3 record.

end
***

.. container:: collapsible

  .. code-block:: typescript

    end: number

.. container:: content

  

id
**

.. container:: collapsible

  .. code-block:: typescript

    id: string

.. container:: content

  

phase
*****

.. container:: collapsible

  .. code-block:: typescript

    phase: undefined | None | None | None

.. container:: content

  A GFF3 field that describes the phase for CDS (coding sequence) annotations.

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

    start: number

.. container:: content

  

strand
******

.. container:: collapsible

  .. code-block:: typescript

    strand: undefined | Forward | Reverse | Unknown | Unoriented

.. container:: content

  A GFF3 field that describes the strand of the annotation.

type
****

.. container:: collapsible

  .. code-block:: typescript

    type: undefined | string

.. container:: content

  A GFF3 field that is supposed to be "constrained to be either: (a) a term from the "lite" sequence ontology, SOFA; or (b) a SOFA accession number." However, this is currently not enforced by SODA.

