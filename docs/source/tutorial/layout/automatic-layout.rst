.. _tutorial-automatic-layout:

Automatic layout
================

In all of the examples in the tutorial, we've been getting some toy annotation data using the :ref:`generateAnnotations` function, which by default returns a list of Annotations uniformly distributed in a preconfigured layout.
Here, we'll provide a :ref:`GenerationPattern`.Random argument, which will give us randomly distributed Annotations with a row property of 0.

.. code-block:: typescript

    let ann: Soda.Annotation = soda.generateAnnotations({
      n: 100,
      generationPattern: soda.GenerationPattern.Random
    })

If we were to render these annotations, they would all be stacked on top of each other in the first row:

.. raw:: html

    <p class="codepen" data-height="300" data-slug-hash="eYEadjO" data-editable="true" data-user="jackroddy" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
      <span>See the Pen <a href="https://codepen.io/jackroddy/pen/eYEadjO">
      SODA automatic layout</a> by Jack Roddy (<a href="https://codepen.io/jackroddy">@jackroddy</a>)
      on <a href="https://codepen.io">CodePen</a>.</span>
    </p>
    <script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

----

If we don't have a preconfigured layout, a :ref:`Chart` can be configured to automatically calculate one for us.
By setting the autoLayout property to true on our :ref:`RenderParams`, the annotations provided will be laid out in a condense, non-overlapping pattern.

.. code-block:: typescript

    let chart = new soda.Chart({
      selector: "#soda-chart",
      axis: true,
      zoomable: true
    });

    let ann: Soda.Annotation = soda.generateAnnotations({
      n: 100,
      generationPattern: soda.GenerationPattern.Random
    })

    chart.render({
      annotations: ann,
      autoLayout: true
    })

.. raw:: html

    <p class="codepen" data-height="300" data-slug-hash="Vwzgvor" data-editable="true" data-user="jackroddy" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
      <span>See the Pen <a href="https://codepen.io/jackroddy/pen/Vwzgvor">
      SODA automatic layout</a> by Jack Roddy (<a href="https://codepen.io/jackroddy">@jackroddy</a>)
      on <a href="https://codepen.io">CodePen</a>.</span>
    </p>
    <script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>
