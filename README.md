Multigraph
==========

For more information about using Multigraph, see multigraph.github.com.

Development
===========

To work on the _nodify_ branch of Multigraph:

```bash
# 1. clone the repo
git clone git@github.com:embeepea/js-multigraph

# 2. cd into it
cd js-multigraph

# 3. check out the 'nodify' branch
git checkout nodify

# 4. initialize git submodules
git submodule update --init --recursive

# 5. install npm modules
npm install

# 6. run the unit tests
jasmine-node jspec
```

Note that you might have to `sudo npm install -g jasmine-node` on your computer, if you don't
already have _jasmine-node_ installed.
