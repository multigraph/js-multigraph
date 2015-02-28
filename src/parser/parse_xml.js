var ParseXML = {};

var $ = require('jquery');

ParseXML.stringToJQueryXMLObj = function (thingy) {
    if (typeof(thingy) !== "string") {
        return $(thingy);
    }
    var xml = $.parseXML(thingy);
    return $($(xml).children()[0]);
};

module.exports = ParseXML;

module.exports = ParseXML;
