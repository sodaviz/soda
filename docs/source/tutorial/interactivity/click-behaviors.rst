.. _tutorial-click-behaviors:

Click behaviors
===============

Click behaviors can be bound to glyphs using the :ref:`clickBehavior` function.
The clickBehavior function takes a :ref:`ClickConfig` as an argument.

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

        soda.clickBehavior({
          annotations: params.annotations,
          click: (s, d) => {
            alert(`${d.a.id} clicked`)
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

    <p class="codepen" data-height="300" data-slug-hash="abyXdbB" data-editable="true" data-user="jackroddy" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
      <span>See the Pen <a href="https://codepen.io/jackroddy/pen/abyXdbB">
      SODA click behaviors</a> by Jack Roddy (<a href="https://codepen.io/jackroddy">@jackroddy</a>)
      on <a href="https://codepen.io">CodePen</a>.</span>
    </p>
    <script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>
