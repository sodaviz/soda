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

.. _ChartObserver:

:trst-class:`ChartObserver`
===========================

.. container:: collapsible

  .. code-block:: typescript

    class ChartObserver

.. container:: content

  An abstract class for objects that "observe" Charts.

Constructors
------------

.. container:: collapsible

  .. code-block:: typescript

    (): ChartObserver

.. container:: content



Properties
----------

charts
******

.. container:: collapsible

  .. code-block:: typescript

    charts: Chart <any> []

.. container:: content

  A list of Charts that the Plugin will pay attention to.


Methods
-------

add
***

.. container:: collapsible

 .. code-block:: typescript

    add(chart: Chart | Chart <any> []): void

.. container:: content

  This method registers a Chart or list of Charts with the Plugin.

  **Parameters**

  - chart: Chart | Chart <any> []

  **Returns**: void

addChart
********

.. container:: collapsible

 .. code-block:: typescript

    addChart(chart: Chart <any>): void

.. container:: content

  Add a Chart to the observer.

  **Parameters**

  - chart: Chart <any>

  **Returns**: void

alert
*****

.. container:: collapsible

 .. code-block:: typescript

    alert(chart: Chart <any>): void

.. container:: content

  The method that will be called when the observer is alerted by a Chart.

  **Parameters**

  - chart: Chart <any>

  **Returns**: void

