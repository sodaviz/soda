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

.. _parseBed3Record:

:trst-function:`parseBed3Record`
================================

.. container:: collapsible

  .. code-block:: typescript

    function parseBed3Record(record: string): Bed3Annotation

.. container:: content

  A utility function to explicitly parse BED3 records. The resulting objects will only have the first three fields of the BED format.

  **Parameters**

  - record: string

  **Returns**: Bed3Annotation