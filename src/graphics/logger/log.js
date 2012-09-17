/*global phantom, require, WebPage, error, timer */
(function () {
    "use strict";
    var fs = require("fs"),
        system = require("system"),
        page = new WebPage(),
        path = "fixtures/",
        pageLocation = system.args[1].replace(/^.*[\\\/]/g, ""),
        fileName = system.args[1].replace(/^.*[\\\/]|\.html/g, "");

    fs.changeWorkingDirectory("spec/graphics/logger/");

    page.settings.localToRemoteUrlAccessEnabled = true;
    page.settings.ignoreSslErrors = true;

    fs.makeTree(path);

    page.onConsoleMessage = function (message, url, lineNumber) {
        fs.write(path + fileName + ".log", message, "w");
        phantom.exit(1);
    };

    page.onError = function (msg, trace) {
        phantom.exit(1);
    };

    if (!/^file:\/\/|http(s?):\/\//.test(pageLocation)) {
        pageLocation = "file:///" + fs.absolute(pageLocation).replace(/\\/g, "/");
    }

    page.open(pageLocation, function (status) {
        if (status !== "success") {
            error("Failed opening: '" + pageLocation + "'. Please verify that the URI is valid");
        }

        page.evaluate(function () {
            window.onerror = function (message, url, lineNumber) {
                console.log((url ? url + " " : "") + (lineNumber ? lineNumber + ": " : "") + message);
            };
        });

        timer = setInterval(function () {
            phantom.exit(1);
        }, 3000);
    });
}());
