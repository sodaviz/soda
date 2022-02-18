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

.. _generateId:

:trst-function:`generateId`
===========================

.. container:: collapsible

  .. code-block:: typescript

    function generateId(prefix: string): string

.. container:: content

  Get an auto-generated string identifier of the form "<prefix>-<count>," where prefix defaults to "soda-id" and count is incremented for every call to this function. A unique count is maintained for each prefix.

  **Parameters**

  - prefix: string

  **Returns**: string