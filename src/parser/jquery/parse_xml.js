window.multigraph.util.namespace("window.multigraph.parser.jquery", function (ns) {
    "use strict";

    ns.stringToJQueryXMLObj = function (string) {
        var $ = window.multigraph.jQuery,
            xml = $.parseXML(string);
        return $($(xml).children()[0]);
    };

});
