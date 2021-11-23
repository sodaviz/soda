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

.. _Orientation:

Orientation
===========

.. container:: collapsible

  .. code-block:: typescript

    enum Orientation

.. container:: content

  A simple enum to define strand orientation.

Members
-------

Forward
*******

.. container:: collapsible

  .. code-block:: typescript

    Forward: = "+"

.. container:: content

  Represents the forward strand.

Reverse
*******

.. container:: collapsible

  .. code-block:: typescript

    Reverse: = "-"

.. container:: content

  Represents the reverse strand.

Unknown
*******

.. container:: collapsible

  .. code-block:: typescript

    Unknown: = "?"

.. container:: content

  Represents an unknown strand where strand information would be relevant (if it were known).

Unoriented
**********

.. container:: collapsible

  .. code-block:: typescript

    Unoriented: = "."

.. container:: content

  Represents no strand.
