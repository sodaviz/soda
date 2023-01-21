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

.. _RadialAxisConfig:

:trst-class:`RadialAxisConfig`
==============================

.. container:: collapsible

  .. code-block:: typescript

    interface RadialAxisConfig<A extends Annotation, C extends RadialChart>

.. container:: content

  An interface that defines the parameters for a call to the radialAxis rendering function.

  **Type parameters**

    - A: Annotation
    - C: RadialChart

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

    axisType: undefined | Bottom | Top | GlyphCallback <A, C, Bottom | Top>

.. container:: content

  This determines whether the ticks and labels will be placed on the top or the bottom of the axis.

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

dominantBaseline
****************

.. container:: collapsible

  .. code-block:: typescript

    dominantBaseline: undefined | string | GlyphCallback <A, C, string>

.. container:: content

  How the text aligns vertically: auto, middle, hanging. https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/dominant-baseline

fillColor
*********

.. container:: collapsible

  .. code-block:: typescript

    fillColor: undefined | string | GlyphCallback <A, C, string>

.. container:: content

  This defines the fill color of the glyph.

fillOpacity
***********

.. container:: collapsible

  .. code-block:: typescript

    fillOpacity: undefined | number | GlyphCallback <A, C, number>

.. container:: content

  This defines the fill opacity of the glyph.

fixed
*****

.. container:: collapsible

  .. code-block:: typescript

    fixed: undefined | boolean

.. container:: content

  If this is set to true, the axis glyph will not translate or scale during zoom events.

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

height
******

.. container:: collapsible

  .. code-block:: typescript

    height: undefined | number | GlyphCallback <A, C, number>

.. container:: content

  This defines the pixel height of the glyph.

labelFillColor
**************

.. container:: collapsible

  .. code-block:: typescript

    labelFillColor: undefined | string | GlyphCallback <A, C, string>

.. container:: content

  This defines fill color of the tick labels on the axis.

labelFillOpacity
****************

.. container:: collapsible

  .. code-block:: typescript

    labelFillOpacity: undefined | number | GlyphCallback <A, C, number>

.. container:: content

  This defines the fill opacity of the labels on the axis.

labelStrokeColor
****************

.. container:: collapsible

  .. code-block:: typescript

    labelStrokeColor: undefined | string | GlyphCallback <A, C, string>

.. container:: content

  This defines the stroke color of the tick labels on the axis.

labelStrokeOpacity
******************

.. container:: collapsible

  .. code-block:: typescript

    labelStrokeOpacity: undefined | number | GlyphCallback <A, C, number>

.. container:: content

  This defines the stroke opacity of the labels on the axis.

labelStrokeWidth
****************

.. container:: collapsible

  .. code-block:: typescript

    labelStrokeWidth: undefined | number | GlyphCallback <A, C, number>

.. container:: content

  This defines the stroke width of the tick labels on the axis.

range
*****

.. container:: collapsible

  .. code-block:: typescript

    range: undefined | None | GlyphCallback <A, C, None>

.. container:: content

  This defines the range of the D3 scale used to create the axis glyph.

row
***

.. container:: collapsible

  .. code-block:: typescript

    row: undefined | number | GlyphCallback <A, C, number>

.. container:: content

  This defines the row that the glyph is placed in.

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

  This defines the color of the border around the glyph.

strokeDashArray
***************

.. container:: collapsible

  .. code-block:: typescript

    strokeDashArray: undefined | string | GlyphCallback <A, C, string>

.. container:: content

  This defines the stroke dash array of the glyph. See https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-dasharray

strokeDashOffset
****************

.. container:: collapsible

  .. code-block:: typescript

    strokeDashOffset: undefined | string | GlyphCallback <A, C, string>

.. container:: content

  This defines the offset for the stroke dash array (if supplied) of the glyph. See https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-dashoffset

strokeLineCap
*************

.. container:: collapsible

  .. code-block:: typescript

    strokeLineCap: undefined | string | GlyphCallback <A, C, string>

.. container:: content

  This defines the stroke linecap of the glyph. See https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-linecap

strokeLineJoin
**************

.. container:: collapsible

  .. code-block:: typescript

    strokeLineJoin: undefined | string | GlyphCallback <A, C, string>

.. container:: content

  This defines the offset for the stroke linejoin of the glyph. See https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-linejoin

strokeOpacity
*************

.. container:: collapsible

  .. code-block:: typescript

    strokeOpacity: undefined | number | GlyphCallback <A, C, number>

.. container:: content

  This defines the opacity of the border around the glyph.

strokeWidth
***********

.. container:: collapsible

  .. code-block:: typescript

    strokeWidth: undefined | number | GlyphCallback <A, C, number>

.. container:: content

  This defines the width of the border around the glyph.

target
******

.. container:: collapsible

  .. code-block:: typescript

    target: undefined | Selection <any, any, any, any> | Viewport | Overflow | Defs

.. container:: content

  This determines the parent DOM element in which the glyphs will be rendered. When supplying a BindTarget, the rendering function will find the appropriate parent in the supplied Chart. When supplying a D3 selection, the rendering function will explicitly use the selected element.

textAnchor
**********

.. container:: collapsible

  .. code-block:: typescript

    textAnchor: undefined | string | GlyphCallback <A, C, string>

.. container:: content

  How the text aligns horizontally: start, middle, or end. See: https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/text-anchor

tickFillColor
*************

.. container:: collapsible

  .. code-block:: typescript

    tickFillColor: undefined | string | GlyphCallback <A, C, string>

.. container:: content

  This defines the fill color of the tick marks on the axis

tickFillOpacity
***************

.. container:: collapsible

  .. code-block:: typescript

    tickFillOpacity: undefined | string | GlyphCallback <A, C, string>

.. container:: content

  This defines the fill opacity of the tick marks on the axis.

tickFormat
**********

.. container:: collapsible

  .. code-block:: typescript

    tickFormat: undefined | string | GlyphCallback <A, C, string>

.. container:: content

  This controls the tick count and format of the tick labels. For more information, see: https://github.com/d3/d3-axis#axis_ticks

tickPadding
***********

.. container:: collapsible

  .. code-block:: typescript

    tickPadding: undefined | number | GlyphCallback <A, C, number>

.. container:: content

  This controls the distance between the tick marks and tick labels. For more information, see: https://github.com/d3/d3-axis#axis_tickPadding

tickSizeInner
*************

.. container:: collapsible

  .. code-block:: typescript

    tickSizeInner: undefined | number | GlyphCallback <A, C, number>

.. container:: content

  This controls the size of the "inner" axis ticks. For more information, see: https://github.com/d3/d3-axis#axis_tickSizeInner

tickSizeOuter
*************

.. container:: collapsible

  .. code-block:: typescript

    tickSizeOuter: undefined | number | GlyphCallback <A, C, number>

.. container:: content

  This controls the size of the "outer" axis ticks. For more information, see: https://github.com/d3/d3-axis#axis_tickSizeOuter

tickStrokeColor
***************

.. container:: collapsible

  .. code-block:: typescript

    tickStrokeColor: undefined | string | GlyphCallback <A, C, string>

.. container:: content

  This defines the stroke color of the tick marks on the axis.

tickStrokeOpacity
*****************

.. container:: collapsible

  .. code-block:: typescript

    tickStrokeOpacity: undefined | number | GlyphCallback <A, C, number>

.. container:: content

  This defines the stroke opacity of the tick marks on the axis.

tickStrokeWidth
***************

.. container:: collapsible

  .. code-block:: typescript

    tickStrokeWidth: undefined | number | GlyphCallback <A, C, number>

.. container:: content

  This defines the stroke width of the tick marks on the axis.

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

  This defines the pixel width of the glyph.

x
*

.. container:: collapsible

  .. code-block:: typescript

    x: undefined | number | GlyphCallback <A, C, number>

.. container:: content

  This defines the pixel x coordinate of the glyph.

y
*

.. container:: collapsible

  .. code-block:: typescript

    y: undefined | number | GlyphCallback <A, C, number>

.. container:: content

  This defines the pixel y coordinate of the glyph

