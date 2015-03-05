var walk = require('walk');
var exec = require('child_process').exec;

var specfiles   = [];

console.log('Updating browser jasmine unit tests; this might take a while.');

var walker  = walk.walk('./spec', { followLinks: false });

walker.on('file', function(root, stat, next) {
    if (/.*\-spec\.js$/.test(stat.name)) {
        specfiles.push(root + '/' + stat.name);
    }
    next();
});

walker.on('end', function() {
    specfiles.sort();
    var cmd = "ulimit -n 2560 ; browserify " + specfiles.join(" ") + " -d > spec/allspecs.js";
    exec(cmd, function(error, stdout, stderr) {
        if (error) {
            console.log("Error");
            console.log(error);
            console.log(stderr);
        } else {
            console.log('Done; wrote file: spec/allspecs.js');
            console.log('View it by browsing to spec/index.html');
            console.log(stdout);
        }
    });
});



