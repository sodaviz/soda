.. _tutorial-chevron-lines:

Chevron lines
=============

We can also render Annotations as lines with chevron arrows on them.

.. code-block:: typescript

    let orientations = [soda.Orientation.Forward, soda.Orientation.Reverse]

    let chart = new soda.Chart({
      selector: "#soda-chart",
      axis: true,
      zoomable: true,
      inRender: function (this, params): void {
        soda.chevronLine({
          chart: this,
          annotations: params.annotations || [],
          chevronSpacing: 10,
          strokeColor: 'cadetblue',
          chevronStrokeColor: 'cadetblue',
          orientation: (d) => orientations[d.a.y % 2]
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

    <p class="codepen" data-height="300" data-slug-hash="ZEJVemJ" data-editable="true" data-user="jackroddy" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
      <span>See the Pen <a href="https://codepen.io/jackroddy/pen/ZEJVemJ">
      Different glyphs - chevron lines</a> by Jack Roddy (<a href="https://codepen.io/jackroddy">@jackroddy</a>)
      on <a href="https://codepen.io">CodePen</a>.</span>
    </p>
    <script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>
