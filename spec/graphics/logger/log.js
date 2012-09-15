var fs = require("fs");

var system = require("system");

var appLocation = system.args[1];
var fileName = appLocation.replace(/^.*[\\\/]|\.html/g, "")
var path = "log/"

var page = new WebPage();

page.settings.localToRemoteUrlAccessEnabled = true;
page.settings.ignoreSslErrors = true;

fs.makeTree(path)

page.onConsoleMessage = function (message, url, lineNumber) {
    fs.write(path + fileName + ".log", message, "w");
};

page.onError = function (msg, trace) {
    console.log(msg);
    phantom.exit(1);
};

if (!/^file:\/\/|http(s?):\/\//.test(appLocation)) {
    appLocation = "file:///" + fs.absolute(appLocation).replace(/\\/g, "/");
}

page.open(appLocation, function (status) {
    if (status !== "success") {
        error("Failed opening: '" + appLocation + "'. Please verify that the URI is valid");
    }

    page.evaluate(function () {
        window.onerror = function (message, url, lineNumber) {
            console.log((url ? url + " " : "") + (lineNumber ? lineNumber + ": " : "") + message);
        };

    });

    timer = setInterval(function () {
        phantom.exit(1);
    }, 2000);
});

