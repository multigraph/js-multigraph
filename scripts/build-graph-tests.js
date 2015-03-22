var fs    = require('fs'),
    xmltests = require('../spec/mugl/tests.js').tests,
    jsontests = require('../spec/json-mugl/tests.js').tests;

function cmpTests(a,b) {
    if (a.mugl < b.mugl) { return -1; }
    if (a.mugl === b.mugl) { return 0; }
    return 1;
}

function do_graph_tests(tests, mugldir, filepattern, outputjson, browsehtml) {
    fs.readdir(mugldir, function(err, files) {
        if (err) {
            console.log(err);
            return;
        }

        // filter files array to only include ones that end in filepattern
        files = files.filter(function(f) { return filepattern.test(f); });

        // set haveTest[MUGL] = true for each MUGL file already listed in the tests
        // read in above
        var haveTest = {};
        tests.forEach(function(t) { haveTest[t.mugl] = true; });

        // split out the tests that have the "error" property set
        var error_tests = tests.filter(function(t) { return t.error; });
        tests = tests.filter(function(t) { return !t.error; });

        // for each mugl file found, if we don't already have a test for it,
        // append a new test object for it
        files.forEach(function(f) {
            if (!haveTest[f]) {
                tests.push({'mugl' : f});
            }
        });

        tests.sort(cmpTests);
        error_tests.sort(cmpTests);

        tests = tests.concat(error_tests);

        fs.writeFile(outputjson, JSON.stringify(tests), function() {
            console.log('Wrote ' + outputjson);
            console.log('Graph test suite updated; view it by browsing to ' + browsehtml);
        });
    });
}

do_graph_tests(xmltests,  'spec/mugl',      /.*\.xml$/,  'spec/graphs/graphs.json',      'spec/graphs/index.html');
do_graph_tests(jsontests, 'spec/json-mugl', /.*\.json$/, 'spec/json-graphs/graphs.json', 'spec/json-graphs/index.html');
