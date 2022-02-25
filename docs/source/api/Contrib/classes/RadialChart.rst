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

_axisAnn
********

.. container:: collapsible

  .. code-block:: typescript

    _axisAnn: undefined | Annotation

.. container:: content

  The Annotation object that is used to render the horizontal axis (if enabled).

_containerSelection
*******************

.. container:: collapsible

  .. code-block:: typescript

    _containerSelection: undefined | Selection <any, any, any, any>

.. container:: content

  A d3 selection of the Chart's DOM container. This is a pre-existing DOM element (probably a div).

_padHeight
**********

.. container:: collapsible

  .. code-block:: typescript

    _padHeight: number

.. container:: content

  The height in pixels of the Chart's SVG pad.

_padWidth
*********

.. container:: collapsible

  .. code-block:: typescript

    _padWidth: number

.. container:: content

  The width in pixels of the Chart's SVG pad.

_renderParams
*************

.. container:: collapsible

  .. code-block:: typescript

    _renderParams: undefined | P

.. container:: content

  The last used render parameters.

_rowStripePatternSelection
**************************

.. container:: collapsible

  .. code-block:: typescript

    _rowStripePatternSelection: undefined | Selection <SVGPatternElement, any, any, any>

.. container:: content

  A D3 selection of the SVG pattern that is used for row striping.

_rowStripeRectSelection
***********************

.. container:: collapsible

  .. code-block:: typescript

    _rowStripeRectSelection: undefined | Selection <SVGRectElement, any, any, any>

.. container:: content

  A D3 Selection of the SVG rectangle that is used for row striping.

_selector
*********

.. container:: collapsible

  .. code-block:: typescript

    _selector: undefined | string

.. container:: content

  A string that can be used to uniquely select the target DOM container.

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

    _viewportHeight: number

.. container:: content

  The height in pixels of the Chart's SVG viewport.

_viewportWidth
**************

.. container:: collapsible

  .. code-block:: typescript

    _viewportWidth: number

.. container:: content

  The width in pixels of the Chart's SVG viewport.

axisRadius
**********

.. container:: collapsible

  .. code-block:: typescript

    axisRadius: undefined | number

.. container:: content

  The radius of the circle that defines the axis placement.

axisType
********

.. container:: collapsible

  .. code-block:: typescript

    axisType: undefined | Bottom | Top

.. container:: content

  This indicates whether or not the Chart has a horizontal axis.

defSelection
************

.. container:: collapsible

  .. code-block:: typescript

    defSelection: Selection <any, any, any, any>

.. container:: content

  A d3 selection of the Chart's defs element. See: https://developer.mozilla.org/en-US/docs/Web/SVG/Element/defs

divHeight
*********

.. container:: collapsible

  .. code-block:: typescript

    divHeight: undefined | string | number

.. container:: content

  The CSS height property of the Chart's div.

divMargin
*********

.. container:: collapsible

  .. code-block:: typescript

    divMargin: undefined | number

.. container:: content

  The CSS margin property of the Chart's div.

divOutline
**********

.. container:: collapsible

  .. code-block:: typescript

    divOutline: undefined | string

.. container:: content

  The CSS outline property of the Chart's div.

divOverflowX
************

.. container:: collapsible

  .. code-block:: typescript

    divOverflowX: undefined | string

.. container:: content

  The CSS overflow-x property of the Chart's div.

divOverflowY
************

.. container:: collapsible

  .. code-block:: typescript

    divOverflowY: undefined | string

.. container:: content

  The CSS overflow-y property of the Chart's div.

divSelection
************

.. container:: collapsible

  .. code-block:: typescript

    divSelection: Selection <any, any, any, any>

.. container:: content

  A d3 selection of the Chart's inner div. This is created when the Chart is instantiated and placed inside of the selected container in the DOM.

divWidth
********

.. container:: collapsible

  .. code-block:: typescript

    divWidth: undefined | string | number

.. container:: content

  The CSS width property of the Chart's div.

domainConstraint
****************

.. container:: collapsible

  .. code-block:: typescript

    domainConstraint: (chart: Chart <P>): None

.. container:: content

  This constrains the Chart's domain, which in turn constrains both zoom level and panning. The parameter is a callback function that is evaluated after each zoom event to produce an interval that constrains the domain.

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

inRender
********

.. container:: collapsible

  .. code-block:: typescript

    inRender: (params: P): void

.. container:: content

  The second rendering callback function.

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

  The final rendering callback function.

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

preRender
*********

.. container:: collapsible

  .. code-block:: typescript

    preRender: (params: P): void

.. container:: content

  The first rendering callback function.

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

rowStripes
**********

.. container:: collapsible

  .. code-block:: typescript

    rowStripes: boolean

.. container:: content

  This controls whether or not the rows will be colored in an alternating pattern.

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

upperPadSize
************

.. container:: collapsible

  .. code-block:: typescript

    upperPadSize: number

.. container:: content

  The number of pixels of padding on the top of the Chart.

viewportSelection
*****************

.. container:: collapsible

  .. code-block:: typescript

    viewportSelection: Selection <any, any, any, any>

.. container:: content

  A d3 selection of the Chart's viewport.

xScale
******

.. container:: collapsible

  .. code-block:: typescript

    xScale: ScaleLinear <number, number>

.. container:: content

  A D3 scale that the Chart will use to translate between semantic and viewport coordinates. This scale will be periodically re-scaled after zoom events.

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

containerSelection
******************

.. container:: collapsible

 .. code-block:: typescript

    get containerSelection(): Selection <any, any, any, any>

.. container:: content

  Get a D3 selection of the Chart's DOM Container. This throws an exception if the value is undefined, which probably means the entire chart is detached from the DOM.

padHeight
*********

.. container:: collapsible

 .. code-block:: typescript

    get padHeight(): number

.. container:: content

  Getter for the padHeight property.

.. container:: collapsible

 .. code-block:: typescript

    set padHeight(height: number): void

.. container:: content

  Setter for the padHeight property. This actually adjusts the height attribute on the viewport DOM element.

padWidth
********

.. container:: collapsible

 .. code-block:: typescript

    get padWidth(): number

.. container:: content

  Getter for the padWidth property.

.. container:: collapsible

 .. code-block:: typescript

    set padWidth(width: number): void

.. container:: content

  Setter for the padWidth property. This actually adjusts the width attribute on the viewport DOM element.

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

  Setter for the renderParms property.

rowStripePatternSelection
*************************

.. container:: collapsible

 .. code-block:: typescript

    get rowStripePatternSelection(): Selection <SVGPatternElement, any, any, any>

.. container:: content

  A getter for the rowStripePatternSelection property. This serves as a null guard.

rowStripeRectSelection
**********************

.. container:: collapsible

 .. code-block:: typescript

    get rowStripeRectSelection(): Selection <SVGRectElement, any, any, any>

.. container:: content

  A getter for the rowStripeSelection property. This serves as a null guard.

selector
********

.. container:: collapsible

 .. code-block:: typescript

    get selector(): string

.. container:: content

  A getter for the Chart's selector property. The selector should be able to uniquely select the Chart's DOM container.

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

    get viewportHeight(): number

.. container:: content

  Getter for the viewportHeight property.

.. container:: collapsible

 .. code-block:: typescript

    set viewportHeight(height: number): void

.. container:: content

  Setter for the viewportHeight property. This actually adjusts the height property on the viewport DOM element.

viewportWidth
*************

.. container:: collapsible

 .. code-block:: typescript

    get viewportWidth(): number

.. container:: content

  Getter for the viewportWidth property.

.. container:: collapsible

 .. code-block:: typescript

    set viewportWidth(width: number): void

.. container:: content

  Setter for the viewportWidth property. This actually adjusts the width property on the viewport DOM element.

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

applyLayoutAndSetRowCount
*************************

.. container:: collapsible

 .. code-block:: typescript

    applyLayoutAndSetRowCount(params: P): void

.. container:: content

  **Parameters**

  - params: P

  **Returns**: void

calculateContainerDimensions
****************************

.. container:: collapsible

 .. code-block:: typescript

    calculateContainerDimensions(): DOMRect

.. container:: content

  This uses d3 to select the Chart's DOM container and returns a DOMRect that describes that containers dimensions.

  **Returns**: DOMRect

calculateDivDimensions
**********************

.. container:: collapsible

 .. code-block:: typescript

    calculateDivDimensions(): DOMRect

.. container:: content

  **Returns**: DOMRect

calculatePadDimensions
**********************

.. container:: collapsible

 .. code-block:: typescript

    calculatePadDimensions(): DOMRect

.. container:: content

  This returns a DOMRect that describes the pad dimensions.

  **Returns**: DOMRect

calculatePadHeight
******************

.. container:: collapsible

 .. code-block:: typescript

    calculatePadHeight(): number

.. container:: content

  This calculates and returns the width of the SVG viewport in pixels.

  **Returns**: number

calculatePadWidth
*****************

.. container:: collapsible

 .. code-block:: typescript

    calculatePadWidth(): number

.. container:: content

  This calculates and returns the width of the SVG viewport in pixels.

  **Returns**: number

calculateViewportDimensions
***************************

.. container:: collapsible

 .. code-block:: typescript

    calculateViewportDimensions(): DOMRect

.. container:: content

  This returns a DOMRect that describes the viewport's dimensions.

  **Returns**: DOMRect

calculateViewportHeight
***********************

.. container:: collapsible

 .. code-block:: typescript

    calculateViewportHeight(): number

.. container:: content

  This checks the current height of the viewport in the DOM and returns it.

  **Returns**: number

calculateViewportWidth
**********************

.. container:: collapsible

 .. code-block:: typescript

    calculateViewportWidth(): number

.. container:: content

  This calculates the current width of the viewport in the DOM and returns it.

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

defaultInRender
***************

.. container:: collapsible

 .. code-block:: typescript

    defaultInRender(params: P): void

.. container:: content

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

  **Type parameters**

  - P: RenderParams

  **Returns**: void

defaultPreRender
****************

.. container:: collapsible

 .. code-block:: typescript

    defaultPreRender(params: P): void

.. container:: content

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

fitPadHeight
************

.. container:: collapsible

 .. code-block:: typescript

    fitPadHeight(): void

.. container:: content

  This fits the Chart's SVG padding based off of the rowCount, rowHeight and padSize properties.

  **Returns**: void

fitRadialDimensions
*******************

.. container:: collapsible

 .. code-block:: typescript

    fitRadialDimensions(): void

.. container:: content

  **Returns**: void

fitRowStripes
*************

.. container:: collapsible

 .. code-block:: typescript

    fitRowStripes(): void

.. container:: content

  This automatically sets the dimensions of the row stripe DOM elements.

  **Returns**: void

fitViewport
***********

.. container:: collapsible

 .. code-block:: typescript

    fitViewport(): void

.. container:: content

  This fits the Chart's SVG viewport based off of the Chart's pad size.

  **Returns**: void

getContainerHeight
******************

.. container:: collapsible

 .. code-block:: typescript

    getContainerHeight(): number

.. container:: content

  This calculates and returns the Chart's DOM container's height in pixels.

  **Returns**: number

getContainerWidth
*****************

.. container:: collapsible

 .. code-block:: typescript

    getContainerWidth(): number

.. container:: content

  This calculates and returns the Chart's DOM container's width in pixels.

  **Returns**: number

getSemanticViewRange
********************

.. container:: collapsible

 .. code-block:: typescript

    getSemanticViewRange(): ViewRange

.. container:: content

  **Returns**: ViewRange

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

initializeXScaleFromRenderParams
********************************

.. container:: collapsible

 .. code-block:: typescript

    initializeXScaleFromRenderParams(params: P): void

.. container:: content

  This initializes an x translation scale with the provided RenderParams and the dimensions of the Chart.

  **Parameters**

  - params: P

  **Returns**: void

render
******

.. container:: collapsible

 .. code-block:: typescript

    render(params: P): void

.. container:: content

  This method stores the render parameters on the Chart and calls preRender(), inRender(), and postRender().

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

setDomain
*********

.. container:: collapsible

 .. code-block:: typescript

    setDomain(domain: None): void

.. container:: content

  Set the domain of the Chart's x scale.

  **Parameters**

  - domain: None

  **Returns**: void

setRange
********

.. container:: collapsible

 .. code-block:: typescript

    setRange(range: None): void

.. container:: content

  Set the range of the Chart's x scale.

  **Parameters**

  - range: None

  **Returns**: void

setRowStripes
*************

.. container:: collapsible

 .. code-block:: typescript

    setRowStripes(): void

.. container:: content

  This initializes the DOM elements that form the row stripes in the Chart, if enabled.

  **Returns**: void

setToContainerDimensions
************************

.. container:: collapsible

 .. code-block:: typescript

    setToContainerDimensions(): void

.. container:: content

  This calculates the Chart's DOM container's dimensions and sets the Chart's SVG pad to fill those dimensions.

  **Returns**: void

squareToContainerHeight
***********************

.. container:: collapsible

 .. code-block:: typescript

    squareToContainerHeight(): void

.. container:: content

  This calculates the height of the Chart's DOM container and sets the Chart's SVG pad to a square with that height.

  **Returns**: void

squareToContainerWidth
**********************

.. container:: collapsible

 .. code-block:: typescript

    squareToContainerWidth(): void

.. container:: content

  This calculates the width of the Chart's DOM container and sets the Chart's SVG pad to a square with that width.

  **Returns**: void

squareToDivWidth
****************

.. container:: collapsible

 .. code-block:: typescript

    squareToDivWidth(): void

.. container:: content

  **Returns**: void

updateDivProperties
*******************

.. container:: collapsible

 .. code-block:: typescript

    updateDivProperties(): void

.. container:: content

  **Returns**: void

updateRange
***********

.. container:: collapsible

 .. code-block:: typescript

    updateRange(): void

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

inferRenderRange
****************

.. container:: collapsible

 .. code-block:: typescript

    inferRenderRange(params: P): None

.. container:: content

  A utility function to attempt to infer a semantic range on RenderParams when no range is explicitly supplied.

  **Type parameters**

  - P: RenderParams

  **Parameters**

  - params: P

  **Returns**: None

