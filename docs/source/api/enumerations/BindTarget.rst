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

.. _BindTarget:

BindTarget
==========

.. container:: collapsible

  .. code-block:: typescript

    enum BindTarget

.. container:: content

  An enumeration of the targets in a Chart that an Annotation can be bound to.

Members
-------

Defs
****

.. container:: collapsible

  .. code-block:: typescript

    Defs: = "defs"

.. container:: content

  The defs section, where things like patterns are supposed to go.

Overflow
********

.. container:: collapsible

  .. code-block:: typescript

    Overflow: = "overflow"

.. container:: content

  The secondary viewport of a Chart in which a glyph is allowed to render outside the explicit bounds.

Viewport
********

.. container:: collapsible

  .. code-block:: typescript

    Viewport: = "viewport"

.. container:: content

  The default viewport of a Chart.
