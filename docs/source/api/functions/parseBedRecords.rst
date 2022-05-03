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

.. _parseBedRecords:

:trst-function:`parseBedRecords`
================================

.. container:: collapsible

  .. code-block:: typescript

    function parseBedRecords(records: string | string []): None

.. container:: content

  A utility function to parse a general BED record. There are no guarantees about which fields end up being present in the resulting BED objects.

  **Parameters**

  - records: string | string []

  **Returns**: BedAnnotation []