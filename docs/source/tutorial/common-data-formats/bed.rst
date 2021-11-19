.. _tutorial-bed:

Rendering BED data
==================

The `BED format`_  is one of the annotation data formats that has become a de facto standard in Bioinformatics.
SODA supports parsing BED records as strings into extensions of the :ref:`Annotation object<Annotation>`.

.. note::

    There are a handful of BED specifications, and SODA has several corresponding parsing functions and Annotation objects.
    Simply put, the number after the word "Bed" describes the number of fields in the corresponding BED records/objects.
    The final pair listed here is for generic BED parsing, in which the first 3 fields are required and the last 9 are optional.

**SODA's BED parsing functions and their return types:**

- :ref:`parseBed3Record` -> :ref:`Bed3Annotation`
- :ref:`parseBed6Record` -> :ref:`Bed6Annotation`
- :ref:`parseBed9Record` -> :ref:`Bed9Annotation`
- :ref:`parseBed12Record` -> :ref:`Bed12Annotation`
- :ref:`parseBedRecord` -> :ref:`BedAnnotation`

----

In this example, we'll render some toy BED9 data.

To make our lives a little easier and keep the TypeScript compiler happy, we'll first define an extension of the :ref:`RenderParams` interface.
The key here is that we are overriding the type of the annotations property with Bed9Annotation[], which will propagate through the inner workings of SODA up to where we might define an override to a rendering function.

.. code-block:: typescript

    interface BedExampleRenderParams extends soda.RenderParams {
      annotations: soda.Bed9Annotation[]
    }

Now, let's instantiate a Chart, but this time we'll explicitly supply our extended BedExampleRenderParams as a type parameter.

.. code-block:: typescript

    // Chart has a type parameter defined as P extends RenderParams
    let chart = new soda.Chart<BedExampleRenderParams>({
      selector: "#soda-chart",
      axis: true,
      zoomable: true,
      inRender: function (
        // explicit types for clarity here, but the compiler should actually
        // be able to infer these types automatically
        this: Chart<BedExampleRenderParams>,
        params: BedExampleRenderParams
      ): void {
        soda.rectangle({
          chart: this,
          annotations: params.annotations,
          // the TypeScript compiler won't complain about us using the itemRgb
          // property because of the type argument we supplied above
          fillColor: (d) => `rgb(${d.a.itemRgb})`,
          strokeColor: "black"
        })
      }
    });

Now that our Chart is configured to render our BED data, let's get some data for it to render.
Here, we'll just define a string inline that holds some BED records, parse it into Annotation objects, and render it.

.. code-block:: typescript

    // these BED data are from a toy example at https://genome.ucsc.edu/FAQ/FAQformat.html#format1
    let bedData = `
    chr7    127471196  127472363  Pos1  0  +  127471196  127472363  255,0,0
    chr7    127472363  127473530  Pos2  0  +  127472363  127473530  255,0,0
    chr7    127473530  127474697  Pos3  0  +  127473530  127474697  255,0,0
    chr7    127474697  127475864  Pos4  0  +  127474697  127475864  255,0,0
    chr7    127475864  127477031  Neg1  0  -  127475864  127477031  0,0,255
    chr7    127477031  127478198  Neg2  0  -  127477031  127478198  0,0,255
    chr7    127478198  127479365  Neg3  0  -  127478198  127479365  0,0,255
    chr7    127479365  127480532  Pos5  0  +  127479365  127480532  255,0,0
    chr7    127480532  127481699  Neg4  0  -  127480532  127481699  0,0,255
    `

    let ann: soda.Bed9Annotation[] = soda.parseRecordsFromString(
      soda.parseBed9Record,
      bedData
    );

    chart.render({
      annotations: ann
    })

----

Finally, here's a full example that omits explicit type annotations to be a bit more concise:

.. code-block:: typescript

    interface BedExampleRenderParams extends soda.RenderParams {
      annotations: soda.Bed9Annotation[]
    }

    let chart = new soda.Chart<BedExampleRenderParams>({
      selector: "#soda-chart",
      axis: true,
      zoomable: true,
      inRender: function (this, params): void {
        soda.rectangle({
          chart: this,
          annotations: params.annotations,
          fillColor: (d) => `rgb(${d.a.itemRgb})`,
          strokeColor: "black"
        })
      }
    });

    // these BED data are from a toy example at https://genome.ucsc.edu/FAQ/FAQformat.html#format1
    let bedData = `
    chr7    127471196  127472363  Pos1  0  +  127471196  127472363  255,0,0
    chr7    127472363  127473530  Pos2  0  +  127472363  127473530  255,0,0
    chr7    127473530  127474697  Pos3  0  +  127473530  127474697  255,0,0
    chr7    127474697  127475864  Pos4  0  +  127474697  127475864  255,0,0
    chr7    127475864  127477031  Neg1  0  -  127475864  127477031  0,0,255
    chr7    127477031  127478198  Neg2  0  -  127477031  127478198  0,0,255
    chr7    127478198  127479365  Neg3  0  -  127478198  127479365  0,0,255
    chr7    127479365  127480532  Pos5  0  +  127479365  127480532  255,0,0
    chr7    127480532  127481699  Neg4  0  -  127480532  127481699  0,0,255
    `

    let ann = soda.parseRecordsFromString(
      soda.parseBed9Record,
      bedData
    );

    chart.render({
      annotations: ann
    })

----

.. raw:: html

    <p class="codepen" data-height="300" data-slug-hash="QWMYjJY" data-editable="true" data-user="jackroddy" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
      <span>See the Pen <a href="https://codepen.io/jackroddy/pen/QWMYjJY">
      BED data</a> by Jack Roddy (<a href="https://codepen.io/jackroddy">@jackroddy</a>)
      on <a href="https://codepen.io">CodePen</a>.</span>
    </p>
    <script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>


.. _BED format: https://genome.ucsc.edu/FAQ/FAQformat.html#format1
