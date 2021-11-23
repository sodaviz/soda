.. _tutorial-zoom-sync:

Syncing the zoom level across multiple charts
=============================================

In this example, we'll build a multi-chart visualization that acts more like a set of "tracks" in a genome browser, where each Chart has a synchronized zoom level.

We'll start off by instantiating a couple of Charts:

.. code-block:: typescript

    let chart = new soda.Chart({
      selector: "#soda-chart",
      axis: true,
      zoomable: true
    });

    // we'll leave the axis off of this one
    let chart2 = new soda.Chart({
      zoomable: true,
      inRender: function(this, params): void {
        soda.rectangle({
          chart: this,
          annotations: params.annotations || [],
          fillColor: "cadetblue"
        })
      }
    });

Now we'll create a :ref:`ZoomSyncer` object and add the Charts to it.
After we've done this, the Charts will have synchronized zooming and panning.

.. code-block:: typescript

    let zoomSyncer = new soda.ZoomSyncer();
    zoomSyncer.add([chart, chart2]);

Finally we can render some glyphs as usual:

.. code-block:: typescript

    let ann: Soda.Annotation = soda.generateAnnotations({
      n: 10
    })

    chart.render({
      annotations: ann
    })

    chart2.render({
      annotations: ann
    })

----

.. raw:: html

    <p class="codepen" data-height="300" data-slug-hash="RwZmGxg" data-editable="true" data-user="jackroddy" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
      <span>See the Pen <a href="https://codepen.io/jackroddy/pen/RwZmGxg">
      SODA zoom sync</a> by Jack Roddy (<a href="https://codepen.io/jackroddy">@jackroddy</a>)
      on <a href="https://codepen.io">CodePen</a>.</span>
    </p>
    <script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>
