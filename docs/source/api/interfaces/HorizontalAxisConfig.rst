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

.. _HorizontalAxisConfig:

:trst-class:`HorizontalAxisConfig`
==================================

.. container:: collapsible

  .. code-block:: typescript

    interface HorizontalAxisConfig<A extends Annotation, C extends Chart>

.. container:: content

  An interface that defines the parameters for a call to the horizontalAxis rendering function.

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

  A list of Annotation objects that will be used to render the glyphs.

axisType
********

.. container:: collapsible

  .. code-block:: typescript

    axisType: undefined | Bottom | Top

.. container:: content

  This determines whether the ticks and labels with be placed on the top or the bottom of the axis.

chart
*****

.. container:: collapsible

  .. code-block:: typescript

    chart: C

.. container:: content

  The Chart object in which the glyphs will be rendered.

domain
******

.. container:: collapsible

  .. code-block:: typescript

    domain: undefined | None | GlyphCallback <A, C, None>

.. container:: content

  This defines the domain of the D3 scale used to create the axis glyph.

fillColor
*********

.. container:: collapsible

  .. code-block:: typescript

    fillColor: undefined | string | GlyphCallback <A, C, string>

.. container:: content

  A callback to define the fill color of the glyph.

fillOpacity
***********

.. container:: collapsible

  .. code-block:: typescript

    fillOpacity: undefined | number | GlyphCallback <A, C, number>

.. container:: content

  A callback to define the fill opacity of the glyph.

fixed
*****

.. container:: collapsible

  .. code-block:: typescript

    fixed: undefined | boolean

.. container:: content

  If this is set to true, the axis glyph will not translate or scale during zoom events.

height
******

.. container:: collapsible

  .. code-block:: typescript

    height: undefined | number | GlyphCallback <A, C, number>

.. container:: content

  A callback to define the pixel height of the glyph.

initializeFn
************

.. container:: collapsible

  .. code-block:: typescript

    initializeFn: undefined | (): void

.. container:: content

  A callback function that will be passed to the GlyphModifier that will manage the glyphs created with this config. If provided, this callback function will override the GlyphModifier's initialization method, which typically sets most of the style related properties from the GlyphConfig. Don't use this unless you know what you're doing.

range
*****

.. container:: collapsible

  .. code-block:: typescript

    range: undefined | None | GlyphCallback <A, C, None>

.. container:: content

  This defines the range of the D3 scale used to create the axis glyph.

scaleToBinHeight
****************

.. container:: collapsible

  .. code-block:: typescript

    scaleToBinHeight: undefined | boolean

.. container:: content

  If this is set to true, the axis glyph will be forced (by stretching) into the height of a row in the Chart.

selector
********

.. container:: collapsible

  .. code-block:: typescript

    selector: undefined | string

.. container:: content

  The string that will be used to uniquely identify the call to the glyph rendering function. In the DOM, the glyphs' elements will have this assigned as an ID. If the same selector is supplied to two distinct calls to the same glyph function, the rendering results of the first call will be cleared and replaced with the results of the second.

strokeColor
***********

.. container:: collapsible

  .. code-block:: typescript

    strokeColor: undefined | string | GlyphCallback <A, C, string>

.. container:: content

  A callback to define the color of the border around the glyph.

strokeDashArray
***************

.. container:: collapsible

  .. code-block:: typescript

    strokeDashArray: undefined | string | GlyphCallback <A, C, string>

.. container:: content

  A callback to define the stroke dash array of the glyph. See https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-dasharray

strokeDashOffset
****************

.. container:: collapsible

  .. code-block:: typescript

    strokeDashOffset: undefined | string | GlyphCallback <A, C, string>

.. container:: content

  A callback to define the offset for the stroke dash array (if supplied) of the glyph. See https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-dashoffset

strokeLineCap
*************

.. container:: collapsible

  .. code-block:: typescript

    strokeLineCap: undefined | string | GlyphCallback <A, C, string>

.. container:: content

  A callback to define the stroke linecap of the glyph. See https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-linecap

strokeLineJoin
**************

.. container:: collapsible

  .. code-block:: typescript

    strokeLineJoin: undefined | string | GlyphCallback <A, C, string>

.. container:: content

  A callback to define the offset for the stroke linejoin of the glyph. See https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-linejoin

strokeOpacity
*************

.. container:: collapsible

  .. code-block:: typescript

    strokeOpacity: undefined | number | GlyphCallback <A, C, number>

.. container:: content

  A callback to define the opacity of the border around the glyph.

strokeWidth
***********

.. container:: collapsible

  .. code-block:: typescript

    strokeWidth: undefined | number | GlyphCallback <A, C, number>

.. container:: content

  A callback to define the width of the border around the glyph.

target
******

.. container:: collapsible

  .. code-block:: typescript

    target: undefined | Selection <any, any, any, any> | Viewport | Overflow | Defs

.. container:: content

  This determines the parent DOM element in which the glyphs will be rendered. When supplying a BindTarget, the rendering function will find the appropriate parent in the supplied Chart. When supplying a D3 selection, the rendering function will explicitly use the selected element.

tickSizeOuter
*************

.. container:: collapsible

  .. code-block:: typescript

    tickSizeOuter: undefined | number | GlyphCallback <A, C, number>

.. container:: content

  This defines the tick property that will be passed to D3's axis.tickSizeOuter function. For more information, see https://github.com/d3/d3-axis#axis_tickSizeOuter

ticks
*****

.. container:: collapsible

  .. code-block:: typescript

    ticks: undefined | number | GlyphCallback <A, C, number>

.. container:: content

  This defines the tick property that will be passed to D3's axis.ticks function. For more information, see https://github.com/d3/d3-axis#axis_ticks

width
*****

.. container:: collapsible

  .. code-block:: typescript

    width: undefined | number | GlyphCallback <A, C, number>

.. container:: content

  A callback to define the pixel width of the glyph.

x
*

.. container:: collapsible

  .. code-block:: typescript

    x: undefined | number | GlyphCallback <A, C, number>

.. container:: content

  A callback to define the pixel x coordinate of the glyph.

y
*

.. container:: collapsible

  .. code-block:: typescript

    y: undefined | number | GlyphCallback <A, C, number>

.. container:: content

  A callback to define the pixel y coordinate of the glyph

zoomFn
******

.. container:: collapsible

  .. code-block:: typescript

    zoomFn: undefined | (): void

.. container:: content

  A callback function that will be passed to the GlyphModifier that will manage the glyphs created with this config. If provided, this callback function will override the GlyphModifier's zoom method, which typically sets most of the positioning related properties from the GlyphConfig. Don't use this unless you know what you're doing.
