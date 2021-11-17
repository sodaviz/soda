.. _tutorial-zooming:

Enabling zooming
================

Charts can optionally be configured to enable realtime zooming and panning. To do this, set the zoomable property to
true on the ChartConfig. A Chart can be panned by clicking and dragging or zoomed with ctrl + scrolling.

.. code-block:: typescript

    let chart = new soda.Chart({
      selector: "#soda-chart",
      axis: true,
      zoomable: true
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

    <p class="codepen" data-height="300" data-slug-hash="yLoQpNa" data-editable="true" data-user="jackroddy" style="height: 300px; box-sizing: border-box; display: flex; align-items: center;     justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
      <span>See the Pen <a href="https://codepen.io/jackroddy/pen/yLoQpNa">
      Enabling zoom on a Chart</a> by Jack Roddy (<a href="https://codepen.io/jackroddy">@jackroddy</a>)
      on <a href="https://codepen.io">CodePen</a>.</span>
    </p>
    <script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>
