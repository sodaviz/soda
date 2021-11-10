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

.. _TooltipConfig:

:trst-class:`TooltipConfig`
===========================

.. container:: collapsible

  .. code-block:: typescript

    interface TooltipConfig<A extends Annotation, C extends Chart>

.. container:: content

  An interface that defines the parameters for a call to the tooltip function.

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

  The list of Annotations that will get the tooltip

backgroundColor
***************

.. container:: collapsible

  .. code-block:: typescript

    backgroundColor: undefined | string | GlyphCallback <A, C, string>

.. container:: content

  This defines the background color of the tooltip.

borderRadius
************

.. container:: collapsible

  .. code-block:: typescript

    borderRadius: undefined | number | GlyphCallback <A, C, number>

.. container:: content

  This defines the border radius of the tooltip.

opacity
*******

.. container:: collapsible

  .. code-block:: typescript

    opacity: undefined | number | GlyphCallback <A, C, number>

.. container:: content

  This defines the opacity of the tooltip.

padding
*******

.. container:: collapsible

  .. code-block:: typescript

    padding: undefined | number | GlyphCallback <A, C, number>

.. container:: content

  This defines the CSS padding of the tooltip.

text
****

.. container:: collapsible

  .. code-block:: typescript

    text: GlyphProperty <A, C, string>

.. container:: content

  This defines the text for the tooltip.

textColor
*********

.. container:: collapsible

  .. code-block:: typescript

    textColor: undefined | string | GlyphCallback <A, C, string>

.. container:: content

  This defines the tooltip text color.

