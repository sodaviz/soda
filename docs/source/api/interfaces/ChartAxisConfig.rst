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

.. _ChartAxisConfig:

:trst-class:`ChartAxisConfig`
=============================

.. container:: collapsible

  .. code-block:: typescript

    interface ChartAxisConfig

.. container:: content

  This interface defines the parameters to style a default axis on a Chart.

Properties
----------

axisType
********

.. container:: collapsible

  .. code-block:: typescript

    axisType: undefined | Bottom | Top

.. container:: content

  

dominantBaseline
****************

.. container:: collapsible

  .. code-block:: typescript

    dominantBaseline: undefined | string

.. container:: content

  How the text aligns vertically: auto, middle, hanging. https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/dominant-baseline

fillColor
*********

.. container:: collapsible

  .. code-block:: typescript

    fillColor: undefined | string

.. container:: content

  This defines the fill color of the glyph.

fillOpacity
***********

.. container:: collapsible

  .. code-block:: typescript

    fillOpacity: undefined | number

.. container:: content

  This defines the fill opacity of the glyph.

fontFamily
**********

.. container:: collapsible

  .. code-block:: typescript

    fontFamily: undefined | string

.. container:: content

  The font family that will be used. See: https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/font-family

fontSize
********

.. container:: collapsible

  .. code-block:: typescript

    fontSize: undefined | number

.. container:: content

  The font size of the text.

fontStyle
*********

.. container:: collapsible

  .. code-block:: typescript

    fontStyle: undefined | string

.. container:: content

  The font style: normal, italic, or oblique. See: https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/font-style

fontWeight
**********

.. container:: collapsible

  .. code-block:: typescript

    fontWeight: undefined | string

.. container:: content

  The weight of the font: normal, bold, bolder, lighter. See: https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/font-weight

labelFillColor
**************

.. container:: collapsible

  .. code-block:: typescript

    labelFillColor: undefined | string

.. container:: content

  This defines fill color of the tick labels on the axis.

labelFillOpacity
****************

.. container:: collapsible

  .. code-block:: typescript

    labelFillOpacity: undefined | number

.. container:: content

  This defines the fill opacity of the labels on the axis.

labelStrokeColor
****************

.. container:: collapsible

  .. code-block:: typescript

    labelStrokeColor: undefined | string

.. container:: content

  This defines the stroke color of the tick labels on the axis.

labelStrokeOpacity
******************

.. container:: collapsible

  .. code-block:: typescript

    labelStrokeOpacity: undefined | number

.. container:: content

  This defines the stroke opacity of the labels on the axis.

labelStrokeWidth
****************

.. container:: collapsible

  .. code-block:: typescript

    labelStrokeWidth: undefined | number

.. container:: content

  This defines the stroke width of the tick labels on the axis.

strokeColor
***********

.. container:: collapsible

  .. code-block:: typescript

    strokeColor: undefined | string

.. container:: content

  This defines the color of the border around the glyph.

strokeDashArray
***************

.. container:: collapsible

  .. code-block:: typescript

    strokeDashArray: undefined | string

.. container:: content

  This defines the stroke dash array of the glyph. See https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-dasharray

strokeDashOffset
****************

.. container:: collapsible

  .. code-block:: typescript

    strokeDashOffset: undefined | string

.. container:: content

  This defines the offset for the stroke dash array (if supplied) of the glyph. See https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-dashoffset

strokeLineCap
*************

.. container:: collapsible

  .. code-block:: typescript

    strokeLineCap: undefined | string

.. container:: content

  This defines the stroke linecap of the glyph. See https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-linecap

strokeLineJoin
**************

.. container:: collapsible

  .. code-block:: typescript

    strokeLineJoin: undefined | string

.. container:: content

  This defines the offset for the stroke linejoin of the glyph. See https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-linejoin

strokeOpacity
*************

.. container:: collapsible

  .. code-block:: typescript

    strokeOpacity: undefined | number

.. container:: content

  This defines the opacity of the border around the glyph.

strokeWidth
***********

.. container:: collapsible

  .. code-block:: typescript

    strokeWidth: undefined | number

.. container:: content

  This defines the width of the border around the glyph.

textAnchor
**********

.. container:: collapsible

  .. code-block:: typescript

    textAnchor: undefined | string

.. container:: content

  How the text aligns horizontally: start, middle, or end. See: https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/text-anchor

tickFillColor
*************

.. container:: collapsible

  .. code-block:: typescript

    tickFillColor: undefined | string

.. container:: content

  This defines the fill color of the tick marks on the axis

tickFillOpacity
***************

.. container:: collapsible

  .. code-block:: typescript

    tickFillOpacity: undefined | string

.. container:: content

  This defines the fill opacity of the tick marks on the axis.

tickFormat
**********

.. container:: collapsible

  .. code-block:: typescript

    tickFormat: undefined | string

.. container:: content

  This controls the tick count and format of the tick labels. For more information, see: https://github.com/d3/d3-axis#axis_ticks

tickPadding
***********

.. container:: collapsible

  .. code-block:: typescript

    tickPadding: undefined | number

.. container:: content

  This controls the distance between the tick marks and tick labels. For more information, see: https://github.com/d3/d3-axis#axis_tickPadding

tickSizeInner
*************

.. container:: collapsible

  .. code-block:: typescript

    tickSizeInner: undefined | number

.. container:: content

  This controls the size of the "inner" axis ticks. For more information, see: https://github.com/d3/d3-axis#axis_tickSizeInner

tickSizeOuter
*************

.. container:: collapsible

  .. code-block:: typescript

    tickSizeOuter: undefined | number

.. container:: content

  This controls the size of the "outer" axis ticks. For more information, see: https://github.com/d3/d3-axis#axis_tickSizeOuter

tickStrokeColor
***************

.. container:: collapsible

  .. code-block:: typescript

    tickStrokeColor: undefined | string

.. container:: content

  This defines the stroke color of the tick marks on the axis.

tickStrokeOpacity
*****************

.. container:: collapsible

  .. code-block:: typescript

    tickStrokeOpacity: undefined | number

.. container:: content

  This defines the stroke opacity of the tick marks on the axis.

tickStrokeWidth
***************

.. container:: collapsible

  .. code-block:: typescript

    tickStrokeWidth: undefined | number

.. container:: content

  This defines the stroke width of the tick marks on the axis.

ticks
*****

.. container:: collapsible

  .. code-block:: typescript

    ticks: undefined | number

.. container:: content

  This defines the tick property that will be passed to D3's axis.ticks function. For more information, see https://github.com/d3/d3-axis#axis_ticks

