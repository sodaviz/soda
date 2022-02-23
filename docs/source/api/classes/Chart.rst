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

.. _Chart:

:trst-class:`Chart`
===================

.. container:: collapsible

  .. code-block:: typescript

    class Chart<P extends RenderParams>

.. container:: content

  This is used to render Annotation objects as glyphs in the browser.

  **Type parameters**

    - P: RenderParams

Constructors
------------

.. container:: collapsible

  .. code-block:: typescript

    (config: ChartConfig <P>): Chart

.. container:: content

  **Type parameters**

    - P: RenderParams

  **Parameters**

    - config: ChartConfig

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

_renderEnd
**********

.. container:: collapsible

  .. code-block:: typescript

    _renderEnd: number

.. container:: content

  The semantic end coordinate of what is currently rendered.

_renderParams
*************

.. container:: collapsible

  .. code-block:: typescript

    _renderParams: undefined | P

.. container:: content

  The last used render parameters.

_renderStart
************

.. container:: collapsible

  .. code-block:: typescript

    _renderStart: number

.. container:: content

  The semantic start coordinate of what is currently rendered.

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

scaleExtent
***********

.. container:: collapsible

  .. code-block:: typescript

    scaleExtent: None

.. container:: content

  A list of two numbers that define the extent to which a zoom event is allowed to transform the TrackChart's underlying scale. Simply put, this controls how far in and out a user will be able to zoom. The first number is the maximum zoom-out factor, and the second is the maximum zoom-in factor. For example, setting this to [1, 10] will prevent a user from zooming out past the point at which the chart is initially rendered, and allow them to zoom in by a factor of 10. For more info, see https://github.com/d3/d3-zoom/blob/master/README.md#zoom_scaleExtent

translateExtent
***************

.. container:: collapsible

  .. code-block:: typescript

    translateExtent: (chart: Chart <any>): None

.. container:: content

  This is a callback function that is used to set the translate extent (left/right panning) allowed when a zoom event is applied to the TrackChart. It needs to be a callback, because it needs the absolute width of the TrackChart's SVG viewport, which is allowed to change throughout the TrackChart's lifetime. For example, setting this to: (chart) => [[0, 0], [chart.width, chart.height]] will restrict the panning in the TrackChart to exactly the range that was initially rendered. For more info, see https://github.com/d3/d3-zoom/blob/master/README.md#zoom_translateExtent

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

xScaleBase
**********

.. container:: collapsible

  .. code-block:: typescript

    xScaleBase: ScaleLinear <number, number>

.. container:: content

  The base D3 scale that will be used to rescale the Chart's xScale.

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

renderEnd
*********

.. container:: collapsible

 .. code-block:: typescript

    get renderEnd(): number

.. container:: content

  Getter for the renderEnd property

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

renderStart
***********

.. container:: collapsible

 .. code-block:: typescript

    get renderStart(): number

.. container:: content

  Getter for the renderStart property.

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

    addAxis(force: boolean): void

.. container:: content

  If the Chart.axis property is set to true, this adds a horizontal axis to the Chart above the top row. Alternatively, if the force=true is supplied it will ignore the Chart.axis setting and add an axis anyway.

  **Parameters**

  - force: boolean

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

  Selectively apply the layout as defined in the RenderParams argument and set the rowCount property to an appropriate value. If a rowCount is defined in the RenderParams, it will not be overwritten. If the RenderParams are configured such that no layout is applied, rowCount will be set to the max row property of the Annotations in the RenderParams.

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

  Clear highlights from the Chart. If a selector is supplied, only the highlight that matches that selector will be removed. Otherwise, all highlights will be removed.

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

  This configures the chart's viewport to appropriately handle browser zoom events.

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

fitPadHeight
************

.. container:: collapsible

 .. code-block:: typescript

    fitPadHeight(): void

.. container:: content

  This fits the Chart's SVG padding based off of the rowCount, rowHeight and padSize properties.

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

  Get the semantic coordinate range of what is currently shown in the Chart's viewport.

  **Returns**: ViewRange

highlight
*********

.. container:: collapsible

 .. code-block:: typescript

    highlight(config: HighlightConfig): string

.. container:: content

  This method highlights a region in the Chart. If no selector is provided, one will be auto generated and returned by the function.

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

rescaleXScale
*************

.. container:: collapsible

 .. code-block:: typescript

    rescaleXScale(transformArg: Transform): void

.. container:: content

  This rescales the Chart's x translation scale. If a transform argument is provided, it will use that. Otherwise, it will use the Chart's internal transform object.

  **Parameters**

  - transformArg: Transform

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

  This resizes the Chart. If the Chart has resizing enabled, this is called automatically when a browser zoom event occurs.

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

zoom
****

.. container:: collapsible

 .. code-block:: typescript

    zoom(): void

.. container:: content

  This is the handler method that will be called when the Chart's viewport receives a browser zoom event.

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

