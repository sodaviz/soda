.PHONY: build
build:
	rm -rf build
	npx tsc --build tsconfig.json
