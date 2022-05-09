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

  The Annotations to which the interaction is applied.

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

chart
*****

.. container:: collapsible

  .. code-block:: typescript

    chart: undefined | C

.. container:: content

  The Chart to which the interaction is applied.

fontFamily
**********

.. container:: collapsible

  .. code-block:: typescript

    fontFamily: undefined | string | GlyphCallback <A, C, string>

.. container:: content

  The font family that will be used. See: https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/font-family

fontSize
********

.. container:: collapsible

  .. code-block:: typescript

    fontSize: undefined | number | GlyphCallback <A, C, number>

.. container:: content

  The font size of the text.

fontStyle
*********

.. container:: collapsible

  .. code-block:: typescript

    fontStyle: undefined | string | GlyphCallback <A, C, string>

.. container:: content

  The font style: normal, italic, or oblique. See: https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/font-style

fontWeight
**********

.. container:: collapsible

  .. code-block:: typescript

    fontWeight: undefined | string | GlyphCallback <A, C, string>

.. container:: content

  The weight of the font: normal, bold, bolder, lighter. See: https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/font-weight

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

selector
********

.. container:: collapsible

  .. code-block:: typescript

    selector: undefined | string

.. container:: content

  The selector of the glyphs to which the interaction is applied.

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

