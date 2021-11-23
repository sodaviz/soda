.. _tutorial-rendering-annotations:

Rendering Annotations
=====================

Once a Chart has been instantiated, we can render :ref:`Annotation objects<Annotation>` in it by calling the render()
method. Render() takes a :ref:`RenderParams` object as an argument.

To render glyphs in a Chart, we'll first need to instantiate a list of Annotation objects. We'll cover the creation of
meaningful Annotation objects later in the tutorial, but for now we'll use the
:ref:`generateAnnotations utility function<generateAnnotations>` to easily get some Annotation objects to play around
with. Once we have the Annotations, we'll call render with them in an anonymously defined RenderParams object. By
default, a Chart will render the Annotations its given as rectangles. Again, we'll go into more detail on defining
customized render behaviors later in the tutorial.

.. code-block:: typescript

    let chart = new soda.Chart({
      selector: "#soda-chart"
    });

    let ann = soda.generateAnnotations({
      n: 10
    })

    chart.render({
      annotations: ann
    })

----

.. raw:: html

    <p class="codepen" data-height="300" data-slug-hash="zYdMpxd" data-editable="true" data-user="jackroddy" style="height: 300px; box-sizing: border-box; display: flex; align-items: center justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
      <span>See the Pen <a href="https://codepen.io/jackroddy/pen/zYdMpxd">
      Rendering annotations in a Chart</a> by Jack Roddy (<a href="https://codepen.io/jackroddy">@jackroddy</a>)
      on <a href="https://codepen.io">CodePen</a>.</span>
    </p>
    <script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>
