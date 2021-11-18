.. _tutorial-bed:

Rendering BED data
==================


.. code-block:: typescript

    import * as d3 from 'https://cdn.skypack.dev/d3';

    let chart = new soda.Chart({
      selector: "#soda-chart",
      axis: true,
      zoomable: true,
      inRender: function (this, params): void {
        soda.rectangle({
          chart: this,
          annotations: params.annotations || [],
          strokeColor: "cadetblue"
        })
      }
    });

    let ann: soda.BedAnnotation[] = soda.parseRecordsFromString(
      soda.parseBedRecord,
      bedData
    );

    chart.render({
      annotations: ann
    })

----

.. raw:: html

    <p class="codepen" data-height="300" data-slug-hash="QWMYjJY" data-editable="true" data-user="jackroddy" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
      <span>See the Pen <a href="https://codepen.io/jackroddy/pen/QWMYjJY">
      BED data</a> by Jack Roddy (<a href="https://codepen.io/jackroddy">@jackroddy</a>)
      on <a href="https://codepen.io">CodePen</a>.</span>
    </p>
    <script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>
