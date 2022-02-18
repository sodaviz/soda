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

.. _parseBed6Record:

:trst-function:`parseBed6Record`
================================

.. container:: collapsible

  .. code-block:: typescript

    function parseBed6Record(record: string): Bed6Annotation

.. container:: content

  A utility function to explicitly parse BED6 records. The resulting objects will only have the first six fields of the BED format.

  **Parameters**

  - record: string

  **Returns**: Bed6Annotation