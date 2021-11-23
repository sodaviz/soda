.. _tutorial-external-layout:

Externally defining a layout
============================

If you don't want to use a SODA layout function, you're free to define a layout by adjusting the row properties of your :ref:`Annotation` objects.

For example, if we wanted to force every glyph into its own row, we might do something like this:

.. code-block:: typescript

    let ann: Soda.Annotation = soda.generateAnnotations({
      n: 100,
    })

    let row = 0;
    for (const a of ann) {
      a.row = row++;
    }

----

.. raw:: html

    <p class="codepen" data-height="300" data-slug-hash="MWvdjdW" data-editable="true" data-user="jackroddy" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
      <span>See the Pen <a href="https://codepen.io/jackroddy/pen/MWvdjdW">
      SODA externally defining a layout</a> by Jack Roddy (<a href="https://codepen.io/jackroddy">@jackroddy</a>)
      on <a href="https://codepen.io">CodePen</a>.</span>
    </p>
    <script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>
