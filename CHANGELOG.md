# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

<!---
### Added
### Changed
### Deprecated
### Removed
### Fixed
### Security
-->

## [Unreleased]

## [0.12.0] - 2022-05-11

### Changed
- Docs updated
- Most of the glyphs stroke-color property defaults to "none" now
- AnnotationGroup.group property has been changed to AnnotationGroup.annotations
- slicePlotAnnotation has become slicePlotAnnotations, arguments adjusted
- sliceSequenceAnnotation has become sliceSequenceAnnotations, arguments adjusted

### Fixed
- Fixed VerticalLayout export from index
- Fixed the return value of greedyGraphLayout() and heuristicGraphLayout()

## [0.11.1] - 2022-05-09

### Changed
- Updated the docs

## [0.11.0] - 2022-05-09

### Added
- Added some codepen examples to the docs
- Tooltips are now more configurable

### Changed
- Changed the "prepublish" script to "prepare" in package.json
- Simplified the internal use of selector strings
- Glyph queries now expect Annotation objects instead of Annotation IDs
- The SVG text for text glyphs and axis glyph ticks is now unselectable

### Fixed
- Removed the Chart.rowColors console warning spam
- Fixed a dynamic text selection bug
- Fixed a dynamic text size calculation bug
- Fixed the BindTarget enum export
- Fixed the bug that caused the tooltip div to pop up in the corner of the window
- Fixed vertical axis glyph placement and domain

## [0.10.1] - 2022-05-04

### Changed

- Changed TypeScript module option to ESNext

## [0.10.0] - 2022-05-03

### Added
- Added a high level guide to the docs
- Added the area() glyph function
- Added simpleText() glyph
- Added VerticalLayout interface
- Added a copy-cat implementation of D3.Transform
 
### Changed
- The Contrib directory has been removed
- Annotation objects have been replaced with interfaces
- ContinuousAnnotation has been renamed back to PlotAnnotation
- The text() glyph function has become dynamicText()
- The Chart rendering routine has been split at a finer grain:
  - Chart.updateLayout
  - Chart.updateRowCount
  - Chart.updateDimensions
  - Chart.updateDomain
  - Chart.draw()
- The Chart DOM element dimensions now have more consistent accessors
- Chart row stripes are now more configurable with new ChartConfig properties:
  - Chart.rowColors
  - Chart.rowOpacity
- The selector property is no longer optional on ChartConfig
- Charts now have a layout property which is used by the rendering API
- The BED and GFF3 parsing functions now work on both string and string[]
 
### Removed
- Removed the multiple incarnations of BedAnnotation
- Removed the dependency on lodash
 
### Fixed
- The default positioning of all glyphs has been fine-tuned to fit more neatly into Chart rows

## [0.9.1] - 2022-02-28

### Changed
- Removed some empty sections in this changelog

### Fixed
- Fixed the link to the API on the docs index

## [0.9.0] - 2022-02-25

### Changed
- Chart.scaleExtent has been replaced with Chart.zoomConstraint
- Chart.translateExtent has been replaced with Chart.domainConstraint
- The internal handling of zoom events has been modified
- The docs have been updated

## [0.8.1] - 2022-02-23

### Added
- Added a modified implementation of d3-radial-axis

### Changed
- The docs now separate contrib from the core

### Removed
- Removed the dependency on d3-radial-axis

## [0.8.0] - 2022-02-15

### Added
- Added this changelog
- The D3 object used internally by SODA is now re-exported
- Added a contrib directory, which will largely be a place for experimental features that aren't necessarily maintained to the same standard
- Added alignment annotation utility (contrib)
- Added some annotation slicing utilities for SeqeunceAnnotation and ContinuousAnnotation (contrib)
- Added range and colorScheme parameters added to heatmap glyphs
- Added the option to set a configurable background that frames heatmap glyphs
- Added divOutline and divMargin parameters to Chart configuration
- Added the tag property to Annotation class
- Added optional postZoom() and postResize() callbacks to Chart
- Added glyph removal functions to help prevent memory leaks
- Added RadialChart and radialRectangle function(contrib)
- Added debugShading option to Chart
- Added highlight method to Chart
- Added area shading feature to line plots

### Changed
- PlotAnnotation has been renamed to ContinuousAnnotation
- The SequenceAnnotation implementation has been simplified
- Charts now create and manage container divs
- Improved text glyph styling parameters
- Default text-anchor property on text glyph is now "start"
- Default text fill color set to black
- Improved AnnotationGroup.add()
- Interactions have now have proper selector and chart constraints
- Glyph mapping has been refactored and improved
- Refactored default Chart rendering routines so they can be properly re-used
- Chart configuration axis property was changed to axisType
- binSpan on various plot glyphs has been renamed to rowSpan
- Removed fixed option from vertical axes since it did nothing
- Range and domain options are more consistent across plot glyphs

### Fixed
- Fixed x-value distribution bug on ContinuousAnnotation
- Sevaral selector-based glyph rendering bugs
- Fixed default Chart horizontal axis re-rendering
- Several heatmap cell bugs
- Fixed Chart padHeight bug
- Console warnings and errors should no longer cause memory leaks due to object printing
