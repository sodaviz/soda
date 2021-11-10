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

.. _getSelectionListById:

:trst-function:`getSelectionListById`
=====================================

.. container:: collapsible

  .. code-block:: typescript

    function getSelectionListById(id: string): None

.. container:: content

  This function produces a list of references to every D3 Selection that has been mapped with the provided string id. It will throw an exception if the id is not in the internal map.

  **Parameters**

  - id: string

  **Returns**: d3.Selection <any, any, any, any> []