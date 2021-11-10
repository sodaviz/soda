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

.. _ColumnType:

ColumnType
==========

.. container:: collapsible

  .. code-block:: typescript

    enum ColumnType

.. container:: content

  An enum to represent the type of a column in a sequence alignment.

Members
-------

Deletion
********

.. container:: collapsible

  .. code-block:: typescript

    Deletion: = "2"

.. container:: content

  This represents a gap in a sequence alignment.

Insertion
*********

.. container:: collapsible

  .. code-block:: typescript

    Insertion: = "3"

.. container:: content

  This represents an insertion in a sequence alignment.

Match
*****

.. container:: collapsible

  .. code-block:: typescript

    Match: = "0"

.. container:: content

  This represents a match in the sequence alignment.

Substitution
************

.. container:: collapsible

  .. code-block:: typescript

    Substitution: = "1"

.. container:: content

  This represents a substitution in a sequence alignment.
