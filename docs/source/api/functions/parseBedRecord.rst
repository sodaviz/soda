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

.. _parseBedRecord:

:trst-function:`parseBedRecord`
===============================

.. container:: collapsible

  .. code-block:: typescript

    function parseBedRecord(record: string): BedAnnotation

.. container:: content

  A utility function to parse a general BED record. There are no guarantees about which fields end up being present in the resulting BED objects.

  **Parameters**

  - record: string

  **Returns**: BedAnnotation