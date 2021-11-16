Creating a Chart
----------------

:ref:`Charts<Chart>` are instantiated with a :ref:`ChartConfig` argument. Every property in a ChartConfig is optional,
but you'll probably want to at least provide a selector. The selector is a string that is used as a CSS selector to
locate the DOM element that the Chart will be inserted into during instantiation.

Here, we'll assume our page has a div with the id "soda-chart," and we'll instantiate a Chart that will be inserted
into that div.

.. code-block:: typescript

    let chart = new soda.Chart({
      selector: "#soda-chart",
    });

Running this code will indeed create a Chart in the selected div, but it will be completely blank. We'll see how to
start to add visual content to a Chart in the next section.

Live demo
+++++++++

.. raw:: html

    <p class="codepen" data-height="300" data-slug-hash="rNzWWdK" data-editable="true" data-user="jackroddy" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
      <span>See the Pen <a href="https://codepen.io/jackroddy/pen/rNzWWdK">
      Creating a Chart</a> by Jack Roddy (<a href="https://codepen.io/jackroddy">@jackroddy</a>)
      on <a href="https://codepen.io">CodePen</a>.</span>
    </p>
    <script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>
    <br/>
