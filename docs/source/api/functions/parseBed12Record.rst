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

.. _parseBed12Record:

:trst-function:`parseBed12Record`
=================================

.. container:: collapsible

  .. code-block:: typescript

    function parseBed12Record(record: string): Bed12Annotation

.. container:: content

  A utility function to explicitly parse BED12 records. The resulting objects will have all twelve fields of the BED format.

  **Parameters**

  - record: string

  **Returns**: Bed12Annotation