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

.. _AugmentConfig:

:trst-class:`AugmentConfig`
===========================

.. container:: collapsible

  .. code-block:: typescript

    interface AugmentConfig<T extends generic>

.. container:: content

  An interface that defines the parameters for a call to the augment function.

  **Type parameters**

    - T: generic

Properties
----------

end
***

.. container:: collapsible

  .. code-block:: typescript

    end: undefined | AugmentParam <T, number>

.. container:: content

  An AugmentParam that describes how to compute the Annotation.end property.

id
**

.. container:: collapsible

  .. code-block:: typescript

    id: undefined | AugmentParam <T, string>

.. container:: content

  An AugmentParam that describes how to compute the Annotation.id property.

objects
*******

.. container:: collapsible

  .. code-block:: typescript

    objects: T []

.. container:: content

  A list of type T, i.e. an arbitrary object representation of annotation records that fail to implement Annotation.

skipValidate
************

.. container:: collapsible

  .. code-block:: typescript

    skipValidate: undefined | boolean

.. container:: content

  If this is set to true, this skips the validation on the returned objects. That means that the function will be happy to return objects that fail to implement Annotation.

start
*****

.. container:: collapsible

  .. code-block:: typescript

    start: undefined | AugmentParam <T, number>

.. container:: content

  An AugmentParam that describes how to compute the Annotation.start property.

