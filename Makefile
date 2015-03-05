all:	multigraph.js multigraph-standalone.js multigraph-min.js multigraph-standalone-min.js

multigraph.js:	_always
	browserify src/main.js -d > multigraph.js

multigraph-standalone.js:	_always
	browserify src/main-standalone.js -d > multigraph-standalone.js

multigraph-min.js:	multigraph.js
	uglifyjs < multigraph.js > multigraph-min.js

multigraph-standalone-min.js:	multigraph-standalone.js
	uglifyjs < multigraph-standalone.js > multigraph-standalone-min.js

.PHONY: _always
