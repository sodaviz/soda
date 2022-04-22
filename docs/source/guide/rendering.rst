.. _guide_rendering:

Rendering
=========

SODA's rendering API takes :ref:`Annotation` objects and represents them as SVG glyphs inside of :ref:`Chart` viewports in the DOM.
This section explains the ins and out of that process.

Glyph rendering functions
#########################

To render glyphs, you simply make a call to a glyph rendering function with an appropriate :ref:`GlyphConfig` object.
The properties on the config object describe which Annotation objects to use, where to render the glyphs, and how to style the glyphs.
Each glyph rendering function has a corresponding config defined by an interface.
For example, a simple call to the :ref:`rectangle` function with a minimally specified :ref:`RectangleConfig` may look like:

.. code-block:: typescript

    rectangle({
        chart: chart,             // "chart" is a Chart object
        annotations: annotations, // "annotations" is an array of Annotation objects
    });

Glyph selectors
+++++++++++++++

The *selector* property in a :ref:`GlyphConfig` is a string used to help differentiate between distinct collections of glyphs that have been rendered using the same set of Annotation objects in the same Chart.
SODA applies the selector as a CSS class on the DOM elements that make up the glyphs.

The selector property also allows a nuanced feature: if you use the same selector string in a subsequent call to a glyph rendering function with a 

Glyph properties
++++++++++++++++

The properties in a GlyphConfig that control glyph styling are typed as :ref:`GlyphProperty`, which is simply an alias of the type union of a static value and a :ref:`GlyphCallback`.
A GlyphCallback is another type alias for a simple callback function that takes an :ref:`AnnotationDatum` as the sole argument and returns a value.

The canonical rendering pattern
###############################

Default rendering routine
+++++++++++++++++++++++++

Customizing the rendering routine
++++++++++++++++++++++++++++++++++


Vertical layout
###############

Glyph mapping
#############

Internally, SODA maps Annotation objects to the glyphs that they have been used to render.
Specifically, keys are built using the *id* property of the Annotation object, the *selector* used in the rendering call, and the *id* property of the target Chart.
The mapping information can be accessed with the :ref:`queryGlyphMap` function, which returns D3 selections of the DOM elements that make up the glyphs.
You can optionally specify any number of the components of the keys to build a query, effectively changing the granularity of the search.

Calls to the *queryGlyphMap* function may look like:

.. code-block:: typescript

    // this will return a single glyph
    let specificGlyph = queryGlyphMap({
        id: "ann-1",
        chart: chart,
        selector: "gene-rectangles",
    })
    
    // this will return all of the glyphs in "chart"
    // rendered with the selector: "gene-rectangles"
    let rectanglesInChart = queryGlyphMap({
        chart: chart,
        selector: "gene-rectangles"
    })

    // this will return all of the glyphs in every Chart
    // rendered with the selector: "gene-rectangles"
    let allRectangles = queryGlyphMap({
        selector: "gene-rectangles"
    })

    // this will return all of the glyphs in "chart"
    let allInChart = queryGlyphMap({
        chart: chart,
    })

    // this will return every glyph in every Chart
    let allGlyphs = queryGlyphMap({})

Glyph modifiers
###############
