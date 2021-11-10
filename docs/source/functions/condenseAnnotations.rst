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

.. _condenseAnnotations:

:trst-function:`condenseAnnotations`
====================================

.. container:: collapsible

  .. code-block:: typescript

    function condenseAnnotations<A extends Annotation>(ann: A [], tolerance: number): None

.. container:: content

  This is a utility function that takes the provided Annotation objects and condenses them into Annotation groups. Annotations will be placed in the same group if they are near each other (within the provided tolerance). This may be useful for saving rendering performance in dense visualizations, but it's much preferable to do something like this as a pre-processing step on your data.

  **Type parameters**

  - A: Annotation

  **Parameters**

  - ann: A []
  - tolerance: number

  **Returns**: AnnotationGroup <A> []