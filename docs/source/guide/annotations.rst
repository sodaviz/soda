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

Default implementations
#######################

For convenience, SODA provides some Annotation classes that can either be used directly or extended to suit your needs:

- :ref:`DefaultAnnotation` - a class that implements Annotation
- :ref:`DefaultContinuousAnnotation` - a class that implements ContinuousAnnotation
- :ref:`DefaultSequenceAnnotation` - a class that implements SequenceAnnotation

Each of the default Annotation implementations are initialized with a config object passed to the constructor.
For example, :ref:`DefaultAnnotation` objects may be instantiated with objects that implement the :ref:`AnnotationConfig` interface:

.. code-block:: typescript

    interface AnnotationConfig {
      id?: string;  // <- an id is automatically generated if one isn't provided
      start: number;
      end: number;
    }

It may seem a bit odd to parameterize the constructor of an object with a nearly identical object. 
However, object constructors and function calls are parameterized with config objects throughout the rest of SODA, and we'd like to maintain consistency.
Beyond that, this structure facilitates a useful pattern in which JSON strings (e.g. the result of an API request) may be serialized as objects and easily used to instantiate custom Annotation objects.

You can see how these may be directly used in the :ref:`examples` section.

Specialized implementations
###########################

SODA provides some specialized Annotation classes.

Annotation groups
^^^^^^^^^^^^^^^^^

The :ref:`AnnotationGroup` object is useful for keeping a group of related Annotations together.
When instantiated with an array of Annotations, the AnnotationGroup's start and end properties will be set to the minimum start and maximum end of each of the Annotation objects.
Annotations may be added to the group with a method on the object, and the start and end properties will be adjusted to accurately display the coordinate extents of the group.

GFF3 annotations
^^^^^^^^^^^^^^^^

The :ref:`Gff3Annotation` object mirrors the data fields in the GFF3 annotation data format.

BED annotations
^^^^^^^^^^^^^^^

SODA provides objects that mirror the data fields in the BED annotation data format:

- :ref:`Bed3Annotation` has the first three fields.
- :ref:`Bed6Annotation` has the first six fields.
- :ref:`Bed9Annotation` has the first nine fields.
- :ref:`Bed12Annotation` has all twelve fields.
- :ref:`BedAnnotation` optionally has any of the twelve fields.

Annotation utilities
####################

SODA provides some utilities that may help you work with Annotation objects:

- :ref:`generateAnnotations` generates some simple, toy DefaultAnnotation objects that can be used for experimentation.
- :ref:`aggregateTransitive` creates a list of AnnotationGroups from a supplied list of Annotations and a criterion function that takes a pair of Annotations as arguments. If the criterion function returns true for a pair of Annotations, they are placed in the same group. It is assumed that the criterion can be transitively applied.
- :ref:`aggregateIntransitive` creates a list of AnnotationGroups from a supplied list of Annotations and a criterion function that takes a pair of Annotations as arguments. If the criterion function returns true for a pair of Annotations, they are placed in the same group. It is *not* assumed that the criterion can be transitively applied.
