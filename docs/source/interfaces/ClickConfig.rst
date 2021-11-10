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

.. _ClickConfig:

:trst-class:`ClickConfig`
=========================

.. container:: collapsible

  .. code-block:: typescript

    interface ClickConfig<A extends Annotation, C extends Chart>

.. container:: content

  An interface that defines the parameters for a call to the clickBehavior function.

  **Type parameters**

    - A: Annotation
    - C: Chart

Properties
----------

annotations
***********

.. container:: collapsible

  .. code-block:: typescript

    annotations: A []

.. container:: content

  The annotations that are going to get the click behavior.

click
*****

.. container:: collapsible

  .. code-block:: typescript

    click: InteractionCallback <A, C>

.. container:: content

  A callback function that will be responsible for executing the click behavior. It will implicitly receive references to both a D3 Selection to the Annotation's representative glyph and the Annotation object itself.

