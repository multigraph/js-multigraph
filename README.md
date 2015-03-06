Multigraph
==========

For more information about using Multigraph, see http://www.multigraph.org.

Development
===========

To work on the _nodify_ branch of Multigraph, prepare your computer by
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

### Check out the 'nodify' branch:
```bash
git checkout nodify
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

This uses the bundled multigraph.js file, so be sure to `npm run build` to make
sure that the tests are run against the latest version of the code.

```bash
npm run update-browser-unit-tests
```

After doing this, browse `spec/index.html` to run the tests in the browser.

### Viewing the graph tests in a browser

Browse `spec/graphics/index.html`.

### Adding a new graph test

Create a new *.xml file in spec/mugl, and optionally edit `spec/mugl/tests.js`; see
the comments in `spec/mugl/README.md` for details.  After adding a new *.xml file
and/or editing `spec/mugl/tests.js`, run the command

```bash
npm run update-graphics-tests
```

to update the tests, then browse `spec/graphics/index.html`.
