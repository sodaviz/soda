.. _tutorial-multiple-charts:

Multiple charts rendering the same Annotations
==============================================

You may find yourself wanting to build a visualization with multiple Chart components.

In this simple example, we will create two Charts that will render the same data slightly differently.

.. code-block:: typescript

    let chart = new soda.Chart({
      selector: "#soda-chart",
      axis: true,
      zoomable: true
    });

    let chart2 = new soda.Chart({
      selector: "#soda-chart2",
      axis: true,
      zoomable: true,
      inRender: function(this, params): void {
        soda.rectangle({
          chart: this,
          annotations: params.annotations || [],
          fillColor: "cadetblue"
        })
      }
    });

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

    <p class="codepen" data-height="300" data-slug-hash="PoKvGOE" data-editable="true" data-user="jackroddy" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
      <span>See the Pen <a href="https://codepen.io/jackroddy/pen/PoKvGOE">
      SODA multiple charts same data</a> by Jack Roddy (<a href="https://codepen.io/jackroddy">@jackroddy</a>)
      on <a href="https://codepen.io">CodePen</a>.</span>
    </p>
    <script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>
