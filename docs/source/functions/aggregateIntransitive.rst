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

.. _aggregateIntransitive:

:trst-function:`aggregateIntransitive`
======================================

.. container:: collapsible

  .. code-block:: typescript

    function aggregateIntransitive<A extends Annotation>(config: AggregationConfig <A>): None

.. container:: content

  A utility function that aggregates Annotation objects into Annotation groups based off of the supplied criterion. This function assumes that your aggregation criterion is not transitive, i.e. if criterion(a, b)  and criterion(b, c) evaluate to true, then criterion(a, c) doesn't necessarily evaluate to true.

  **Type parameters**

  - A: Annotation

  **Parameters**

  - config: AggregationConfig <A>

  **Returns**: AnnotationGroup <A> []