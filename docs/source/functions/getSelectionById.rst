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

.. _getSelectionById:

:trst-function:`getSelectionById`
=================================

.. container:: collapsible

  .. code-block:: typescript

    function getSelectionById(id: string): d3.Selection

.. container:: content

  This function produces a reference to the most recent D3 Selection that is mapped with the provided string id. It will throw an exception if the id is not in the internal map.

  **Parameters**

  - id: string

  **Returns**: d3.Selection <any, any, any, any>