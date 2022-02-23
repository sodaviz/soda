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

.. _HoverConfig:

:trst-class:`HoverConfig`
=========================

.. container:: collapsible

  .. code-block:: typescript

    interface HoverConfig<A extends Annotation, C extends Chart>

.. container:: content

  An interface that defines the parameters for a call to the hoverBehavior function.

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

  The Annotations to which the interaction is applied.

chart
*****

.. container:: collapsible

  .. code-block:: typescript

    chart: undefined | C

.. container:: content

  The Chart to which the interaction is applied.

mouseout
********

.. container:: collapsible

  .. code-block:: typescript

    mouseout: InteractionCallback <A, C>

.. container:: content

  A callback function that will be responsible for executing the mouseout behavior. It receives a d3 selection of the glyph and the Annotation object it represents as arguments.

mouseover
*********

.. container:: collapsible

  .. code-block:: typescript

    mouseover: InteractionCallback <A, C>

.. container:: content

  A callback function that will be responsible for executing the mouseover behavior. It receives a d3 selection of the glyph and the Annotation object it represents as arguments.

selector
********

.. container:: collapsible

  .. code-block:: typescript

    selector: undefined | string

.. container:: content

  The selector of the glyphs to which the interaction is applied.

