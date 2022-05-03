.. _guide_rendering:

Rendering
=========

SODA's rendering API takes :ref:`Annotation` objects and represents them as SVG glyphs inside of :ref:`Chart` viewports in the DOM.
This section explains the ins and out of that process.

Glyph rendering functions
#########################

To render glyphs, you simply make a call to a glyph rendering function with an appropriate :ref:`GlyphConfig` object.
The properties on the config object describe which Annotation objects to use, where to render the glyphs, and how to style the glyphs.
Each glyph rendering function has a corresponding config defined by an interface.
For example, a simple call to the :ref:`rectangle` function with a minimally specified :ref:`RectangleConfig` may look like:

.. code-block:: typescript

    rectangle({
      chart: chart,             // "chart" is a Chart object
      annotations: annotations, // "annotations" is an array of Annotation objects
    });

Glyph selectors
+++++++++++++++

The *selector* property in a :ref:`GlyphConfig` is a string used to help differentiate between distinct collections of glyphs that have been rendered using the same set of Annotation objects in the same Chart.
SODA applies the selector as a CSS class on the DOM elements that make up the glyphs.

The selector property also allows a nuanced feature: if you use the same selector string in a subsequent call to a glyph rendering function, the glyphs from the prior call using that selector will be replaced.

Glyph properties
++++++++++++++++

The properties in a GlyphConfig that control glyph styling are typed as :ref:`GlyphProperty`, which is simply an alias of the type union of a static value and a :ref:`GlyphCallback`.
A GlyphCallback is another type alias for a simple callback function that takes an :ref:`AnnotationDatum` as the sole argument and returns a value.

For example, if we were to add static GlyphPropertie to a rectangle() call, it might look like:

.. code-block:: typescript

    rectangle({
      chart: chart,
      annotations: annotations,
      fillColor: "red",
      fillOpacity: 0.5
    });
    
To illustrate how to take full advantage of the flexibility of GlyphProperties, imagine we were using a custom Annotation data type:

.. code-block:: typescript
    
    interface CustomAnnotation implements Annotation {
      id: string;       // <- the fields required by Annotation
      start: number;    
      end: number;
      color: string;    // <- our custom fields
      score: number;    
    }

Then, we could use callback GlyphProperties like:

.. code-block:: typescript

    // explicit type parameters have been added here for clarity, but
    // the TypeScript compiler is usually smart enough to infer them
    rectangle<CustomAnnotation, Chart<RenderParams>>({
      chart: chart,
      annotations: annotations,
      fillColor: (d: AnnotationDatum<CustomAnnotation, Chart<RenderParams>>) =>
        d.a.color,
      fillOpacity: (d: AnnotationDatum<CustomAnnotation, Chart<RenderParams>>) =>
        d.a.score
    });

Check out the :ref:`examples section<guide_examples>` to see more examples.

The canonical rendering pattern
###############################

In SODA, the canonical rendering pattern is to define a rendering routine inside of a Chart object.
The rendering routine described here is a pattern that we find straightforward, but it is by no means the only way to achieve a visualization.
Once you know a bit about how SODA works, you should find it pretty easy to extend the Chart class and assume greater control over the fine details of rendering process.

Default rendering routine
+++++++++++++++++++++++++

The default rendering routine is broken up into several steps, which will be described in the following sections.

RenderParams
^^^^^^^^^^^^

The RenderParams is an object that is passed as the sole argument into Chart.render().
The default RenderParams implementation looks like:

.. code-block:: typescript
    
    interface RenderParams {
      annotations?: Annotation[];   //<- the list of Annotation objects to render
      start?: number;               //<- the start of the interval to be rendered
      end?: number;                 //<- the end of the interval to be rendered
      rowCount?: number;            //<- fix the height of the chart to a number of rows
    }

You'll notice that every property on the interface is optional.
This means you can think of the default RenderParams implementation as something of a suggestion.
However, the default rendering routine is set up to respond to the presence of each of the properties in this implementation.
With that in mind, you may find some use in adapting or extending the default RenderParams.

Chart.render()
^^^^^^^^^^^^^^

The render() method calls each of the configurable rendering callbacks in succession.
Each of the callbacks receives the RenderParams object as an argument.
The callbacks can be overwritten in the :ref:`ChartConfig` or reassigned at runtime.

.. code-block:: typescript

    public render(params: P): void {
      this.renderParams = params;
      this.updateLayout(params);
      this.updateRowCount(params);
      this.updateDimensions(params);
      this.updateDomain(params);
      this.draw(params);
      this.postRender(params);
    }

Chart.updateLayout()
^^^^^^^^^^^^^^^^^^^^

The updateLayout() callback is responsible for producing a :ref:`VerticalLayout` for the Chart.
By default, the rendering API uses the Chart's layout object to vertically position glyphs into rows.
By passing a list of Annotation objects into one of SODA's layout functions, a VerticalLayout that guarantees no horizontal overlap will be produced.

The default updateLayout method looks like:

.. code-block:: typescript

    public defaultUpdateLayout(params: P): void {
      if (params.annotations != undefined) {
        this.layout = intervalGraphLayout(params.annotations);
      }
    }

Chart.updateRowCount()
^^^^^^^^^^^^^^^^^^^^^^

The updateRowCount() callback is responsible for updating the Chart's rowCount property.
A handful of methods use the rowCount property to properly adjust the heights of the Chart's DOM elements.
 
The default updateRowCount method looks like: 

.. code-block:: typescript

    public defaultUpdateRowCount(params: P): void {
      this.rowCount =
        params.rowCount != undefined ? params.rowCount : this.layout.rowCount;
    }

Chart.updateDimensions()
^^^^^^^^^^^^^^^^^^^^^^^^

The updateDimensions() callback is responsible for updating the Chart's DOM element dimensions to accommodate the render.
By default, only the Chart's vertical dimensions are adjusting during a render call, and it is assumed that the rowCount is properly set before the method is called.

The default updateDimensions method looks like: 

.. code-block:: typescript

    public defaultUpdateDimensions(params: P): void {
      this.updateDivHeight();
      this.updatePadHeight();
      this.updateViewportHeight();
    }

Chart.updateDomain()
^^^^^^^^^^^^^^^^^^^^

The updateDomain() callback is responsible for updating the Chart's domain.
This effectively controls the interval that is initially displayed after the render call finishes.
Adjusting the domain can be thought of as applying zooming or panning on the Chart's viewport.

The default updateDomain method looks like: 

.. code-block:: typescript

    public defaultUpdateDomain(params: P): void {
      let domain = this.domain;
      if (params.start != undefined && params.end != undefined) {
        domain = [params.start, params.end];
      } else if (params.annotations != undefined) {
        domain = Chart.getDomainFromAnnotations(params.annotations);
      }
      this.initialDomain = domain;
      this.domain = domain;
    }

Chart.draw()
^^^^^^^^^^^^

The draw() callback is responsible for using the rendering API to place glyphs in the Chart.
The default implementation calls Chart.addAxis() and renders the annotations as rectangle glyphs.

The default draw method looks like: 

.. code-block:: typescript

    public defaultDraw(params: P): void {
      this.addAxis();
      rectangle({
        chart: this,
        annotations: params.annotations || [],
        selector: "soda-rect"
      });
    }

Customizing the rendering routine
++++++++++++++++++++++++++++++++++

In building your own SODA visualization, most of the work is likely to be in customizing the draw() rendering callback.
The default draw() produces a lackluster display of black rectangle glyphs.
If you wanted to add some color, you could do something like this when you instantiate your Chart:

.. code-block:: typescript

    let chart = new Chart({
      selector: "div#soda-chart",
      draw(this, params) {
        this.addAxis()
        rectangle({
          chart: this,
          annotations: params.annotations || [],
          selector: "soda-rect",
          fillColor: "cyan" // <- this will make the rectangle glyphs cyan
        })
      }
    });

Understanding the nuances of customizing the rendering routine is probably best learned by example, so check out the :ref:`examples section<guide_examples>` to learn more.


Interactivity
#############

SODA allows you to define callback functions that are called whenever a glyph is clicked or hovered.
The callback functions are loosely typed by :ref:`InteractionCallback`.
The InteractionCallback type serves as an indicator of the arguments SODA will pass to your callback function when it is executed:

.. code-block:: typescript

    type InteractionCallback<A extends Annotation, C extends Chart<any>> = {
      (
        s: d3.Selection<any, AnnotationDatum<A, C>, any, any>, // <- a D3 selection to the glyph's DOM element
        d: AnnotationDatum<A, C>                               // <- a reference to the Annotation object and the Chart
      ): void;
    };

These arguments are passed in by default, and you are free to arbitrarily define the function body.
If you already know a bit about D3 (or are willing to learn), you can use the Selection argument to modify the glyph in the DOM.
With the :ref:`AnnotationDatum` argument, you gain access to the Annotation that the glyph was rendered with and the Chart that it is rendered in.

The interaction API is similar to the glyph rendering API: you simply make a call to an interaction function with an appropriate :ref:`InteractionConfig` object.
For example, a simple call to the :ref:`clickBehavior` function with :ref:`ClickConfig` may look like:

.. code-block:: typescript

    clickBehavior({
        annotations: annotations,     // <- "annotations" is an array of Annotation objects
        click: (s, d) => {            // <- "click" is applied
          alert(`${d.a.id} clicked`) 
        }
    });

Glyph mapping
#############

Internally, SODA maps Annotation objects to the glyphs that they have been used to render.
Specifically, keys are built using the *id* property of the Annotation object, the *selector* used in the rendering call, and the *id* property of the target Chart.
The mapping information can be accessed with the :ref:`queryGlyphMap` function, which returns D3 selections of the DOM elements that make up the glyphs.
You can optionally specify any number of the components of the keys to build a query, effectively changing the granularity of the search.

Calls to the *queryGlyphMap* function may look like:

.. code-block:: typescript

    // this will return a single glyph
    let specificGlyph = queryGlyphMap({
        id: "ann-1",
        chart: chart,
        selector: "gene-rectangles",
    })
    
    // this will return all of the glyphs in "chart"
    // rendered with the selector: "gene-rectangles"
    let rectanglesInChart = queryGlyphMap({
        chart: chart,
        selector: "gene-rectangles"
    })

    // this will return all of the glyphs in every Chart
    // rendered with the selector: "gene-rectangles"
    let allRectangles = queryGlyphMap({
        selector: "gene-rectangles"
    })

    // this will return all of the glyphs in "chart"
    let allInChart = queryGlyphMap({
        chart: chart,
    })

    // this will return every glyph in every Chart
    let allGlyphs = queryGlyphMap({})
