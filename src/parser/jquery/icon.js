window.multigraph.util.namespace("window.multigraph.parser.jquery", function (ns) {
    "use strict";

    ns.mixin.add(function (ns, parse) {
        
        ns.core.Icon[parse] = function (xml) {
            var icon = new ns.core.Icon(),
                attr;
            if (xml) {
                attr = xml.attr("height");
                if (attr !== undefined) {
                    icon.height(parseInt(attr, 10));
                }
                attr = xml.attr("width");
                if (attr !== undefined) {
                    icon.width(parseInt(attr, 10));
                }
                attr = xml.attr("border");
                if (attr !== undefined) {
                    icon.border(parseInt(attr, 10));
                }
            }
            return icon;
        };
        
    });

});
