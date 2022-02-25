# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.9.0] - 2022-02-25

### Added

### Changed
- Chart.scaleExtent has been replaced with Chart.zoomConstraint
- Chart.translateExtent has been replaced with Chart.domainConstraint
- The internal handling of zoom events has been modified
- The docs have been updated

### Deprecated

### Removed

### Fixed

### Security

## [0.8.1] - 2022-02-23

### Added
- Added a modified implementation of d3-radial-axis

### Changed
- The docs now separate contrib from the core

### Deprecated

### Removed
- Removed the dependency on d3-radial-axis

### Fixed

### Security

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

### Deprecated

### Removed

### Fixed
- Fixed x-value distribution bug on ContinuousAnnotation
- Sevaral selector-based glyph rendering bugs
- Fixed default Chart horizontal axis re-rendering
- Several heatmap cell bugs
- Fixed Chart padHeight bug
- Console warnings and errors should no longer cause memory leaks due to object printing

### Security
