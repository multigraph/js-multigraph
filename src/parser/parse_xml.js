// usage:
// 
//   A valid jQuery object must be passed to the function returned by requiring this file.
//   That function returns a ParseXML object that can be used as follows:
//
//      var ParseXML = require('parse_xml.js')($);
//      ParseXML.stringToJQueryXMLObj(...);
//
module.exports = function($) {

    var ParseXML = {};

    ParseXML.stringToJQueryXMLObj = function (thingy) {
        if (typeof(thingy) !== "string") {
            return $(thingy);
        }
        var xml = $.parseXML(thingy);
        return $($(xml).children()[0]);
    };

    return ParseXML;

};
