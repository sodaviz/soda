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

.. _parseBed9Record:

:trst-function:`parseBed9Record`
================================

.. container:: collapsible

  .. code-block:: typescript

    function parseBed9Record(record: string): Bed9Annotation

.. container:: content

  A utility function to explicitly parse BED9 records. The resulting objects will only have the first nine fields of the BED format.

  **Parameters**

  - record: string

  **Returns**: Bed9Annotation