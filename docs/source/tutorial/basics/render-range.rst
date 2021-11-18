.. _tutorial-render-range:

Setting an explicit render range
================================

When a Chart's render() method is called, the initial render range can be specified in the RenderParams using the start
and end properties.

.. code-block:: typescript

    let chart = new soda.Chart({
      selector: "#soda-chart",
      axis: true,
      zoomable: true,
      resizable: true,
    });

    let ann: Soda.Annotation = soda.generateAnnotations({
      n: 10
    })

    chart.render({
      annotations: ann,
      start: 0,
      end: 2000,
    })

----

.. raw:: html

    <p class="codepen" data-height="300" data-slug-hash="ExvOoVw" data-editable="true" data-user="jackroddy" style="height: 300px; box-sizing: border-box; display: flex; align-items: center;     justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
      <span>See the Pen <a href="https://codepen.io/jackroddy/pen/ExvOoVw">
      Setting an explicit render range on a Chart</a> by Jack Roddy (<a href="https://codepen.io/jackroddy">@jackroddy</a>)
      on <a href="https://codepen.io">CodePen</a>.</span>
    </p>
    <script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

