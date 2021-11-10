.. _guide-installation:

Installation and setup
======================

SODA is implemented in TypeScript and should be used in either a TypeScript JavaScript project.

The easiest way to use SODA is within an npm_ project.

If you have never used npm before, you'll first need to install Node_.
Depending on your operating system, there may be several ways to do that.
Regardless of which platform you are on, you should be able to install it from the `Node homepage`__

Alternatively, you could install node with the package manager of your choice.

**Homebrew**:

.. code-block::

    brew install node

**MacPorts**:

.. code-block::

    sudo port install nodejs14

**Aptitude (Ubuntu)**:

.. code-block::

    sudo apt install nodejs

After installing node, you can initialize a directory as an npm project:

.. code-block::

    mkdir my-project/
    cd my-project/
    npm init

Once you have an npm project, brand new or otherwise, you can install SODA:

.. code-block::

    npm install @sodaviz/soda

If you want to, you can instead download the SODA source code from the GitHub repository_.

.. _npm: https://www.npmjs.com/
.. _Node: https://nodejs.org/en/
.. _repository: https://github.com/sodaviz/soda.
__ node_
