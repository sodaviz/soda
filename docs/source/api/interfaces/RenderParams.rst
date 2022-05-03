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

.. _RenderParams:

:trst-class:`RenderParams`
==========================

.. container:: collapsible

  .. code-block:: typescript

    interface RenderParams

.. container:: content

  This defines the parameters for a call to a Chart's rendering method.

Properties
----------

annotations
***********

.. container:: collapsible

  .. code-block:: typescript

    annotations: undefined | Annotation []

.. container:: content

  The Annotation objects to be rendered.

end
***

.. container:: collapsible

  .. code-block:: typescript

    end: undefined | number

.. container:: content

  The end coordinate of the region that will be rendered.

rowCount
********

.. container:: collapsible

  .. code-block:: typescript

    rowCount: undefined | number

.. container:: content

  The number of rows that will be rendered.

start
*****

.. container:: collapsible

  .. code-block:: typescript

    start: undefined | number

.. container:: content

  The start coordinate of the region that will be rendered.

