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

.. _Transform:

:trst-class:`Transform`
=======================

.. container:: collapsible

  .. code-block:: typescript

    interface Transform

.. container:: content

  A re-export of d3.ZoomTransform, with the x, y, and k properties overwritten as public variables. D3 strongly advises against messing with its transform objects directly, but we actually want to do that in SODA sometimes.

Properties
----------

k
*

.. container:: collapsible

  .. code-block:: typescript

    k: number

.. container:: content

  The scaling factor described by the Transform.

x
*

.. container:: collapsible

  .. code-block:: typescript

    x: number

.. container:: content

  The x translation described by the Transform.

y
*

.. container:: collapsible

  .. code-block:: typescript

    y: number

.. container:: content

  The y translation described by the Transform.

