window.multigraph.util.namespace("window.multigraph.parser", function (ns) {
    "use strict";

    ns.mixin.add(function (ns, parse) {
        
        ns.core.Grid[parse] = function (xml) {
            var grid = new ns.core.Grid(),
                utilityFunctions = ns.utilityFunctions,
                parseAttribute   = utilityFunctions.parseAttribute,
                attr;
            if (xml) {
                parseAttribute(xml.attr("color"), grid.color, ns.math.RGBColor.parse);
                //NOTE: visible attribute should default to true when parsing, so that
                //      the presence of a <grid> tag at all will turn on a grid.  In
                //      the Grid object itself, though, the default for the visible
                //      attribute is false, so that when we create a default grid object
                //      in code (as opposed to parsing), it defaults to not visible.
                attr = xml.attr("visible");
                if (attr !== undefined) {
                    grid.visible(utilityFunctions.parseBoolean(attr));
                } else {
                    grid.visible(true);
                }
            }
            return grid;
        };
        
    });

});
