.PHONY: build
build:
	rm -rf build
	npx tsc --build tsconfig.json

bundle:
	npx esbuild --bundle src/index.ts --outfile=soda.js --minify --global-name=soda
