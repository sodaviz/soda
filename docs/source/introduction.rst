.. _introduction:

Introduction
============

SODA is a lightweight TypeScript/Javascript library for building dynamic and interactive visualizations of biological sequence annotation.
Visualizations produced by SODA can be easily integrated with web pages, and it is easy to define interactions between SODA components and other page features.

Before you start
----------------

SODA is still in the early stages of its development and is currently maintained by one person.
If you encounter any bugs, find anything in the library or documentation confusing, or think there are gaps in the feature set, *please* consider `submitting an issue`_.

SODA adheres to the `semantic versioning`_ guidelines, so any (intentional) breaking changes to the API will be accompanied by a bump in the major version number.

Design philosophies
-------------------
The development of SODA is guided by a handful of design philosophies:

- **SODA is developed in TypeScript**

Types make code safer, easier to understand, and less painful to maintain.

TypeScript does a fantastic job of adding static typing to JavaScript.
If you're not familiar with TypeScript, check out the `TypeScript handbook`_.

Of course, you are still free to use SODA as a JavaScript library, but you'll miss out on a bit of safety.

- **SODA features use callback functions**

If you've spent time writing JavaScript, it's a safe bet that you're familiar with the concept of a callback function.
However, if you've never used callback functions before, it's probably worth taking a quick moment to check out the MDN Web Docs section on `callback functions`_.

Callback functions are used throughout SODA for interactivity and dynamic styling.

- **SODA is not a visualization tool--it is a library with which visualization tools can be built**

There are countless tools that provide out of the box solutions for visualizing sequence annotation; SODA is not one of those tools.
Although there are many common visualization patterns for annotation data, there will always be edge case scenarios with visualization needs that don't quite fit into one of those patterns.
For developers who find themselves in one of those scenarios, SODA aims to provide an option that they might find a bit more palatable than turning to a low-level visualization library like D3.

- **SODA makes few assumptions about your data and the way it should be visualized**

SODA never tries to make stylistic decisions for you.
Instead, you are in control of deciding how data is visually represented and how that representation changes in response to interactions with the visualization.
The only assumption that SODA makes about your data is that it describes annotations along one dimension (e.g. a genome).

.. _submitting an issue: https://github.com/sodaviz/soda/issues
.. _for good reasons: https://qz.com/646467/how-one-programmer-broke-the-internet-by-deleting-a-tiny-piece-of-code/
.. _semantic versioning: https://semver.org/
.. _TypeScript handbook: https://www.typescriptlang.org/docs/handbook/intro.html
.. _generics: https://www.typescriptlang.org/docs/handbook/2/generics.html
.. _callback functions: https://developer.mozilla.org/en-US/docs/Glossary/Callback_function
.. _UCSC: https://genome.ucsc.edu/
.. _NCBI: https://www.ncbi.nlm.nih.gov/genome/
.. _ENSEMBL: https://ensembl.org/index.html
.. _D3: https://d3js.org/
.. _hard to learn: https://medium.com/nightingale/why-d3-is-so-hard-to-learn-from-bl-ocks-a2ac258964af
.. _misunderstood: https://medium.com/dailyjs/the-trouble-with-d3-4a84f7de011f
