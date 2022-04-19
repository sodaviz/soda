.. _guide_overview:

Overview
========

SODA is a front-end library for visualizing biological sequence annotations in a web page.
The SODA API allows you to create SVG viewports in a web page and to configure and manipulate visualizations in those viewports.
SODA has no back-end and doesn't create any wrapping GUI components: it's up to you to implement these as you see fit.

Building a simple SODA application requires three pieces:

    #. A TypeScript/JavaScript object definition that extends SODA's simple Annotation object and describes the annotation data you want to visualize.
    #. One or more SODA Chart objects configured to produce the visualization itself.
    #. Top-level code that drives that drives the application by instantiating Annotation objects and delivering them to Chart objects for visualization.

The goal of this guide is to explain the nuances of these systems in detail.
