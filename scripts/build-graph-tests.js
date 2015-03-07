var fs    = require('fs'),
    tests = require('../spec/mugl/tests.js').tests;

fs.readdir('spec/mugl', function(err, files) {
    if (err) {
        console.log(err);
        return;
    }
    // filter files array to only include ones that end in ".xml":
    files = files.filter(function(f) { return /.*\.xml$/.test(f); });

    // set haveTest[MUGL] = true for each MUGL file already listed in the tests
    // read in above
    var haveTest = {};
    tests.forEach(function(t) { haveTest[t.mugl] = true; });

    // split out the tests that have the "error" property set
    var error_tests = tests.filter(function(t) { return t.error; });
    tests = tests.filter(function(t) { return !t.error; });

    // for each mugl (xml) file found, if we don't already have a test for it,
    // append a new test object for it
    files.forEach(function(f) {
        if (!haveTest[f]) {
            tests.push({'mugl' : f});
        }
    });

    function cmpTests(a,b) {
        if (a.mugl < b.mugl) { return -1; }
        if (a.mugl === b.mugl) { return 0; }
        return 1;
    }

    tests.sort(cmpTests);
    error_tests.sort(cmpTests);

    tests = tests.concat(error_tests);

    fs.writeFile('spec/graphs/tests.json', JSON.stringify(tests), function() {
        console.log('Wrote spec/graphs/tests.json.');
        console.log('Graph test suite updated; view it by browsing to "spec/graphs/index.html".');
    });

});
