.. _tutorial-resizing:

Enabling resizing
=================

Charts can be configured to automatically resize themselves to fit into their DOM container. To enable resizing, set the
resizable property to true in the ChartConfig.

.. code-block:: typescript

    let chart = new soda.Chart({
      selector: "#soda-chart",
      axis: true,
      zoomable: true,
      resizable: true
    });

    let ann: Soda.Annotation = soda.generateAnnotations({
      n: 10
    })

    chart.render({
      annotations: ann
    })


----

.. note::

    To see resizing in action here, you'll want to view this example in CodePen or press the 0.5x or 0.25x button in
    the embed.

.. raw:: html

    <p class="codepen" data-height="300" data-slug-hash="VwzVyLG" data-editable="true" data-user="jackroddy" style="height: 300px; box-sizing: border-box; display: flex; align-items: center;     justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
      <span>See the Pen <a href="https://codepen.io/jackroddy/pen/VwzVyLG">
      Enabling resize on a Chart</a> by Jack Roddy (<a href="https://codepen.io/jackroddy">@jackroddy</a>)
      on <a href="https://codepen.io">CodePen</a>.</span>
    </p>
    <script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>
