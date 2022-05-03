.. _guide_annotations:

Annotations
===========

Developing with SODA revolves around rendering glyphs using Annotation objects, which are the data structures used by SODA to represent annotation data.
Typically, the first thing you'll want to do when building a SODA visualization is to figure out how you're going to load your data into objects that conform to SODA's expectations.
This section describes Annotation object structures and their nuances.
For details on how Annotation objects are actually used, see the sections on :ref:`rendering` and :ref:`interactivity`.

Annotation interfaces 
#####################

SODA features are designed to use objects that implement the simple interfaces described in this section.

Annotation
^^^^^^^^^^

The :ref:`Annotation` interface is the baseline for all Annotation objects in SODA.
Objects that implement Annotation can be used to render glyphs that represent intervals in a sequence domain (e.g a gene).

.. code-block:: typescript

    interface Annotation {
        id: string;     // <- this should be a unique identifier
        start: number;  // <- the start of the interval that the annotation describes
        end: number;    // <- the end of the interval that the annotation describes
    }

ContinuousAnnotation
^^^^^^^^^^^^^^^^^^^^

Objects that implement ContinuousAnnotation can be used to render glyphs that represent intervals in a sequence domain for which there are position specific real number values (e.g. GC content).

.. code-block:: typescript

    interface ContinuousAnnotation extends Annotation {
        id: string;
        start: number;
        end: number;
        values: number[];   // <- these are the position specific values
    }

SequenceAnnotation
^^^^^^^^^^^^^^^^^^

Objects that implement SequenceAnnotation can be used to render glyphs that represent intervals in a sequence domain for which there are position specific character values (e.g. base pairs aligned to a reference sequence).

.. code-block:: typescript

    interface SequenceAnnotation extends Annotation {
        id: string;
        start: number;
        end: number;
        sequence: string;   // <- this should contain the character values
    }


Annotation utilities
####################

SODA provides some utilities that may help you work with Annotation objects:

- :ref:`AnnotationGroup` is an object that makes it easy to treat a group of Annotation objects as a single annotation.
- :ref:`generateAnnotations` generates some simple, toy DefaultAnnotation objects that can be used for experimentation.
- :ref:`aggregateTransitive` creates a list of AnnotationGroups from a supplied list of Annotations and a criterion function that takes a pair of Annotations as arguments. If the criterion function returns true for a pair of Annotations, they are placed in the same group. It is assumed that the criterion can be transitively applied.
- :ref:`aggregateIntransitive` creates a list of AnnotationGroups from a supplied list of Annotations and a criterion function that takes a pair of Annotations as arguments. If the criterion function returns true for a pair of Annotations, they are placed in the same group. It is *not* assumed that the criterion can be transitively applied.
- :ref:`getAlignmentAnnotations` creates SequenceAnnotations that are suitable for rendering sequences that are aligned to a chromosome.
- :ref:`sliceSequenceAnnotation` returns a smaller piece of a SequenceAnnotation.
- :ref:`slicePlotAnnotation` returns a smaller piece of a PlotAnnotation.

We're aware that the scope of these utilities may seem a bit lacking.
That's because these are the annotation manipulations that *we* have found useful when using SODA.
If you think a fundamental utility is missing, please `let us know`_!

Established data formats
^^^^^^^^^^^^^^^^^^^^^^^^

While SODA is not specifically designed to visualize established annotation data formats, a few utilities are provided to offer light support:

- :ref:`parseGff3Records` function can be used to parse GFF3 record strings into :ref:`Gff3Annotation` objects.
- :ref:`parseBedRecords` function may be used to parse BED record strings into :ref:`BedAnnotation` objects.

We'll likely expand light support for more data formats in the future.

.. _let us know: https://github.com/sodaviz/soda/issues
