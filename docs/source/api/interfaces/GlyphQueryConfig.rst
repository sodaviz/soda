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

.. _GlyphQueryConfig:

:trst-class:`GlyphQueryConfig`
==============================

.. container:: collapsible

  .. code-block:: typescript

    interface GlyphQueryConfig

.. container:: content

  An interface that defines the parameters for a call to the queryGlyphMap() function.

Properties
----------

chart
*****

.. container:: collapsible

  .. code-block:: typescript

    chart: undefined | Chart <any>

.. container:: content

  Constrain the query to Annotations rendered in this Chart.

id
**

.. container:: collapsible

  .. code-block:: typescript

    id: undefined | string

.. container:: content

  Constrain the query to Annotations with this ID.

selector
********

.. container:: collapsible

  .. code-block:: typescript

    selector: undefined | string

.. container:: content

  Constrain the query to Annotations with this selector.

