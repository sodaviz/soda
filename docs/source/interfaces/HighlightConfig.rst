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

.. _HighlightConfig:

:trst-class:`HighlightConfig`
=============================

.. container:: collapsible

  .. code-block:: typescript

    interface HighlightConfig

.. container:: content

  This describes the parameters for a call to the Chart.highlight() function.

Properties
----------

color
*****

.. container:: collapsible

  .. code-block:: typescript

    color: undefined | string

.. container:: content

  The color of the highlight. This defaults to black.

end
***

.. container:: collapsible

  .. code-block:: typescript

    end: number

.. container:: content

  The end of the region to be highlighted in semantic coordinates.

opacity
*******

.. container:: collapsible

  .. code-block:: typescript

    opacity: undefined | number

.. container:: content

  The opacity of the highlight. This defaults to 0.1.

selector
********

.. container:: collapsible

  .. code-block:: typescript

    selector: undefined | string

.. container:: content

  The selector that will be applied to the highlight object in the DOM. This will be auto generated if not supplied.

start
*****

.. container:: collapsible

  .. code-block:: typescript

    start: number

.. container:: content

  The start of the region to be highlighted in semantic coordinates.

