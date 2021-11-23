.. _tutorial-comparing-layouts:

Comparing SODA layout functions
===============================

Currently, SODA has three layout functions, each of which will produce a layout with slightly different properties:

    - :ref:`intervalGraphLayout`
    - :ref:`greedyGraphLayout`
    - :ref:`heuristicGraphLayout`

----

The following CodePen examples show the application of each layout function on some random Annotations.

Interval layout
---------------

This uses an optimal interval scheduling algorithm, and it tends to look neat and orderly.

.. raw:: html

    <p class="codepen" data-height="300" data-slug-hash="eYEadom" data-editable="true" data-user="jackroddy" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
      <span>See the Pen <a href="https://codepen.io/jackroddy/pen/eYEadom">
      SODA comparing layout functions</a> by Jack Roddy (<a href="https://codepen.io/jackroddy">@jackroddy</a>)
      on <a href="https://codepen.io">CodePen</a>.</span>
    </p>
    <script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>
    <br/>


Greedy layout
-------------

This uses a greedy graph coloring algorithm, and it will tend to place larger annotations towards the top.

.. raw:: html

    <p class="codepen" data-height="300" data-slug-hash="dyzEOdK" data-editable="true" data-user="jackroddy" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
      <span>See the Pen <a href="https://codepen.io/jackroddy/pen/dyzEOdK">
      SODA greedy layout example</a> by Jack Roddy (<a href="https://codepen.io/jackroddy">@jackroddy</a>)
      on <a href="https://codepen.io">CodePen</a>.</span>
    </p>
    <script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>
    <br/>

Heuristic layout
----------------

This uses a heuristic graph coloring algorithm, and it tends to look somewhat random.

.. raw:: html

    <p class="codepen" data-height="300" data-slug-hash="BadeQYg" data-editable="true" data-user="jackroddy" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
      <span>See the Pen <a href="https://codepen.io/jackroddy/pen/BadeQYg">
      SODA greedy layout example</a> by Jack Roddy (<a href="https://codepen.io/jackroddy">@jackroddy</a>)
      on <a href="https://codepen.io">CodePen</a>.</span>
    </p>
    <script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>
