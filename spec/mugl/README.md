This directory contains the MUGL files that are used for creating Multigraph
tests that involve displaying graphs in a browser.

After adding a new MUGL file here (the file name must end in ".xml"), run
the following command from the top level of the Multigraph project directory
to add the file to the test suite:

```
npm run update-graphics-tesst
```

To view the test suite, point your browser to the file `spec/graphics/index.html`.

By default, graphics tests are rendered at a size of 800 x 500 pixels. To
force a different size for a particular MUGL file, make an entry in the file
`tests.js` in this directory and re-run `npm run update-graphics-tests`.
