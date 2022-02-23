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

.. _AnnotationDatum:

:trst-class:`AnnotationDatum`
=============================

.. container:: collapsible

  .. code-block:: typescript

    interface AnnotationDatum<A extends Annotation, C extends Chart>

.. container:: content

  An interface that simply joins an Annotation object and a Chart is has been rendered in.

  **Type parameters**

    - A: Annotation
    - C: Chart

Properties
----------

a
*

.. container:: collapsible

  .. code-block:: typescript

    a: A

.. container:: content

  The Annotation object.

c
*

.. container:: collapsible

  .. code-block:: typescript

    c: C

.. container:: content

  The Chart object.

