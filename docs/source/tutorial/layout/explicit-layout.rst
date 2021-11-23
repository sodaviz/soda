.. _tutorial-explicit-layout:

Explicitly calling a SODA layout function
=========================================

We can also explicitly call one of SODA's layout functions on a list of Annotations.

.. code-block:: typescript

    let ann: Soda.Annotation = soda.generateAnnotations({
      n: 100,
      generationPattern: soda.GenerationPattern.Random
    })

    // this applies a layout directly to the Annotation
    // objects by modifying their row properties
    soda.intervalGraphLayout(ann);

----

.. raw:: html

    <p class="codepen" data-height="300" data-slug-hash="bGrywZQ" data-editable="true" data-user="jackroddy" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
      <span>See the Pen <a href="https://codepen.io/jackroddy/pen/bGrywZQ">
      SODA explicitly calling a layout function</a> by Jack Roddy (<a href="https://codepen.io/jackroddy">@jackroddy</a>)
      on <a href="https://codepen.io">CodePen</a>.</span>
    </p>
    <script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>
