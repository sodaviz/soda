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

.. _AggregationConfig:

:trst-class:`AggregationConfig`
===============================

.. container:: collapsible

  .. code-block:: typescript

    interface AggregationConfig<A extends Annotation>

.. container:: content

  This defines the parameters for a call to an Annotation aggregration function.

  **Type parameters**

    - A: Annotation

Properties
----------

annotations
***********

.. container:: collapsible

  .. code-block:: typescript

    annotations: A []

.. container:: content

  The list of Annotations to be aggregated.

criterion
*********

.. container:: collapsible

  .. code-block:: typescript

    criterion: (a: A, b: A): boolean

.. container:: content

  The comparison function that serves as the criterion for aggregation.

idPrefix
********

.. container:: collapsible

  .. code-block:: typescript

    idPrefix: undefined | string

.. container:: content

  The ID prefix for each resulting AnnotationGroup. E.g. if the idPrefix "group" is supplied, the resulting groups will have IDs of the form: "group-1," "group-2," etc.

