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

.. _parseGff3Record:

:trst-function:`parseGff3Record`
================================

.. container:: collapsible

  .. code-block:: typescript

    function parseGff3Record(record: string): Gff3Annotation

.. container:: content

  A utility function to parse a GFF3 record string. This should work in most cases, but probably does not exactly meet the GFF3 parsing standards. This function will be hardened and tested much more thoroughly in the future.

  **Parameters**

  - record: string

  **Returns**: Gff3Annotation