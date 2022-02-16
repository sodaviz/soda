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

.. _setKeySeparator:

:trst-function:`setKeySeparator`
================================

.. container:: collapsible

  .. code-block:: typescript

    function setKeySeparator(separator: string): void

.. container:: content

  Set the separator that SODA uses to build map keys. The keys are of the form: <annotation ID><separator><glyph selector><separator><chart ID>.

  **Parameters**

  - separator: string

  **Returns**: void