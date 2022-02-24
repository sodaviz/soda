.. role:: trst-class
.. role:: trst-interface
.. role:: trst-function
.. role:: trst-property
.. role:: trst-property-desc
.. role:: trst-method
.. role:: trst-method-desc
.. role:: trst-parameter
.. role:: trst-type
.. role:: trst-type-parameter

.. _getAlignmentAnnotations:

:trst-function:`getAlignmentAnnotations`
========================================

.. container:: collapsible

  .. code-block:: typescript

    function getAlignmentAnnotations(config: AlignmentConfig): None

.. container:: content

  This returns a set of SequenceAnnotations defined such that the provided query sequence can be rendered in a Chart as if it were aligned to a chromosome. The matches, substitutions, gaps, and insertions are returned as separate objects. The idea here is that they can be rendered individually with different style parameters.

  **Parameters**

  - config: AlignmentConfig

  **Returns**: None