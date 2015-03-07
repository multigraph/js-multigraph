This directory contains MUGL files that are used in Multigraph's
"graph" test suite, which is a collection of tests that involve
displaying graphs in a browser.  Each file here corresponds to a
graph; to view the graph test suite, open the file
spec/graphs/index.html in a browser.

After adding a new MUGL file here (the file name must end in ".xml"), run
the following command from the top level of the Multigraph project directory
to add the file to the test suite:

```
npm run build-graph-tests
```

By default, graphics tests are rendered at a size of 800 x 500 pixels. To
force a different size for a particular MUGL file, make an entry in the file
`tests.js` in this directory and re-run `npm run build-graph-tests `.

The file `tests.js` also contains other metadata about the graphs; in
particular, a MUGL file's `web` property can be set to `true` in
`tests.js` to indicate that the graph should be included in the
example suite on http://www.multigraph.org.
