.. _tutorial-click-behaviors:

Click behaviors
===============

Once glyphs have been rendered in a :ref:`Chart`, you can bind arbitrary click behaviors to them using the :ref:`clickBehavior` function.
In this example, we'll set up a click behavior that calls the browser's alert() function when a glyph is clicked.

To start off, let's first instantiate a Chart and render some glyphs:

.. code-block:: typescript

    let chart = new soda.Chart({
      selector: "#soda-chart",
      axis: true,
      zoomable: true,
    });

    let ann: Soda.Annotation = soda.generateAnnotations({
      n: 10
    })

    chart.render({
      annotations: ann
    })

Now, we'll make a call to the clickBehavior function, which takes a :ref:`ClickConfig` object as an argument.
All we need to do is supply a list of Annotations and a callback function that will be executed when a glyph is clicked.
The callback function receives as arguments a reference to a D3 Selection to the glyph that was clicked and the :ref:`AnnotationDatum` bound to that glyph.

.. code-block:: typescript

    // explicit type parameters added for clarity
    soda.clickBehavior<soda.Annotation, soda.Chart>({
      annotations: ann
      click: (
        // we're usually not too concerned about how the D3 Selection is typed
        s: d3.Selection<any, any, any, any>,
        // explicit type parameters added for clarity
        d: AnnotationDatum<soda.Annotation, soda.Chart<any>>
       ) => {
        alert(`${d.a.id} clicked`)
      }
    })

Finally, here's a full example that omits explicit type parameters and performs the call to clickBehavior in an inRender override:

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
