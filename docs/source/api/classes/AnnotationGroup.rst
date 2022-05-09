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

.. _AnnotationGroup:

:trst-class:`AnnotationGroup`
=============================

.. container:: collapsible

  .. code-block:: typescript

    class AnnotationGroup<A extends Annotation>

.. container:: content

  An Annotation class that contains a group of Annotations.

  **Type parameters**

    - A: Annotation

Constructors
------------

.. container:: collapsible

  .. code-block:: typescript

    (config: AnnotationGroupConfig <A>): AnnotationGroup

.. container:: content

  **Type parameters**

    - A: Annotation

  **Parameters**

    - config: AnnotationGroupConfig

Properties
----------

end
***

.. container:: collapsible

  .. code-block:: typescript

    end: number

.. container:: content

  The end coordinate of the Annotation.

group
*****

.. container:: collapsible

  .. code-block:: typescript

    group: A []

.. container:: content

  The group of Annotations that live in this object.

id
**

.. container:: collapsible

  .. code-block:: typescript

    id: string

.. container:: content

  A unique identifier for the Annotation.

start
*****

.. container:: collapsible

  .. code-block:: typescript

    start: number

.. container:: content

  The start coordinate of the Annotation.


Methods
-------

add
***

.. container:: collapsible

 .. code-block:: typescript

    add(ann: A | A []): void

.. container:: content

  Add an Annotation or list of Annotations to the group.

  **Parameters**

  - ann: A | A []

  **Returns**: void

addAnnotation
*************

.. container:: collapsible

 .. code-block:: typescript

    addAnnotation(ann: A): void

.. container:: content

  Add an Annotation to the group.

  **Parameters**

  - ann: A

  **Returns**: void

