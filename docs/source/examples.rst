.. _examples:

Examples
========

This page shows some examples of simple SODA visualizations.
Each example has an embedded `CodePen`_, which can be edited live by selecting the "TypeScript" tab.

The data from each example is loaded with a `fetch`_ call to the Sodaviz example database API, which returns JSON strings that serialize directly into JavaScript objects that implement the :ref:`Annotation` interface.

For example, creating a chart and rendering data from a fetch request looks something like:

.. code-block:: typescript

    // create a chart in the div with the ID "soda-chart"
    let chart = new soda.Chart({ selector: "div#soda-chart" });

    // fetch the example data from this endpoint
    fetch("https://sodaviz.org/data/examples/default")
      // when we get the response, call json() to serialize it into objects
      .then((response: Response) => response.json()) 
      // when we have our objects, render them in the Chart
      .then((annotations: soda.Annotation[]) => {
        chart.render({ annotations: annotations }
      });

For the sake of brevity, the following examples omit some syntax, which leaves them looking a little more like: 

.. code-block:: typescript

    let chart = new soda.Chart({ selector: "div#soda-chart" });

    fetch("https://sodaviz.org/data/examples/default")
      .then(response => response.json()) 
      .then(annotations => chart.render({ annotations }));

.. tip::

    Each example can be zoomed with ctrl + scroll wheel and panned by clicking and dragging.


Simple rectangles
^^^^^^^^^^^^^^^^^

.. code-block:: typescript

    import * as soda from "https://cdn.skypack.dev/@sodaviz/soda@0.11.0";

    let chart = new soda.Chart({
      selector: "div#soda-chart",
      zoomable: true,
      resizable: true
    });
    
    fetch("https://sodaviz.org/data/examples/default")
      .then(response => response.json())
      .then(annotations => chart.render({ annotations });

.. raw:: html

    <p class="codepen" data-height="300" data-default-tab="result" data-slug-hash="rNJeyKO" data-preview="true" data-editable="true" data-user="jackroddy" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
      <span>See the Pen <a href="https://codepen.io/jackroddy/pen/rNJeyKO">
      simple rectangles 0.10.1</a> by Jack Roddy (<a href="https://codepen.io/jackroddy">@jackroddy</a>)
      on <a href="https://codepen.io">CodePen</a>.</span>
    </p>
    <script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

----

Styled rectangles
^^^^^^^^^^^^^^^^^

.. code-block:: typescript
    
    import * as soda from "https://cdn.skypack.dev/@sodaviz/soda@0.11.0";
    import * as d3 from "https://cdn.skypack.dev/d3@7.4.4";
    
    // we'll use this D3 color scale later to easily pick colors
    let colors = d3.scaleOrdinal(d3.schemeTableau10);
    
    // we'll define a custom Annotation interface that
    // describes some extra fields that exist in our records
    interface CustomAnnotation extends soda.Annotation {
      family: string;
      divergence: number;
    }
    
    // we'll define a custom RenderParams interface that
    // describes our custom render data payload
    interface CustomRenderParams extends soda.RenderParams {
      annotations: CustomAnnotation[];
    }
    
    // we'll explicitly type our Chart with our CustomRenderParams
    // so that the TypeScript compiler knows what we're intending
    let chart = new soda.Chart<CustomRenderParams>({
      selector: "div#soda-chart",
      zoomable: true,
      resizable: true,
      // we'll write a custom draw() callback to overwrite
      // the default rendering behavior of the Chart
      draw(params) {
        this.addAxis();
        soda.rectangle({
          chart: this,
          annotations: params.annotations,
          // these callbacks will be evaluated for each glyph
          fillColor: (d) => colors(d.a.id),
          fillOpacity: (d) => (100 - d.a.divergence) / 100,
          strokeColor: "none"
        });
      }
    });
    
    fetch("https://sodaviz.org/data/examples/default")
      .then(response => response.json())
      .then(annotations => chart.render({ annotations });


.. raw:: html

    <p class="codepen" data-height="300" data-default-tab="result" data-slug-hash="YzeqZvE" data-preview="true" data-editable="true" data-user="jackroddy" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
      <span>See the Pen <a href="https://codepen.io/jackroddy/pen/YzeqZvE">
      styled rectangles 0.10.1</a> by Jack Roddy (<a href="https://codepen.io/jackroddy">@jackroddy</a>)
      on <a href="https://codepen.io">CodePen</a>.</span>
    </p>
    <script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

----

Dynamic text
^^^^^^^^^^^^

.. code-block:: typescript

    import * as soda from "https://cdn.skypack.dev/@sodaviz/soda@0.11.0";
    import * as d3 from "https://cdn.skypack.dev/d3@7.4.4";
    
    let colors = d3.scaleOrdinal(d3.schemeTableau10);
    
    interface CustomAnnotation extends soda.Annotation {
      family: string;
    }
    
    interface CustomRenderParams extends soda.RenderParams {
      annotations: CustomAnnotation[];
    }
    
    let chart = new soda.Chart<CustomRenderParams>({
      selector: "div#soda-chart",
      rowHeight: 14,
      zoomable: true,
      resizable: true,
      draw(params) {
        this.addAxis();
        soda.rectangle({
          chart: this,
          annotations: params.annotations,
          fillColor: (d) => colors(d.a.id),
          strokeColor: "none"
        });
        // we'll call dynamicText() with the same Annotations
        // that we're using to render the rectangles
        soda.dynamicText({
          chart: this,
          annotations: params.annotations,
          // the dynamic text glyph displays the longest string that will
          // fit into the space it has available in the viewport
          text: (d) => [`${d.a.family} - ${d.a.id}`, d.a.family, "..."]
        });
      }
    });
    
    fetch("https://sodaviz.org/data/examples/default")
      .then((response) => response.json())
      .then((annotations) => chart.render({ annotations }));


.. raw:: html

    <p class="codepen" data-height="300" data-default-tab="result" data-slug-hash="JjpYQmG" data-preview="true" data-editable="true" data-user="jackroddy" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
      <span>See the Pen <a href="https://codepen.io/jackroddy/pen/JjpYQmG">
      text</a> by Jack Roddy (<a href="https://codepen.io/jackroddy">@jackroddy</a>)
      on <a href="https://codepen.io">CodePen</a>.</span>
    </p>
    <script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

----

Interactivity
^^^^^^^^^^^^^

.. code-block:: typescript

    import * as soda from "https://cdn.skypack.dev/@sodaviz/soda@0.11.0";
    import * as d3 from "https://cdn.skypack.dev/d3@7.4.4";
    
    let colors = d3.scaleOrdinal(d3.schemeTableau10);
    
    interface CustomAnnotation extends soda.Annotation {
      family: string;
    }
    
    interface CustomRenderParams extends soda.RenderParams {
      annotations: CustomAnnotation[];
    }
    
    let chart = new soda.Chart<CustomRenderParams>({
      selector: "div#soda-chart",
      rowHeight: 20,
      zoomable: true,
      resizable: true,
      // we'll write a simple draw() callback that
      // gives us colored rectangles
      draw(params) {
        this.addAxis();
        soda.rectangle({
          chart: this,
          annotations: params.annotations,
          fillColor: (d) => colors(d.a.id),
          strokeColor: "none"
        });
      },
      // now we'll write a postRender() callback that
      // applies some interactions to the glyphs
      postRender(params) {
        soda.clickBehavior({
          chart: this,
          annotations: params.annotations,
          // this function is evaluated when a glyph is clicked
          click: (
            // s is a d3 Selection of the glyph in the DOM
            s: d3.Selection<any, any, any, any>,
            // d is the AnnotationDatum bound to the glyph
            d: soda.AnnotationDatum<CustomAnnotation, Chart<CustomRenderParams>>
          ) => alert(`${d.a.id} clicked`)
        });
        soda.hoverBehavior({
          chart: this,
          annotations: params.annotations,
          // this function is evaluated when a glyph is moused over
          mouseover: (s, d) => s.style("stroke", "black"),
          // this function is evaluated when a glyph is no longer moused over
          mouseout: (s, d) => s.style("stroke", "none")
        });
        soda.tooltip({
          chart: this,
          annotations: params.annotations,
          text: (d) => d.a.family
        });
      }
    });
    
    fetch("https://sodaviz.org/data/examples/default")
      .then((response) => response.json())
      .then((annotations) => chart.render({ annotations }));




.. raw:: html

    <p class="codepen" data-height="300" data-default-tab="result" data-slug-hash="QWQNpxP" data-preview="true" data-editable="true" data-user="jackroddy" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
      <span>See the Pen <a href="https://codepen.io/jackroddy/pen/QWQNpxP">
      interactions 0.10.1</a> by Jack Roddy (<a href="https://codepen.io/jackroddy">@jackroddy</a>)
      on <a href="https://codepen.io">CodePen</a>.</span>
    </p>
    <script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

----

Plot annotations
^^^^^^^^^^^^^^^^

.. code-block:: typescript

    import * as soda from "https://cdn.skypack.dev/@sodaviz/soda@0.11.0";
    
    interface CustomRenderParams extends soda.RenderParams {
      annotations: PlotAnnotation[];
    }
    
    let chart = new soda.Chart<CustomRenderParams>({
      selector: "div#soda-chart",
      zoomable: true,
      resizable: true,
      rowHeight: 100,
      draw(params) {
        this.addAxis();
        soda.linePlot({
          chart: this,
          annotations: params.annotations
        });
        soda.verticalAxis({
          chart: this,
          // setting this allows the axes to overflow into
          // the SVG pad, preventing them from clipping
          target: soda.BindTarget.Overflow,
          annotations: params.annotations
        });
      }
    });
    
    fetch("https://sodaviz.org/data/examples/plots")
      .then((response) => response.json())
      .then((annotations) => chart.render({ annotations }));

.. raw:: html

    <p class="codepen" data-height="300" data-default-tab="result" data-slug-hash="qBxZrym" data-preview="true" data-editable="true" data-user="jackroddy" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
      <span>See the Pen <a href="https://codepen.io/jackroddy/pen/qBxZrym">
      plots 0.10.1</a> by Jack Roddy (<a href="https://codepen.io/jackroddy">@jackroddy</a>)
      on <a href="https://codepen.io">CodePen</a>.</span>
    </p>
    <script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>


----

Sequence annotations
^^^^^^^^^^^^^^^^^^^^

.. code-block:: typescript

    import * as soda from "https://cdn.skypack.dev/@sodaviz/soda@0.11.0";
    
    interface CustomRenderParams extends soda.RenderParams {
      annotations: SequenceAnnotation[];
    }
    
    let chart = new soda.Chart<CustomRenderParams>({
      selector: "div#soda-chart",
      zoomable: true,
      resizable: true,
      draw(params) {
        this.addAxis();
        soda.sequence({
          chart: this,
          annotations: params.annotations
        });
      }
    });
    
    fetch("https://sodaviz.org/data/examples/sequence")
      .then((response) => response.json())
      .then((annotations) => chart.render({ annotations }));

.. raw:: html

    <p class="codepen" data-height="300" data-default-tab="result" data-slug-hash="QWQNpBR" data-preview="true" data-editable="true" data-user="jackroddy" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
      <span>See the Pen <a href="https://codepen.io/jackroddy/pen/QWQNpBR">
      sequence 0.10.1</a> by Jack Roddy (<a href="https://codepen.io/jackroddy">@jackroddy</a>)
      on <a href="https://codepen.io">CodePen</a>.</span>
    </p>
    <script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

.. _CodePen: https://codepen.io/
.. _fetch: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
