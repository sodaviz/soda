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

axis
****

.. container:: collapsible

  .. code-block:: typescript

    axis: undefined | boolean

.. container:: content

  This controls whether or not the Chart will render a horizontal axis.

height
******

.. container:: collapsible

  .. code-block:: typescript

    height: undefined | number

.. container:: content

  The height in pixels of the Chart's viewport.

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

scaleExtent
***********

.. container:: collapsible

  .. code-block:: typescript

    scaleExtent: undefined | None

.. container:: content

  A range of floats that constrains the zoom level.

selector
********

.. container:: collapsible

  .. code-block:: typescript

    selector: undefined | string

.. container:: content

  A string that can be used to uniquely select the target DOM container.

translateExtent
***************

.. container:: collapsible

  .. code-block:: typescript

    translateExtent: undefined | (c: Chart <P>): None

.. container:: content

  A callback function that provides a set of ranges that constrains the horizontal translation of the Chart.

width
*****

.. container:: collapsible

  .. code-block:: typescript

    width: undefined | number

.. container:: content

  The height in pixels of the Chart's viewport.

zoomable
********

.. container:: collapsible

  .. code-block:: typescript

    zoomable: undefined | boolean

.. container:: content

  This controls whether or not the Chart will be configured to allow zooming and panning.

