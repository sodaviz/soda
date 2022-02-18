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

.. _ExportConfig:

:trst-class:`ExportConfig`
==========================

.. container:: collapsible

  .. code-block:: typescript

    interface ExportConfig<C extends Chart>

.. container:: content

  An interface that defines the parameters for a call to the exportPng function.

  **Type parameters**

    - C: Chart

Properties
----------

chart
*****

.. container:: collapsible

  .. code-block:: typescript

    chart: C

.. container:: content

  The Chart to export.

filename
********

.. container:: collapsible

  .. code-block:: typescript

    filename: undefined | string

.. container:: content

  The filename for the exported PNG.

pixelRatio
**********

.. container:: collapsible

  .. code-block:: typescript

    pixelRatio: undefined | number

.. container:: content

  The pixel ratio of the rendered PNG. Using a number larger than 1 will over-render the PNG, making it larger. Using smaller numbers currently has strange behavior, and it's not recommended.

