### SODA Makefile
### ----------------
### Welcome to the Makefile, we hope you enjoy your stay! Run
### `make help` for help.
###


## --------------
## Public Targets
## --------------

### build
### -----
### Build the example app such that TypeScript files are compiled
### to JavaScript and the example/ directory is bundled into a
### single asset to be consumed by example/index.html.
###
.PHONY: build
build:
	npx tsc --build tsconfig.json

### setup
### -----
### Install development dependencies, run this first!
###
.PHONY: setup
setup:
	@npm install --dev
	@echo "You will also need wget to run the example app"

## ---------------
## Private Targets
## ---------------


## This lives way down here because it screws up the syntax highlighting
## for the rest of the file if it's higher up. Basically, we just grep
## the Makefile for special comments and barf out those lines.
MAGIC_COMMENT := \#\#\#
help:
	@cat Makefile | grep '^$(MAGIC_COMMENT)' | \
	sed 's/$(MAGIC_COMMENT) //' | sed 's/$(MAGIC_COMMENT)//' | less
