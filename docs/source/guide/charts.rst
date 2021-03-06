.. _guide_charts:

Charts
======

Chart objects are wrappers around SVG viewports in the browser that house SODA visualizations.
This section explains both how the viewports are structured and how their wrapper Chart objects work under the hood. 

Chart anatomy
#############

In the the DOM, Charts exist as a collection of SVG elements inside of a containing div element.
By default, the div container is assigned to be 100% of the width of its parent, and its height is dynamically adjusted to properly display the contents of the SVG elements.

We refer to the outermost SVG as the **SVG pad**, and it is set to 100% of the dimensions of the div container.
The SVG pad has two child SVG elements, the **viewport** and the **overflow viewport.**
By default, both viewport SVG elements are centered in the SVG pad using the Chart's padSize property.

The SODA rendering API renders glyphs by placing SVG shapes inside either of the SVG viewports.
The viewports are different only in the way that they treat glyphs positioned outside of their bounding box.
The **viewport** hides glyphs that bleed into the SVG pad bounding box, while the **overflow viewport** does not.
Conceptually, we divide Chart viewports vertically into rows, and, by default, glyphs are sized to fit into these rows.
For more details on the rendering, see the :ref:`rendering section<guide_rendering>`.

.. figure:: /_static/media/chart-dimensions.png

    A Chart with rectangle glyphs in five rows and an axis glyph rendered in the overflow viewport.
    
Chart configuration
###################

Charts are configured and instantiated with a :ref:`ChartConfig` object.
Excluding *selector*, every property on the ChartConfig is optional.
The *selector* property is used as a CSS selector to identify the target DOM container that the Chart will be placed in.
Typically, the target of the *selector* should be a div that you explicitly create and position to accommodate your Chart viewport.

For example, a minimal Chart configuration may look something like this:

.. code-block:: typescript
    
    let chart = new Chart({ selector: "div#soda-chart" });

Running this code will initialize a Chart in a div with the class "soda-chart," assuming that such a div exists in the DOM.
The Chart will be a completely blank slate, which means that you won't actually see anything rendered in it.

Dimensions configuration
++++++++++++++++++++++++

The majority of properties control the dimensions of the various components of the Chart described above.
The dimensions options that are likely to have the most impact on your visualization are *rowHeight* and *padSize.*
For a complete list of dimension configuration options, check out the :ref:`ChartConfig` page in the API documentation.

Rendering configuration
+++++++++++++++++++++++
There are several callback function properties on the ChartConfig that, when supplied, override the default behavior of the *Chart.render()* method.
The :ref:`rendering section<guide_rendering>` describes the rendering processing and the purpose of these callback functions in detail, but we'll note them here for the sake of completeness:

- *updateLayout()*
- *updateRowCount()*
- *updateDimensions()*
- *updateDomain()*
- *draw()*

Default axes
++++++++++++

A default horizontal axis is rendered in the **overflow viewport** if the *chart.addAxis()* function is called.
Specifically, it is positioned in the bounding box of the upper section of the **SVG pad**, outside of the bounding box of the **viewport**.
The default *chart.draw()* implementation calls the addAxis() function.

For example, the following code:

.. code-block:: typescript
    
    let chart = new Chart({
        selector: "div#soda-chart",
    });

    chart.render({});

will produce something like:

.. figure:: /_static/media/chart-axis.png

    A blank Chart set up to render a default horizontal axis.

Adjusting the *padSize* may cause the axis to be positioned such that it is too low or too high.

If the default horizontal axis doesn't work for your visualization, you can place a horizontal axis wherever you'd like using the :ref:`horizontalAxis` function. 

Row colors
++++++++++

If the rowColors property is configured, the rows in the Chart will be rendered with those colors in a repeating pattern.
If the rowOpacity property is configured, the value will control the opacity of the rows.

For example,

.. code-block:: typescript

    let chart = new soda.Chart({
      selector: "div#soda-chart",
      rowColors: ["cyan", "green", "purple"],
      rowOpacity: 0.5,
    });

    chart.render({ rowCount: 10 });

will produce something like:

.. figure:: /_static/media/chart-row-colors.png

    A blank Chart set up with row colors cyan, green, and purple.

Zooming and panning
+++++++++++++++++++

Charts can be configured to enable zooming and panning by setting the *zoomable* property to true on the :ref:`ChartConfig`.

.. code-block:: typescript
    
    let chart = new Chart({
        selector: "div#soda-chart",
        zoomable: true 
    });

Zoomable Charts may be zoomed with ctrl + scrolling and panned by clicking and dragging.
Any glyphs added to the Chart using SODA's rendering API will respond appropriately to zooming and panning events.
Any SVG elements that are added to the Chart by other means will remain unaltered.

Zooming may be constrained with the *zoomConstraint* property, which is a tuple that bounds the scaling factor.

For example,

.. code-block:: typescript
    
    let chart = new Chart({
        selector: "div#soda-chart",
        zoomable: true,
        zoomConstraint: [1, 100]
    });

would prevent the chart from being zoomed out from the point it's initially rendered at, and would allow zooming in by a factor of 100.

Panning may be constrained with the *domainConstraint* property, which is a callback function that returns the desired extent of the domain.
The callback function receives the Chart itself as an argument.

For example:

.. code-block:: typescript
    
    let chart = new Chart({
        selector: "div#soda-chart",
        zoomable: true,
        // chart.initialDomain is the extent of the 
        // domain set during the last render call
        domainConstraint: (chart) => chart.initialDomain
    });

would prevent the Chart from being panned outside of the domain set by the last *render()* call.

Resizing
++++++++

Charts can be configured to automatically resize themselves as their DOM container resizes by setting the *resizable* property to true on the :ref:`ChartConfig`.

.. code-block:: typescript
    
    let chart = new Chart({
        selector: "div#soda-chart",
        resizable: true 
    });

If this is enabled, when the Chart's container is resized (e.g. when the browser window is resized), the Chart will re-render itself to display the same domain in the new range.
As with zooming, any glyphs rendered with SODA will be affected, but any SVG elements added by other means will remain unaffected.

Zoom and resize callbacks
+++++++++++++++++++++++++

You can optionally supply both a *postZoom* and a *postResize* callback in the :ref:`ChartConfig`, which will be called after zoom/pan events and resize events, respectively.

For example:

.. code-block:: typescript
    
    let chart = new Chart({
        selector: "div#soda-chart",
        zoomable: true,
        resizable: true, 
        postZoom() {
            console.log(this, "zoomed!");
        },
        postResize() {
            console.log(this, "resized!");
        }
    });

Chart scales
############

To help position glyphs in the viewport, Charts maintain a couple of scale functions.

The first is the *xScale*, which maps from semantic coordinates (e.g. positions in a sequence) to pixel x-coordinates relative to the origin of the viewports.
The *xScale* is used extensively by the defaults in the :ref:`rendering<guide_rendering>` API, and also in the zooming, panning, and resizing logic.

The second is the *yScale*, which maps row numbers to the pixel y-coordinates that delineate each of the conceptual rows in the Chart's viewport.

Chart observers
###############

The Chart observer is a SODA pattern in which an object can respond to changes in a Chart.
The pattern is currently not very fleshed out, and it is currently only used by the :ref:`ZoomSyncer` object, which synchronizes the zoom level across multiple Charts.
At some point, we will overhaul this system to make it much more useful, but you may find some use from it in its current state.

You can create an object that extends the abstract class :ref:`ChartObserver`, add Charts to it, and then configure Charts to call *Chart.alertObservers()*.



