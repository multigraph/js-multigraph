var NodeJQueryHelper = {};

if (typeof(window) != "undefined") {

    // we're running in a browser, so assume jquery is already present on the window object
    NodeJQueryHelper.createJQuery = function() {
        var jQueryWrapper = {};
        beforeEach(function(){
            jQueryWrapper.$ = window.$;
        });
        return jQueryWrapper;
    };

    NodeJQueryHelper.localFileURL = function(dir, path) {
        return ".." + dir + path;
        //return dir.replace(/^\//, '') + path;
    };

} else {

    // we're not running in a browser
    var jsdom = require('jsdom'),
        DOMParser = require('xmldom').DOMParser,
        XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

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

                    jQueryWrapper.$.support.cors = true;
                    jQueryWrapper.$.ajaxSettings.xhr = function() {
                        // Note: the current version of xmlhttprequest (1.7.0) causes
                        // jQuery to crash while attempting to set response headers
                        // for local file:// protocol requests.  We work around that
                        // here by providing an xhr object that simply returns the
                        // empty string for all response headers.  This could be
                        // problematic if we ever try to use this for real http requests,
                        // but at the moment we're just using it for local file://
                        // requests for use in testing, so it seems OK.
                        // mbp Wed Mar  4 13:18:16 2015
                        var xhr = new XMLHttpRequest();
                        xhr.getAllResponseHeaders = function() { return ""; };
                        return xhr;
                    };

                    done();
                }
            });
        });
        return jQueryWrapper;
    };

    NodeJQueryHelper.localFileURL = function(dir, path) {
        return "file://" + dir + path;
    };

}

module.exports = NodeJQueryHelper;
