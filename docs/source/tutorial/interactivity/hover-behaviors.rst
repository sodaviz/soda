.. _tutorial-hover-behaviors:

Hover behaviors
===============

Hover behaviors can be bound to glyphs using the :ref:`hoverBehavior` function.
The hoverBehavior function takes a :ref:`HoverConfig` as an argument.

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

        soda.hoverBehavior({
          annotations: params.annotations,
          mouseover: (s, d) => {
            s.style("fill", "cadetblue")
          },
          mouseout: (s, d) => {
            s.style("fill", "black")
          }
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

    <p class="codepen" data-height="300" data-slug-hash="GRvzoRG" data-editable="true" data-user="jackroddy" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
      <span>See the Pen <a href="https://codepen.io/jackroddy/pen/GRvzoRG">
      SODA hover behaviors</a> by Jack Roddy (<a href="https://codepen.io/jackroddy">@jackroddy</a>)
      on <a href="https://codepen.io">CodePen</a>.</span>
    </p>
    <script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>
