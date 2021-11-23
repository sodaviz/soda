.. _tutorial-tooltips:

Tooltips
========

Toolips can be bound to glyphs using the :ref:`tooltip` function.
The tooltip function takes a :ref:`TooltipConfig` as an argument.

.. code-block:: typescript

    let chart = new soda.Chart({
      selector: "#soda-chart",
      axis: true,
      zoomable: true,
        inRender: function (this, params): void {
        soda.rectangle({
          chart: this,
          annotations: params.annotations || []
        })

        soda.tooltip({
          annotations: params.annotations,
          text: (d) => d.a.id
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

    <p class="codepen" data-height="300" data-slug-hash="OJjdMJB" data-editable="true" data-user="jackroddy" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
      <span>See the Pen <a href="https://codepen.io/jackroddy/pen/OJjdMJB">
      SODA tooltips</a> by Jack Roddy (<a href="https://codepen.io/jackroddy">@jackroddy</a>)
      on <a href="https://codepen.io">CodePen</a>.</span>
    </p>
    <script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>
