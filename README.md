Multigraph
==========

For more information about using Multigraph, see http://www.multigraph.org.

Development
===========

To work on the Multigraph code, prepare your computer by
installing the required dev tools:

* npm
* nodejs
* browserify (`sudo npm install -g browserify`)
* uglify-js (`sudo npm install -g uglify-js`)
* jasmine-node (for running the unit tests, `sudo npm install -g uglify-js`)

These tools are not needed for simply viewing Multigraph graphs, but
they are needed for working on the Multigraph code. (The only thing
needed for viewing a graph is a browser).

Then, to obtain and work with the code, use the following steps.


### Clone the repo
```bash
git clone git@github.com:embeepea/js-multigraph
```

### Initialize the git submodules
```bash
git submodule update --init --recursive
```

### Install the npm dependencies
```bash
npm install
```

### Run the unit tests from the command line
```bash
npm test
```

### Build the bundled multigraph.js file
```
npm run build
```

### Update and run the unit tests in a browser

```bash
npm run build-tests
```

After doing this, browse `spec/index.html` to run the tests in the browser.

### Viewing the graph tests in a browser

Browse `spec/graphics/index.html`.

### Adding a new graph test

Create a new *.xml file in spec/mugl, and optionally edit `spec/mugl/tests.js`; see
the comments in `spec/mugl/README.md` for details.  After adding a new *.xml file
and/or editing `spec/mugl/tests.js`, run the command

```bash
npm run build-graph-tests
```

to update the tests, then browse `spec/graphics/index.html`.

### Build everything (bundled and minified, with and without JQuery):
```
npm run build-all
```
