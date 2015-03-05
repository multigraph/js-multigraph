var fs    = require('fs'),
    tests = require('../jspec/mugl/tests.js').tests;

fs.readdir('jspec/mugl', function(err, files) {
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

    fs.writeFile('jspec/graphics/tests.json', JSON.stringify(tests), function() {
        console.log('Wrote jspec/graphics/tests.json.');
        console.log('Graphics tests updated; view them by browsing to "jspec/graphics/index.html".');
    });

});
