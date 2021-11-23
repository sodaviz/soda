.. _exporting-images:

Exporting images
================

In this example, we'll see how to export the current visual content of a Chart as a PNG image.

To start off, let's first instantiate a Chart and render some glyphs:

.. code-block:: typescript

    let chart = new soda.Chart({
      selector: "#soda-chart",
      axis: true,
      zoomable: true
    });

    let ann: Soda.Annotation = soda.generateAnnotations({
      n: 10
    })

    chart.render({
      annotations: ann
    })

Once we have a Chart rendered the way we want it, we simply have to call the :ref:`exportPng` function, which takes an :ref:`ExportConfig` object as an argument.

.. code-block:: typescript

    // when this function is called, the PNG
    // will start to download in your browser
    soda.exportPng({
      chart: chart,
      filename: "soda-chart.png"
    })

Instead, you may want to bind the download function to a button on your page.
To accomplish that, you might write something like:

.. code-block:: typescript

    // this assumes the DOM has a button with the id "save-image"
    // we'll need to wrap the call to exportPng() in an anonymous
    // function so we can pass the appropriate arguments
    document.getElementById("save-image").onclick = () => soda.exportPng({
      chart: chart,
      filename: "soda-chart.png"
    });


----

.. raw:: html

    <p class="codepen" data-height="300" data-slug-hash="OJjYRxQ" data-editable="true" data-user="jackroddy" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
      <span>See the Pen <a href="https://codepen.io/jackroddy/pen/OJjYRxQ">
      SODA export png</a> by Jack Roddy (<a href="https://codepen.io/jackroddy">@jackroddy</a>)
      on <a href="https://codepen.io">CodePen</a>.</span>
    </p>
    <script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>
