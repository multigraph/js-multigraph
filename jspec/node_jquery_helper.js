var jsdom = require('jsdom'),
    DOMParser = require('xmldom').DOMParser;

var NodeJQueryHelper = {};

NodeJQueryHelper.createJQuery = function() {
    var jQueryWrapper = {};
    beforeEach(function(done){
        jsdom.env({
            html: '<html><body></body></html>',
            scripts: [process.cwd() + '/lib/jquery/jquery.min.js'],
            done: function(err, window) {
                jsdom.getVirtualConsole(window).sendTo(console);
                if (err) console.log(err);
                jQueryWrapper.$ = window.jQuery;
                window.DOMParser = DOMParser;
                done();
            }
        });
    });
    return jQueryWrapper;
};

module.exports = NodeJQueryHelper;
