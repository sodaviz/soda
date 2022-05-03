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

.. _RadialChart:

:trst-class:`RadialChart`
=========================

.. container:: collapsible

  .. code-block:: typescript

    class RadialChart<P extends RenderParams>

.. container:: content

  This Chart class is designed for rendering features in a circular context, e.g. bacterial genomes.

  **Type parameters**

    - P: RenderParams

Constructors
------------

.. container:: collapsible

  .. code-block:: typescript

    (config: RadialChartConfig <P>): RadialChart

.. container:: content

  **Type parameters**

    - P: RenderParams

  **Parameters**

    - config: RadialChartConfig

Properties
----------

_divHeight
**********

.. container:: collapsible

  .. code-block:: typescript

    _divHeight: undefined | string

.. container:: content

  The CSS height property of the Chart's div.

_divMargin
**********

.. container:: collapsible

  .. code-block:: typescript

    _divMargin: undefined | string | number

.. container:: content

  The CSS margin property of the Chart's div.

_divOutline
***********

.. container:: collapsible

  .. code-block:: typescript

    _divOutline: undefined | string

.. container:: content

  The CSS outline property of the Chart's div.

_divOverflowX
*************

.. container:: collapsible

  .. code-block:: typescript

    _divOverflowX: undefined | string

.. container:: content

  The CSS overflow-x property of the Chart's div.

_divOverflowY
*************

.. container:: collapsible

  .. code-block:: typescript

    _divOverflowY: undefined | string

.. container:: content

  The CSS overflow-y property of the Chart's div.

_divWidth
*********

.. container:: collapsible

  .. code-block:: typescript

    _divWidth: undefined | string

.. container:: content

  The CSS width property of the Chart's div.

_padHeight
**********

.. container:: collapsible

  .. code-block:: typescript

    _padHeight: undefined | string

.. container:: content

  The stored value of the pad SVG height property.

_padWidth
*********

.. container:: collapsible

  .. code-block:: typescript

    _padWidth: undefined | string

.. container:: content

  The stored value of the pad SVG width property.

_renderParams
*************

.. container:: collapsible

  .. code-block:: typescript

    _renderParams: undefined | P

.. container:: content

  The last used render parameters.

_transform
**********

.. container:: collapsible

  .. code-block:: typescript

    _transform: Transform

.. container:: content

  The Transform object that describes the current zoom transformation.

_viewportHeight
***************

.. container:: collapsible

  .. code-block:: typescript

    _viewportHeight: undefined | string

.. container:: content

  The stored value of the viewport SVG height property.

_viewportWidth
**************

.. container:: collapsible

  .. code-block:: typescript

    _viewportWidth: undefined | string

.. container:: content

  The stored value of the viewport SVG width property.

axisRadius
**********

.. container:: collapsible

  .. code-block:: typescript

    axisRadius: undefined | number

.. container:: content

  The radius of the circle that defines the axis placement.

containerSelection
******************

.. container:: collapsible

  .. code-block:: typescript

    containerSelection: Selection <any, any, any, any>

.. container:: content

  A d3 selection of the Chart's DOM container. This is a pre-existing DOM element (probably a div).

defSelection
************

.. container:: collapsible

  .. code-block:: typescript

    defSelection: Selection <any, any, any, any>

.. container:: content

  A d3 selection of the Chart's defs element. See: https://developer.mozilla.org/en-US/docs/Web/SVG/Element/defs

divSelection
************

.. container:: collapsible

  .. code-block:: typescript

    divSelection: Selection <any, any, any, any>

.. container:: content

  A d3 selection of the Chart's div container. This is created when the Chart is instantiated and placed inside of the selected container in the DOM.

domainConstraint
****************

.. container:: collapsible

  .. code-block:: typescript

    domainConstraint: (chart: Chart <P>): None

.. container:: content

  This constrains the Chart's domain, which in turn constrains both zoom level and panning. The parameter is a callback function that is evaluated after each zoom event to produce an interval that constrains the domain.

draw
****

.. container:: collapsible

  .. code-block:: typescript

    draw: (params: P): void

.. container:: content

  The rendering callback that should be responsible for drawing glyphs with the rendering API.

glyphModifiers
**************

.. container:: collapsible

  .. code-block:: typescript

    glyphModifiers: GlyphModifier <any, any> []

.. container:: content

  A list of GlyphModifiers that control the glyphs rendered in the Chart.

highlightSelection
******************

.. container:: collapsible

  .. code-block:: typescript

    highlightSelection: Selection <any, any, any, any>

.. container:: content

  A d3 selection of the Chart's highlight.

id
**

.. container:: collapsible

  .. code-block:: typescript

    id: string

.. container:: content

  A unique identifier for the Chart.

initialDomain
*************

.. container:: collapsible

  .. code-block:: typescript

    initialDomain: None

.. container:: content

  The initialized domain of the Chart when render() is called with the initializeXScale flag.

innerRadius
***********

.. container:: collapsible

  .. code-block:: typescript

    innerRadius: number

.. container:: content

  The inner radius of the conceptual annulus that defines the Chart annotation track.

layout
******

.. container:: collapsible

  .. code-block:: typescript

    layout: VerticalLayout

.. container:: content

  

leftPadSize
***********

.. container:: collapsible

  .. code-block:: typescript

    leftPadSize: number

.. container:: content

  The number of pixels of padding on the left side of the Chart.

lowerPadSize
************

.. container:: collapsible

  .. code-block:: typescript

    lowerPadSize: number

.. container:: content

  The number of pixels of padding on the bottom of the Chart.

observers
*********

.. container:: collapsible

  .. code-block:: typescript

    observers: ChartObserver []

.. container:: content

  A list of observers attached to the Chart.

outerRadius
***********

.. container:: collapsible

  .. code-block:: typescript

    outerRadius: number

.. container:: content

  The outer radius of the conceptual annulus that defines the Chart annotation track.

overflowViewportSelection
*************************

.. container:: collapsible

  .. code-block:: typescript

    overflowViewportSelection: Selection <any, any, any, any>

.. container:: content

  A d3 selection of the Chart's viewport that allows rendering overflow.

padSelection
************

.. container:: collapsible

  .. code-block:: typescript

    padSelection: Selection <any, any, any, any>

.. container:: content

  A d3 selection of the viewport's padding container.

padSize
*******

.. container:: collapsible

  .. code-block:: typescript

    padSize: number

.. container:: content

  The number of pixels of padding around each edge of the Chart.

postRender
**********

.. container:: collapsible

  .. code-block:: typescript

    postRender: (params: P): void

.. container:: content

  The callback function that the Chart executes after render() is called.

postResize
**********

.. container:: collapsible

  .. code-block:: typescript

    postResize: (): void

.. container:: content

  The callback function that the Chart executes after resize() is called.

postZoom
********

.. container:: collapsible

  .. code-block:: typescript

    postZoom: (): void

.. container:: content

  The callback function that the Chart executes after zoom() is called.

resizable
*********

.. container:: collapsible

  .. code-block:: typescript

    resizable: boolean

.. container:: content

  This controls whether or not the Chart has automatic resizing enabled.

rightPadSize
************

.. container:: collapsible

  .. code-block:: typescript

    rightPadSize: number

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

    rowCount: number

.. container:: content

  The number of rows in the Chart.

rowHeight
*********

.. container:: collapsible

  .. code-block:: typescript

    rowHeight: number

.. container:: content

  The height in pixels of a horizontal row in the Chart. This defaults to a value of 10.

rowOpacity
**********

.. container:: collapsible

  .. code-block:: typescript

    rowOpacity: number

.. container:: content

  The opacity of the colored row stripes.

selector
********

.. container:: collapsible

  .. code-block:: typescript

    selector: string

.. container:: content

  A string that can be used to uniquely select the target DOM container.

trackHeight
***********

.. container:: collapsible

  .. code-block:: typescript

    trackHeight: number

.. container:: content

  The "height" of the radial track on which annotations will be rendered. Conceptually, this is equal to to the difference of the radii of two concentric circles that define an annulus.

trackOutlineSelection
*********************

.. container:: collapsible

  .. code-block:: typescript

    trackOutlineSelection: undefined | Selection <any, any, any, any>

.. container:: content

  A d3 selection to the track outline.

updateDimensions
****************

.. container:: collapsible

  .. code-block:: typescript

    updateDimensions: (params: P): void

.. container:: content

  The rendering callback function that should be responsible for updating the Chart's DOM element dimensions.

updateDomain
************

.. container:: collapsible

  .. code-block:: typescript

    updateDomain: (params: P): void

.. container:: content

  The rendering callback function that should be responsible for updating the domain of the Chart.xScale property.

updateLayout
************

.. container:: collapsible

  .. code-block:: typescript

    updateLayout: (params: P): void

.. container:: content

  The rendering callback function that should be responsible for updating the Chart.layout property.

updateRowCount
**************

.. container:: collapsible

  .. code-block:: typescript

    updateRowCount: (params: P): void

.. container:: content

  The rendering callback function that should be responsible for updating the Chart.rowCount property.

upperPadSize
************

.. container:: collapsible

  .. code-block:: typescript

    upperPadSize: number

.. container:: content

  The number of pixels of padding on the top of the Chart.

viewportHeightPx
****************

.. container:: collapsible

  .. code-block:: typescript

    viewportHeightPx: number

.. container:: content

  The stored height of the viewport SVG in pixels.

viewportSelection
*****************

.. container:: collapsible

  .. code-block:: typescript

    viewportSelection: Selection <any, any, any, any>

.. container:: content

  A d3 selection of the Chart's viewport.

viewportWidthPx
***************

.. container:: collapsible

  .. code-block:: typescript

    viewportWidthPx: number

.. container:: content

  The stored width of the viewport SVG in pixels.

xScale
******

.. container:: collapsible

  .. code-block:: typescript

    xScale: ScaleLinear <number, number>

.. container:: content

  A D3 scale that the Chart will use to translate between semantic and viewport coordinates. This scale will be periodically re-scaled after zoom events.

yScale
******

.. container:: collapsible

  .. code-block:: typescript

    yScale: (row: number): number

.. container:: content

  A simple function that maps from row numbers to the pixel y value of the corresponding row.

zoomConstraint
**************

.. container:: collapsible

  .. code-block:: typescript

    zoomConstraint: None

.. container:: content

  A Chart's contents are scaled by a scaling factor k. If a zoomConstraint of the form [min_k, max_k] is provided, the scaling factor will be constrained to that range. This will not constrain panning.

zoomable
********

.. container:: collapsible

  .. code-block:: typescript

    zoomable: boolean

.. container:: content

  This controls whether or not the Chart has zooming enabled.


Accessors
---------

divHeight
*********

.. container:: collapsible

 .. code-block:: typescript

    get divHeight(): undefined | string | number

.. container:: content

  Gets the divHeight property.

.. container:: collapsible

 .. code-block:: typescript

    set divHeight(value: undefined | string | number): void

.. container:: content

  Sets the divHeight property. This directly adjusts the height CSS style property on the Chart's div element.

divMargin
*********

.. container:: collapsible

 .. code-block:: typescript

    get divMargin(): undefined | string | number

.. container:: content

  Gets the divMargin property.

.. container:: collapsible

 .. code-block:: typescript

    set divMargin(value: undefined | string | number): void

.. container:: content

  Sets the divMargin property. This directly adjusts the margin CSS style property on the Chart's div element.

divOutline
**********

.. container:: collapsible

 .. code-block:: typescript

    get divOutline(): undefined | string

.. container:: content

  Gets the divOutline property.

.. container:: collapsible

 .. code-block:: typescript

    set divOutline(value: undefined | string): void

.. container:: content

  Sets the divOutline property. This directly adjusts the outline CSS style property on the Chart's div element.

divOverflowX
************

.. container:: collapsible

 .. code-block:: typescript

    get divOverflowX(): undefined | string

.. container:: content

  Gets the divOverflowX property.

.. container:: collapsible

 .. code-block:: typescript

    set divOverflowX(value: undefined | string): void

.. container:: content

  Sets the divOverflowX property. This directly adjusts the overflow-x CSS style property on the Chart's div element.

divOverflowY
************

.. container:: collapsible

 .. code-block:: typescript

    get divOverflowY(): undefined | string

.. container:: content

  Gets the divOverflowY property.

.. container:: collapsible

 .. code-block:: typescript

    set divOverflowY(value: undefined | string): void

.. container:: content

  Sets the divOverflowY property. This directly adjusts the overflow-y CSS style property on the Chart's div element.

divWidth
********

.. container:: collapsible

 .. code-block:: typescript

    get divWidth(): undefined | string | number

.. container:: content

  Gets the divWidth property.

.. container:: collapsible

 .. code-block:: typescript

    set divWidth(value: undefined | string | number): void

.. container:: content

  Sets the divWidth property. This directly adjusts the width CSS style property on the Chart's div element.

domain
******

.. container:: collapsible

 .. code-block:: typescript

    get domain(): None

.. container:: content

  Gets the domain of the Chart's x scale.

.. container:: collapsible

 .. code-block:: typescript

    set domain(domain: None): void

.. container:: content

  Set the domain of the Chart's x scale.

range
*****

.. container:: collapsible

 .. code-block:: typescript

    get range(): None

.. container:: content

  Gets the range of the Chart's x scale.

.. container:: collapsible

 .. code-block:: typescript

    set range(range: None): void

.. container:: content

  Set the range of the Chart's x scale.

renderParams
************

.. container:: collapsible

 .. code-block:: typescript

    get renderParams(): P

.. container:: content

  Getter for the Chart's most recently used RenderParams.

.. container:: collapsible

 .. code-block:: typescript

    set renderParams(params: P): void

.. container:: content

  Setter for the renderParams property.

transform
*********

.. container:: collapsible

 .. code-block:: typescript

    get transform(): Transform

.. container:: content

  Getter for the transform property. This also updates the internal transform on the Chart's pad DOM element.

.. container:: collapsible

 .. code-block:: typescript

    set transform(transform: Transform): void

.. container:: content

  Setter for the transform property.

viewportHeight
**************

.. container:: collapsible

 .. code-block:: typescript

    get viewportHeight(): undefined | string | number

.. container:: content

  Gets the viewportHeight property.

.. container:: collapsible

 .. code-block:: typescript

    set viewportHeight(value: undefined | string | number): void

.. container:: content

  Sets the viewportHeight property. This directly adjusts the height SVG attribute on the Chart's viewport SVG element.

viewportWidth
*************

.. container:: collapsible

 .. code-block:: typescript

    get viewportWidth(): undefined | string | number

.. container:: content

  Gets the viewportWidth property.

.. container:: collapsible

 .. code-block:: typescript

    set viewportWidth(value: undefined | string | number): void

.. container:: content

  Sets the viewportWidth property. This directly adjusts the width SVG attribute on the Chart's viewport SVG element.

Methods
-------

addAxis
*******

.. container:: collapsible

 .. code-block:: typescript

    addAxis(): void

.. container:: content

  **Returns**: void

addGlyphModifier
****************

.. container:: collapsible

 .. code-block:: typescript

    addGlyphModifier(modifier: GlyphModifier <A, C>, initialize: boolean): void

.. container:: content

  This adds a GlyphModifier to the Chart.

  **Type parameters**

  - A: Annotation
  - C: Chart

  **Parameters**

  - modifier: GlyphModifier <A, C>
  - initialize: boolean

  **Returns**: void

addRowStripes
*************

.. container:: collapsible

 .. code-block:: typescript

    addRowStripes(): void

.. container:: content

  If the rowColors property has been defined, this method adds row stripes to the Chart.

  **Returns**: void

addTrackOutline
***************

.. container:: collapsible

 .. code-block:: typescript

    addTrackOutline(): void

.. container:: content

  **Returns**: void

alertObservers
**************

.. container:: collapsible

 .. code-block:: typescript

    alertObservers(): void

.. container:: content

  This calls each of this Chart's attached observer's alert() method.

  **Returns**: void

applyGlyphModifiers
*******************

.. container:: collapsible

 .. code-block:: typescript

    applyGlyphModifiers(): void

.. container:: content

  This applies each of the Chart's GlyphModifier.zoom() methods, resulting in each of the glyphs in the Chart being appropriately redrawn for the current zoom level.

  **Returns**: void

calculateContainerDimensions
****************************

.. container:: collapsible

 .. code-block:: typescript

    calculateContainerDimensions(): DOMRect

.. container:: content

  This returns a DOMRect that describes the bounding box of the Chart's container.

  **Returns**: DOMRect

calculateContainerHeight
************************

.. container:: collapsible

 .. code-block:: typescript

    calculateContainerHeight(): number

.. container:: content

  This calculates and returns the Chart's DOM container's height in pixels.

  **Returns**: number

calculateContainerWidth
***********************

.. container:: collapsible

 .. code-block:: typescript

    calculateContainerWidth(): number

.. container:: content

  This calculates and returns the Chart's DOM container's width in pixels.

  **Returns**: number

calculateDivDimensions
**********************

.. container:: collapsible

 .. code-block:: typescript

    calculateDivDimensions(): DOMRect

.. container:: content

  This returns a DOMRect that describes the bounding box of the Chart's div.

  **Returns**: DOMRect

calculatePadDimensions
**********************

.. container:: collapsible

 .. code-block:: typescript

    calculatePadDimensions(): DOMRect

.. container:: content

  This returns a DOMRect that describes the SVG pad dimensions.

  **Returns**: DOMRect

calculatePadHeight
******************

.. container:: collapsible

 .. code-block:: typescript

    calculatePadHeight(): number

.. container:: content

  This calculates and returns the height of the SVG pad in pixels.

  **Returns**: number

calculatePadWidth
*****************

.. container:: collapsible

 .. code-block:: typescript

    calculatePadWidth(): number

.. container:: content

  This calculates and returns the width of the SVG pad in pixels.

  **Returns**: number

calculateViewportDimensions
***************************

.. container:: collapsible

 .. code-block:: typescript

    calculateViewportDimensions(): DOMRect

.. container:: content

  This returns a DOMRect that describes the bounding box of the viewport.

  **Returns**: DOMRect

calculateViewportHeight
***********************

.. container:: collapsible

 .. code-block:: typescript

    calculateViewportHeight(): number

.. container:: content

  This calculates and returns the height of the SVG viewport in pixels.

  **Returns**: number

calculateViewportWidth
**********************

.. container:: collapsible

 .. code-block:: typescript

    calculateViewportWidth(): number

.. container:: content

  This calculates and returns the width of the SVG viewport in pixels.

  **Returns**: number

clear
*****

.. container:: collapsible

 .. code-block:: typescript

    clear(): void

.. container:: content

  This method clears all glyphs that have been rendered in the Chart.

  **Returns**: void

clearHighlight
**************

.. container:: collapsible

 .. code-block:: typescript

    clearHighlight(selector: string): void

.. container:: content

  **Parameters**

  - selector: string

  **Returns**: void

configureResize
***************

.. container:: collapsible

 .. code-block:: typescript

    configureResize(): void

.. container:: content

  This configures the Chart to respond to browser resize events. The default resize behavior is for the Chart to maintain the current semantic view range, either stretching or shrinking the current view.

  **Returns**: void

configureZoom
*************

.. container:: collapsible

 .. code-block:: typescript

    configureZoom(): void

.. container:: content

  **Returns**: void

defaultDraw
***********

.. container:: collapsible

 .. code-block:: typescript

    defaultDraw(params: P): void

.. container:: content

  The default draw() callback. It adds a horizontal axis and renders the RenderParams.annotations property as rectangles.

  **Type parameters**

  - P: RenderParams

  **Parameters**

  - params: P

  **Returns**: void

defaultPostRender
*****************

.. container:: collapsible

 .. code-block:: typescript

    defaultPostRender(): void

.. container:: content

  The default postRender() callback. It calls the Chart.applyGlyphModifiers() method.

  **Type parameters**

  - P: RenderParams

  **Returns**: void

defaultUpdateDimensions
***********************

.. container:: collapsible

 .. code-block:: typescript

    defaultUpdateDimensions(params: P): void

.. container:: content

  The default updateDimensions() callback. It calls updateDivHeight(), updatePadHeight(), and updateViewportHeight(). The result is that the Chart should be tall enough to render the number of rows specified in the rowCount property.

  **Type parameters**

  - P: RenderParams

  **Parameters**

  - params: P

  **Returns**: void

defaultUpdateDomain
*******************

.. container:: collapsible

 .. code-block:: typescript

    defaultUpdateDomain(params: P): void

.. container:: content

  The default updateDomain() callback. If the start and end properties are set on the RenderParams, it uses those to set the domain. If they are not defined, it finds the minimum start and maximum end amongst the annotations property on the RenderParams. If there are no annotations on the RenderParams, it leaves the domain alone.

  **Type parameters**

  - P: RenderParams

  **Parameters**

  - params: P

  **Returns**: void

defaultUpdateLayout
*******************

.. container:: collapsible

 .. code-block:: typescript

    defaultUpdateLayout(params: P): void

.. container:: content

  The default updateLayout() callback. It calls intervalGraphLayout() on the annotations property of the provided RenderParams.

  **Type parameters**

  - P: RenderParams

  **Parameters**

  - params: P

  **Returns**: void

defaultUpdateRowCount
*********************

.. container:: collapsible

 .. code-block:: typescript

    defaultUpdateRowCount(params: P): void

.. container:: content

  The default updateRowCount() callback. It sets Chart.rowCount equal to Chart.layout.rowCount.

  **Type parameters**

  - P: RenderParams

  **Parameters**

  - params: P

  **Returns**: void

disableZoom
***********

.. container:: collapsible

 .. code-block:: typescript

    disableZoom(): void

.. container:: content

  This disables zooming on the Chart.

  **Returns**: void

domainFromMousemoveEvent
************************

.. container:: collapsible

 .. code-block:: typescript

    domainFromMousemoveEvent(transform: Transform, sourceEvent: WheelEvent): None

.. container:: content

  **Parameters**

  - transform: Transform
  - sourceEvent: WheelEvent

  **Returns**: None

domainFromWheelEvent
********************

.. container:: collapsible

 .. code-block:: typescript

    domainFromWheelEvent(transform: Transform, sourceEvent: WheelEvent): None

.. container:: content

  **Parameters**

  - transform: Transform
  - sourceEvent: WheelEvent

  **Returns**: None

fitRadialDimensions
*******************

.. container:: collapsible

 .. code-block:: typescript

    fitRadialDimensions(): void

.. container:: content

  **Returns**: void

highlight
*********

.. container:: collapsible

 .. code-block:: typescript

    highlight(config: HighlightConfig): string

.. container:: content

  **Parameters**

  - config: HighlightConfig

  **Returns**: string

initializeXScale
****************

.. container:: collapsible

 .. code-block:: typescript

    initializeXScale(start: number, end: number): void

.. container:: content

  This initializes an x translation scale with the provided coordinates and the dimensions of the Chart.

  **Parameters**

  - start: number
  - end: number

  **Returns**: void

removeRowStripes
****************

.. container:: collapsible

 .. code-block:: typescript

    removeRowStripes(): void

.. container:: content

  If they have been added, this method removes row stripes from the Chart.

  **Returns**: void

render
******

.. container:: collapsible

 .. code-block:: typescript

    render(params: P): void

.. container:: content

  This method executes the default rendering routine. It executes each rendering callback function in succession.

  **Parameters**

  - params: P

  **Returns**: void

renderAxis
**********

.. container:: collapsible

 .. code-block:: typescript

    renderAxis(): void

.. container:: content

  **Returns**: void

renderTrackOutline
******************

.. container:: collapsible

 .. code-block:: typescript

    renderTrackOutline(): void

.. container:: content

  **Returns**: void

resetTransform
**************

.. container:: collapsible

 .. code-block:: typescript

    resetTransform(): void

.. container:: content

  Reset the Chart's transform to the zoom identity (no translation, no zoom).

  **Returns**: void

resize
******

.. container:: collapsible

 .. code-block:: typescript

    resize(): void

.. container:: content

  **Returns**: void

setDivStyle
***********

.. container:: collapsible

 .. code-block:: typescript

    setDivStyle(property: string, value: undefined | string): void

.. container:: content

  Sets a style property on the Chart's div selection.

  **Parameters**

  - property: string
  - value: undefined | string

  **Returns**: void

setPadAttribute
***************

.. container:: collapsible

 .. code-block:: typescript

    setPadAttribute(attribute: string, value: undefined | string): void

.. container:: content

  Sets an attribute on the Chart's SVG pad.

  **Parameters**

  - attribute: string
  - value: undefined | string

  **Returns**: void

setViewportAttribute
********************

.. container:: collapsible

 .. code-block:: typescript

    setViewportAttribute(attribute: string, value: undefined | string): void

.. container:: content

  Sets an attribute on the Chart's SVG viewports.

  **Parameters**

  - attribute: string
  - value: undefined | string

  **Returns**: void

squareToDivWidth
****************

.. container:: collapsible

 .. code-block:: typescript

    squareToDivWidth(): void

.. container:: content

  **Returns**: void

updateDivHeight
***************

.. container:: collapsible

 .. code-block:: typescript

    updateDivHeight(): void

.. container:: content

  This updates the Chart's div height to accommodate the rowHeight, rowCount, and pad sizes. If Chart._divHeight is explicitly defined, this will do nothing.

  **Returns**: void

updateDivWidth
**************

.. container:: collapsible

 .. code-block:: typescript

    updateDivWidth(): void

.. container:: content

  This sets the Chart's div width to 100%. If Chart._divWidth is explicitly defined, this will do nothing.

  **Returns**: void

updatePadHeight
***************

.. container:: collapsible

 .. code-block:: typescript

    updatePadHeight(): void

.. container:: content

  This updates the Chart's SVG pad height to accommodate the rowHeight, rowCount, and the upper/lower pad sizes. If Chart._padHeight is explicitly defined, this will do nothing.

  **Returns**: void

updateRange
***********

.. container:: collapsible

 .. code-block:: typescript

    updateRange(): void

.. container:: content

  **Returns**: void

updateViewportHeight
********************

.. container:: collapsible

 .. code-block:: typescript

    updateViewportHeight(): void

.. container:: content

  **Returns**: void

updateViewportPosition
**********************

.. container:: collapsible

 .. code-block:: typescript

    updateViewportPosition(): void

.. container:: content

  This updates the Chart's SVG viewport positions to accommodate the left and upper pad sizes.

  **Returns**: void

updateViewportProperties
************************

.. container:: collapsible

 .. code-block:: typescript

    updateViewportProperties(): void

.. container:: content

  This updates all of the viewport properties by calling updateViewportHeight(), updateViewportWidth(), and updateViewportPosition().

  **Returns**: void

updateViewportWidth
*******************

.. container:: collapsible

 .. code-block:: typescript

    updateViewportWidth(): void

.. container:: content

  **Returns**: void

zoom
****

.. container:: collapsible

 .. code-block:: typescript

    zoom(): void

.. container:: content

  **Returns**: void

zoomHighlight
*************

.. container:: collapsible

 .. code-block:: typescript

    zoomHighlight(): void

.. container:: content

  **Returns**: void

getDomainFromAnnotations
************************

.. container:: collapsible

 .. code-block:: typescript

    getDomainFromAnnotations(annotations: Annotation []): None

.. container:: content

  Returns a domain given a list of Annotations.

  **Type parameters**

  - P: RenderParams

  **Parameters**

  - annotations: Annotation []

  **Returns**: None

