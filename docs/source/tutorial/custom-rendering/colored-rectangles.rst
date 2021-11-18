.. _tutorial-colored-rectangles:

Overriding the default Chart rendering routine - colored rectangles
===================================================================

To change the way a Chart renders annotations, we need to override the default rendering routine by providing a callback function that will be assigned to the Chart's inRender property.
The callback function has two parameters:
    - this: a reference to the Chart itself
    - params: a reference to the :ref:`RenderParams` argument when render() is called

In the canonical SODA pattern, the inRender callback should be responsible for making calls to SODA's glyph rendering API.

For example, the default Chart inRender callback is defined as:

.. code-block:: typescript

    let defaultInRender = function (
      this: soda.Chart<any>,
      params: soda.RenderParams
    ): void {
      soda.rectangle({
        chart: this,
        annotations: params.annotations || [],
      })
    }

If we wanted to change the colors of our rectangles, we might define something like:

.. code-block:: typescript

    let customInRender = function (this, params): void {
      soda.rectangle({
        chart: this,
        annotations: params.annotations || [],
        fillColor: "cadetblue",
        strokeColor: "cadetblue",
      })
    }

We can supply the callback on the :ref:`ChartConfig`:

.. code-block:: typescript

    let chart = new soda.Chart({
      selector: "#soda-chart",
      inRender: customInRender
    });

Alternatively, we can set the Chart's inRender property after instantiation:

.. code-block:: typescript

    let chart = new soda.Chart({
      selector: "#soda-chart"
    });

    chart.inRender = customInRender

Finally, here's a full example that anonymously defines the inRender callback in the ChartConfig:

.. code-block:: typescript

    let chart = new soda.Chart({
      selector: "#soda-chart",
      axis: true,
      zoomable: true,
      inRender: function (this, params): void {
        soda.rectangle({
          chart: this,
          annotations: params.annotations || [],
          fillColor: "cadetblue",
          strokeColor: "cadetblue",
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

    <p class="codepen" data-height="300" data-slug-hash="xxLmqKr" data-editable="true" data-user="jackroddy" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
    <span>See the Pen <a href="https://codepen.io/jackroddy/pen/xxLmqKr">
    Colored rectangles</a> by Jack Roddy (<a href="https://codepen.io/jackroddy">@jackroddy</a>)
    on <a href="https://codepen.io">CodePen</a>.</span>
    </p>
    <script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>
