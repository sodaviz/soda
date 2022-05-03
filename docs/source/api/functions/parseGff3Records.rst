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

.. _parseGff3Records:

:trst-function:`parseGff3Records`
=================================

.. container:: collapsible

  .. code-block:: typescript

    function parseGff3Records(records: string | string []): None

.. container:: content

  A utility function to parse a GFF3 records. This function accepts either a string of newline delimited GFF3 records, or an array of individual record strings.

  **Parameters**

  - records: string | string []

  **Returns**: Gff3Annotation []