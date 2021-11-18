.. _tutorial-axis:

Adding an axis
==============

When instantiated with a ChartConfig that has the axis property set to true, a Chart will render a horizontal axis above
the Chart. The axis will be placed in the Chart's overflow viewport. This allows it to be rendered in the pad above the
Chart's first row. If you want to place a non-default axis in your chart, check out the tutorial on
:ref:`axis glyphs<axis-glyphs>`.

.. code-block:: typescript

    let chart = new soda.Chart({
      selector: "#soda-chart",
      axis: true
    });

    let ann: Soda.Annotation = soda.generateAnnotations({
      n: 10
    })

    chart.render({
      annotations: ann
    })

----

.. raw:: html

    <p class="codepen" data-height="300" data-slug-hash="wvqQpaw" data-editable="true" data-user="jackroddy" style="height: 300px; box-sizing: border-box; display: flex; align-items: center;     justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
      <span>See the Pen <a href="https://codepen.io/jackroddy/pen/wvqQpaw">
      Adding an axis to a Chart</a> by Jack Roddy (<a href="https://codepen.io/jackroddy">@jackroddy</a>)
      on <a href="https://codepen.io">CodePen</a>.</span>
    </p>
    <script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>
