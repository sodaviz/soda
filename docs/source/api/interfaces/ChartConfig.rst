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

.. _ChartConfig:

:trst-class:`ChartConfig`
=========================

.. container:: collapsible

  .. code-block:: typescript

    interface ChartConfig<P extends RenderParams>

.. container:: content

  This describes the parameters for configuring and initializing a Chart.

  **Type parameters**

    - P: RenderParams

Properties
----------

axisConfig
**********

.. container:: collapsible

  .. code-block:: typescript

    axisConfig: undefined | ChartAxisConfig

.. container:: content

  This sets the styling properties for the default axis produced by addAxis(), which is called in the default draw() implementation.

debugShading
************

.. container:: collapsible

  .. code-block:: typescript

    debugShading: undefined | boolean

.. container:: content

  If this is set to true, the pad and viewport will be shaded so that they are visible in the browser.

divHeight
*********

.. container:: collapsible

  .. code-block:: typescript

    divHeight: undefined | string | number

.. container:: content

  The height in pixels of the Chart's containing div.

divMargin
*********

.. container:: collapsible

  .. code-block:: typescript

    divMargin: undefined | string | number

.. container:: content

  The CSS margin property for the Chart's div.

divOutline
**********

.. container:: collapsible

  .. code-block:: typescript

    divOutline: undefined | string

.. container:: content

  The CSS outline property for the Chart's div.

divOverflowX
************

.. container:: collapsible

  .. code-block:: typescript

    divOverflowX: undefined | string

.. container:: content

  The CSS overflow-x setting of the Chart's containing div.

divOverflowY
************

.. container:: collapsible

  .. code-block:: typescript

    divOverflowY: undefined | string

.. container:: content

  The CSS overflow-y setting of the Chart's containing div.

divWidth
********

.. container:: collapsible

  .. code-block:: typescript

    divWidth: undefined | string | number

.. container:: content

  The width in pixels of the Chart's containing div.

domainConstraint
****************

.. container:: collapsible

  .. code-block:: typescript

    domainConstraint: undefined | (chart: Chart <P>): None

.. container:: content

  This constrains the Chart's domain, which in turn constrains both zoom level and panning. The parameter is a callback function that is evaluated after each zoom event to produce an interval that constrains the domain.

draw
****

.. container:: collapsible

  .. code-block:: typescript

    draw: undefined | (params: P): void

.. container:: content

  The rendering callback that should be responsible for drawing glyphs with the rendering API.

id
**

.. container:: collapsible

  .. code-block:: typescript

    id: undefined | string

.. container:: content

  A unique identifier for the Chart. This will be generated automatically if one isn't provided.

leftPadSize
***********

.. container:: collapsible

  .. code-block:: typescript

    leftPadSize: undefined | number

.. container:: content

  The number of pixels of padding on the left side of the Chart.

lowerPadSize
************

.. container:: collapsible

  .. code-block:: typescript

    lowerPadSize: undefined | number

.. container:: content

  The number of pixels of padding on the bottom of the Chart.

padSize
*******

.. container:: collapsible

  .. code-block:: typescript

    padSize: undefined | number

.. container:: content

  The number of pixels of padding around each edge of the Chart.

postRender
**********

.. container:: collapsible

  .. code-block:: typescript

    postRender: undefined | (params: P): void

.. container:: content

  The callback function that the Chart executes after render() is called.

postResize
**********

.. container:: collapsible

  .. code-block:: typescript

    postResize: undefined | (): void

.. container:: content

  The callback function that the Chart executes after resize() is called.

postZoom
********

.. container:: collapsible

  .. code-block:: typescript

    postZoom: undefined | (): void

.. container:: content

  The callback function that the Chart executes after zoom() is called.

resizable
*********

.. container:: collapsible

  .. code-block:: typescript

    resizable: undefined | boolean

.. container:: content

  This controls whether or not the Chart will automatically resize itself as it's container changes size. This will cause the Chart to ignore explicit height/width arguments in the config.

rightPadSize
************

.. container:: collapsible

  .. code-block:: typescript

    rightPadSize: undefined | number

.. container:: content

  The number of pixels of padding on the right side of the Chart.

rowColors
*********

.. container:: collapsible

  .. code-block:: typescript

    rowColors: undefined | string []

.. container:: content

  A list of colors that will color the Chart's rows in a repeating pattern.

rowCount
********

.. container:: collapsible

  .. code-block:: typescript

    rowCount: undefined | number

.. container:: content

  The number of rows that will be rendered.

rowHeight
*********

.. container:: collapsible

  .. code-block:: typescript

    rowHeight: undefined | number

.. container:: content

  The height in pixels of a horizontal row in the Chart. This defaults to a value of 10.

rowOpacity
**********

.. container:: collapsible

  .. code-block:: typescript

    rowOpacity: undefined | number

.. container:: content

  The opacity of the colored row stripes.

selector
********

.. container:: collapsible

  .. code-block:: typescript

    selector: string

.. container:: content

  A string that can be used to uniquely select the target DOM container.

updateDimensions
****************

.. container:: collapsible

  .. code-block:: typescript

    updateDimensions: undefined | (params: P): void

.. container:: content

  The rendering callback function that should be responsible for updating the Chart's DOM element dimensions.

updateDomain
************

.. container:: collapsible

  .. code-block:: typescript

    updateDomain: undefined | (params: P): void

.. container:: content

  The rendering callback function that should be responsible for updating the domain of the Chart.xScale property.

updateLayout
************

.. container:: collapsible

  .. code-block:: typescript

    updateLayout: undefined | (params: P): void

.. container:: content

  The rendering callback function that should be responsible for updating the Chart.layout property.

updateRowCount
**************

.. container:: collapsible

  .. code-block:: typescript

    updateRowCount: undefined | (params: P): void

.. container:: content

  The rendering callback function that should be responsible for updating the Chart.rowCount property.

upperPadSize
************

.. container:: collapsible

  .. code-block:: typescript

    upperPadSize: undefined | number

.. container:: content

  The number of pixels of padding on the top of the Chart.

zoomConstraint
**************

.. container:: collapsible

  .. code-block:: typescript

    zoomConstraint: undefined | None

.. container:: content

  A Chart's contents are scaled by a scaling factor k. If a zoomConstraint of the form [min_k, max_k] is provided, the scaling factor will be constrained to that interval. This will not constrain panning.

zoomable
********

.. container:: collapsible

  .. code-block:: typescript

    zoomable: undefined | boolean

.. container:: content

  This controls whether or not the Chart will be configured to allow zooming and panning.

