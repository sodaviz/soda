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

.. _mapIdToAnnotation:

:trst-function:`mapIdToAnnotation`
==================================

.. container:: collapsible

  .. code-block:: typescript

    function mapIdToAnnotation(id: string, ann: Annotation): void

.. container:: content

  This function stores a reference to an Annotation object in an internal map that is keyed by string id's. By default, the SODA rendering module will call this function to map each rendered Annotation with its id property.

  **Parameters**

  - id: string
  - ann: Annotation

  **Returns**: void