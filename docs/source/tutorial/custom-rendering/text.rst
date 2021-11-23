.. _tutorial-text:

Text
====

We can also render Annotations as text.
This is a little more complicated because we have to define a callback function that returns a list of text.

.. code-block:: typescript

    let colors = ['cadetblue', '#9581a9']

    let chart = new soda.Chart({
      selector: "#soda-chart",
      axis: true,
      zoomable: true,
      rowHeight: 18,
      inRender: function (this, params): void {
        soda.text({
          chart: this,
          annotations: params.annotations || [],
          textFn: (a) => {
            return [
              `${a.id}: ${a.start} - ${a.end} | ${a.row}`,
              `${a.id}: ${a.start} - ${a.end}`,
              `${a.id}`,
              "...",
            ];
          },
          fillColor: (d) => colors[d.a.row % 2],
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

    <p class="codepen" data-height="300" data-slug-hash="YzxdZxR" data-editable="true" data-user="jackroddy" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
    <span>See the Pen <a href="https://codepen.io/jackroddy/pen/YzxdZxR">
    Different glyphs - text</a> by Jack Roddy (<a href="https://codepen.io/jackroddy">@jackroddy</a>)
    on <a href="https://codepen.io">CodePen</a>.</span>
    </p>
    <script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>
