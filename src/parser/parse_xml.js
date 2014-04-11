window.multigraph.util.namespace("window.multigraph.parser", function (ns) {
    "use strict";

    // This function really does more than just convert a string to a jquery xml obj; it also works
    // if the argument (thingy) is already a jquery xml obj, or a raw dom xml obj.
    ns.stringToJQueryXMLObj = function (thingy) {
        var $ = window.multigraph.jQuery;
        if (typeof(thingy) !== "string") {
            return $(thingy);
        }
        var xml = $.parseXML(thingy);
        return $($(xml).children()[0]);
    };

});
