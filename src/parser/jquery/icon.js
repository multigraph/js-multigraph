window.multigraph.util.namespace("window.multigraph.parser.jquery", function (ns) {
    "use strict";

    ns.mixin.add(function (ns, parse) {
        
        ns.core.Icon[parse] = function (xml) {
            var icon = new ns.core.Icon();
            if (xml) {
                if (xml.attr("height") !== undefined) {
                    icon.height(parseInt(xml.attr("height"), 10));
                }
                if (xml.attr("width") !== undefined) {
                    icon.width(parseInt(xml.attr("width"), 10));
                }
                if (xml.attr("border") !== undefined) {
                    icon.border(parseInt(xml.attr("border"), 10));
                }
            }
            return icon;
        };
        
    });

});
