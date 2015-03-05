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

    tests = tests.concat(error_tests);

    fs.writeFile('spec/graphics/tests.json', JSON.stringify(tests), function() {
        console.log('Wrote pec/graphics/tests.json.');
        console.log('Graphics tests updated; view them by browsing to "spec/graphics/index.html".');
    });

});
