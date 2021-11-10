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

.. _parseRecordsFromString:

:trst-function:`parseRecordsFromString`
=======================================

.. container:: collapsible

  .. code-block:: typescript

    function parseRecordsFromString<A extends Annotation>(parseFn: (record: string): A, recordString: string, recordSeparator: RegExp): None

.. container:: content

  A generalized utility function to parse multiple data records from a single string into multiple Annotation objects.

  **Type parameters**

  - A: Annotation

  **Parameters**

  - parseFn: (record: string): A
  - recordString: string
  - recordSeparator: RegExp

  **Returns**: A []