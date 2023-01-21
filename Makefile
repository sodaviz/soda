.PHONY: build
build:
	rm -rf dist/
	npx tsc --build tsconfig.json

bundle:
	npx esbuild --bundle src/index.ts --outfile=soda.js --minify --global-name=soda
