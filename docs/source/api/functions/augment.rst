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

.. _augment:

:trst-function:`augment`
========================

.. container:: collapsible

  .. code-block:: typescript

    function augment<T extends generic>(config: AugmentConfig <T>): None

.. container:: content

  This takes a list of any object T, and a set of callback functions that describe how to give it the id, start, and end properties that satisfy the Annotation interface. The idea here is to allow you to get valid Annotation objects without having to write a class. Each property function is wrapped in an AugmentParam object has one other boolean property called "virtual." If virtual is set to true, the callback function will be applied as a getter for its corresponding property. If virtual is false or undefined, the callback function will be evaluated while augment() is running and the value will be applied as a real property on the object. Finally, the augment function checks to make sure that each Annotation property on each object has the correct type, throwing an exception if there are any incorrect types. This check can be skipped by setting skipValidate to true, probably improving performance measurably. You'll want to be careful if you decide to skip the validation, and if you're really worried about performance you'll probably want to avoid using this function altogether and write a proper class.

  **Type parameters**

  - T: generic

  **Parameters**

  - config: AugmentConfig <T>

  **Returns**: T & Annotation []