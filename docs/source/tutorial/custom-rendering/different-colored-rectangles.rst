.. _tutorial-different-colored-rectangles:

Coloring rectangles using callbacks
===================================

In the previous example, we saw how to override the Chart's default rendering routine to draw colored rectangles.
Instead, you may want to dynamically color your glyphs according to some property of the data they represent.
We can achieve this by providing a :ref:`GlyphCallback` as an argument to the glyph rendering API in the place of a static value.

GlyphCallbacks are callback functions that are supplied with an :ref:`AnnotationDatum` argument while returning a value that is appropriate for setting a glyph styling property. An AnnotationDatum is a simple object that contains references to an individual Annotation object and the Chart that it has (or will be) rendered in. The rendering API will evaluate GlyphCallbacks for each Annotation object supplied, resulting in dynamic styling.

In this example, we'll define some callbacks that set the fill and stroke colors of our rectangle glyphs depending onn an Annotation's row property: Annotations with even numbered row properties will be colored blue, while Annotations with odd numbered rows will be colored purple.

A GlyphCallback definition with explicit type parameters looks something like:

.. code-block:: typescript

    let colors = ['cadetblue', '#9581a9']

    let colorCallback = (
      //type parameters for clarity
      d: AnnotationDatum<
        soda.Annotation,
        soda.Chart,
        string>
    ) => colors[d.a.row % 2]

With our coloring GlyphCallback defined, we can do something like:

.. code-block:: typescript

    let chart = new soda.Chart({
      selector: "#soda-chart",
      axis: true,
      zoomable: true,
      inRender: function (this, params): void {
        soda.rectangle({
          chart: this,
          annotations: params.annotations || [],
          fillColor: colorCallback,
          strokeColor: colorCallback,
        })
      }
    });

Finally, here's a full example that sets the fill and stroke colors differently:

.. code-block:: typescript

    let colors = ['cadetblue', '#9581a9']

    let chart = new soda.Chart({
      selector: "#soda-chart",
      axis: true,
      zoomable: true,
      inRender: function (this, params): void {
        soda.rectangle({
          chart: this,
          annotations: params.annotations || [],
          fillColor: (d) => colors[d.a.row % 2],
          strokeColor: (d) => colors[d.a.row % 1],
        })
      }
    });

    let ann: Soda.Annotation = soda.generateAnnotations({
      n: 10
    })

    chart.render({
      annotations: ann
    })

----

.. raw:: html

    <p class="codepen" data-height="300" data-slug-hash="JjywQGo" data-editable="true" data-user="jackroddy" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
    <span>See the Pen <a href="https://codepen.io/jackroddy/pen/JjywQGo">
    Different colored rectangles - glyph property callbacks</a> by Jack Roddy (<a href="https://codepen.io/jackroddy">@jackroddy</a>)
    on <a href="https://codepen.io">CodePen</a>.</span>
    </p>
    <script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

