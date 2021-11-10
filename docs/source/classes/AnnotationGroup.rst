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

  

row
***

.. container:: collapsible

  .. code-block:: typescript

    row: number

.. container:: content

  

start
*****

.. container:: collapsible

  .. code-block:: typescript

    start: number

.. container:: content

  

suppressWarnings
****************

.. container:: collapsible

  .. code-block:: typescript

    suppressWarnings: boolean

.. container:: content

  

width
*****

.. container:: collapsible

  .. code-block:: typescript

    width: number

.. container:: content

  


Accessors
---------

w
*

.. container:: collapsible

 .. code-block:: typescript

    get w(): number

.. container:: content

  A convenience getter that returns the width property.

.. container:: collapsible

 .. code-block:: typescript

    set w(w: number): void

.. container:: content

  A convenience setter that sets the width property.

x
*

.. container:: collapsible

 .. code-block:: typescript

    get x(): number

.. container:: content

  A convenience getter that returns the start property.

.. container:: collapsible

 .. code-block:: typescript

    set x(x: number): void

.. container:: content

  A convenience setter that sets the start property.

x2
**

.. container:: collapsible

 .. code-block:: typescript

    get x2(): number

.. container:: content

  A convenience getter that returns the end property.

.. container:: collapsible

 .. code-block:: typescript

    set x2(x: number): void

.. container:: content

  A convenience setter that sets the end property.

y
*

.. container:: collapsible

 .. code-block:: typescript

    set y(y: number): void

.. container:: content

  A convenience setter that sets the row property. It also sets the row property on every member of the group property.

Methods
-------

add
***

.. container:: collapsible

 .. code-block:: typescript

    add(ann: A): void

.. container:: content

  Add an Annotation to the group.

  **Parameters**

  - ann: A

  **Returns**: void

