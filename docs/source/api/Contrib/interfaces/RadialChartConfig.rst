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

.. _RadialChartConfig:

:trst-class:`RadialChartConfig`
===============================

.. container:: collapsible

  .. code-block:: typescript

    interface RadialChartConfig<P extends RenderParams>

.. container:: content

  A simple interface that defines the parameters that initialize a RadialChart

  **Type parameters**

    - P: RenderParams

Properties
----------

axisType
********

.. container:: collapsible

  .. code-block:: typescript

    axisType: undefined | Bottom | Top

.. container:: content

  This controls whether or not the Chart will render a horizontal axis.

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

    divMargin: undefined | number

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

id
**

.. container:: collapsible

  .. code-block:: typescript

    id: undefined | string

.. container:: content

  A unique identifier for the Chart. This will be generated automatically if one isn't provided.

inRender
********

.. container:: collapsible

  .. code-block:: typescript

    inRender: undefined | (params: P): void

.. container:: content

  The second rendering callback function.

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

  The final rendering callback function.

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

preRender
*********

.. container:: collapsible

  .. code-block:: typescript

    preRender: undefined | (params: P): void

.. container:: content

  The first rendering callback function.

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

rowStripes
**********

.. container:: collapsible

  .. code-block:: typescript

    rowStripes: undefined | boolean

.. container:: content

  This controls whether or not the rows will be colored in an alternating pattern.

selector
********

.. container:: collapsible

  .. code-block:: typescript

    selector: undefined | string

.. container:: content

  A string that can be used to uniquely select the target DOM container.

trackHeight
***********

.. container:: collapsible

  .. code-block:: typescript

    trackHeight: undefined | number

.. container:: content

  The "height" of the radial track on which annotations will be rendered. Conceptually, this is equal to to the difference of the radii of two concentric circles that define an annulus.

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

