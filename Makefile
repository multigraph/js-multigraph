all:	multigraph.js multigraph-standalone.js

multigraph.js:	_always
	browserify src/main.js -d > multigraph.js

multigraph-standalone.js:	_always
	browserify src/main-standalone.js -d > multigraph-standalone.js

.PHONY: _always
