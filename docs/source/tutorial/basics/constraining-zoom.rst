.. _tutorial-constraining-zoom:

Constraining the zoom level
===========================

The zoom level on a Chart that has zooming enabled can be constrained using the scaleExtent property on the ChartConfig.
The scaleExtent property is a tuple of numbers of the form [min :sub:`k`, max :sub:`k`], where min :sub:`k` controls how
far a Chart can be zoomed out and max :sub:`k` controls how far a Chart can be zoomed in.

.. code-block:: typescript

    let chart = new soda.Chart({
      selector: "#soda-chart",
      axis: true,
      zoomable: true,
      scaleExtent: [0.5, 10]
    });

    let ann: Soda.Annotation = soda.generateAnnotations({
      n: 10
    })

    chart.render({
      annotations: ann
    })


Live demo
---------

.. raw:: html

    <p class="codepen" data-height="300" data-slug-hash="VwzVyKV" data-editable="true" data-user="jackroddy" style="height: 300px; box-sizing: border-box; display: flex; align-items: center;     justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
      <span>See the Pen <a href="https://codepen.io/jackroddy/pen/VwzVyKV">
      Constraining the zooming on a Chart</a> by Jack Roddy (<a href="https://codepen.io/jackroddy">@jackroddy</a>)
      on <a href="https://codepen.io">CodePen</a>.</span>
    </p>
    <script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>
