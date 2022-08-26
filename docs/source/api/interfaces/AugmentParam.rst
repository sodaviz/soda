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

.. _AugmentParam:

:trst-class:`AugmentParam`
==========================

.. container:: collapsible

  .. code-block:: typescript

    interface AugmentParam<T extends generic, V extends generic>

.. container:: content

  An interface that describes a parameter in a call to the augment function.

  **Type parameters**

    - T: generic
    - V: generic

Properties
----------

fn
**

.. container:: collapsible

  .. code-block:: typescript

    fn: (t: T): V

.. container:: content

  The callback function used to compute the value for the property.

virtual
*******

.. container:: collapsible

  .. code-block:: typescript

    virtual: undefined | boolean

.. container:: content

  If this is set to true, the callback function will be added as a getter on the target object. If this is false or omitted, the callback function will be evaluated once and the resulting value will be added on the object as a real property.

