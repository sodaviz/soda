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

.. _getAnnotationById:

:trst-function:`getAnnotationById`
==================================

.. container:: collapsible

  .. code-block:: typescript

    function getAnnotationById(id: string): Annotation

.. container:: content

  This function produces a reference to Annotation object that is mapped with the provided string id. It will throw an exception if the id is not in the internal map.

  **Parameters**

  - id: string

  **Returns**: Annotation