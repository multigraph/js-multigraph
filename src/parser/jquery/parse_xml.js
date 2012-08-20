window.multigraph.util.namespace("window.multigraph.parser.jquery", function (ns) {
    "use strict";

    ns.stringToJQueryXMLObj = function(string) {
        var xml = $.parseXML(string);
        return $($(xml).children()[0]);
    };

});
