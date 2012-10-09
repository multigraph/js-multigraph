window.multigraph.util.namespace("window.multigraph.parser.jquery", function (ns) {
    "use strict";

    ns.stringToJQueryXMLObj = function (string) {
        var xml = window.multigraph.jQuery.parseXML(string);
        return window.multigraph.jQuery(window.multigraph.jQuery(xml).children()[0]);
    };

});
