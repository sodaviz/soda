.. _tutorial-row-stripes:

Enabling row stripes
====================

The rows in a Chart can optionally be striped with alternating colors. To enable this, set the rowStripes property to
true on the ChartConfig.

.. code-block:: typescript

    let chart = new soda.Chart({
      selector: "#soda-chart",
      axis: true,
      zoomable: true,
      resizable: true,
      rowStripes: true
    });

    let ann: Soda.Annotation = soda.generateAnnotations({
      n: 10
    })

    chart.render({
      annotations: ann
    })


----

.. raw:: html

    <p class="codepen" data-height="300" data-slug-hash="jOLQYbW" data-editable="true" data-user="jackroddy" style="height: 300px; box-sizing: border-box; display: flex; align-items: center;     justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
      <span>See the Pen <a href="https://codepen.io/jackroddy/pen/jOLQYbW">
      Enabling row stripes on a Chart</a> by Jack Roddy (<a href="https://codepen.io/jackroddy">@jackroddy</a>)
      on <a href="https://codepen.io">CodePen</a>.</span>
    </p>
    <script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>
