.. _installation:

Installation and setup
======================

SODA is implemented in TypeScript, which means it can be used in both TypeScript and JavaScript.


SODA as a TypeScript library
----------------------------

To get the full benefit of TypeScript when using SODA, you'll probably want to use it in an npm_ project.

If you have never used npm before, you'll first need to install Node_.
Depending on your operating system, there may be several ways to do that.
Regardless of which platform you are on, you should be able to install it from the `Node homepage`__

Alternatively, you could install node with a package manager:

**Homebrew**:

.. code-block::

    brew install node

**Apt (Ubuntu, Debian)**:

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

If you want to, you can instead download the SODA source code from the GitHub repository_ and compile it with the TypeScript compiler, tsc_.

SODA as a JavaScript library
----------------------------

If you'd rather just use SODA as a JavaScript library, the easiest way is probably to grab the `bundle from skypack`__.

You could also download the source code from the GitHub repository_, compile it, and bundle it yourself with something like webpack_.

.. _npm: https://www.npmjs.com/
.. _Node: https://nodejs.org/en/
.. _repository: https://github.com/sodaviz/soda
.. _tsc: https://www.typescriptlang.org/docs/handbook/compiler-options.html
.. _skypack: https://www.skypack.dev/view/@sodaviz/soda
.. _webpack: https://webpack.js.org/

__ node_

__ skypack_
