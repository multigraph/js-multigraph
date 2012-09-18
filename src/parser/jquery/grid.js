window.multigraph.util.namespace("window.multigraph.parser.jquery", function (ns) {
    "use strict";

    var scalarAttributes = ["visible"];

    ns.mixin.add(function (ns, parse, serialize) {
        
        ns.core.Grid[parse] = function (xml) {
            var grid = new ns.core.Grid();
            if (xml) {
                grid.color(ns.math.RGBColor.parse(xml.attr("color")));
                //NOTE: visible attribute should default to true when parsing, so that
                //      the presence of a <grid> tag at all will turn on a grid.  In
                //      the Grid object itself, though, the default for the visible
                //      attribute is false, so that when we create a default grid object
                //      in code (as opposed to parsing), it defaults to not visible.
                if ((xml.attr("visible") === "true") || (xml.attr("visible") === undefined)) {
                    grid.visible(true);
                } else {
                    grid.visible(false);
                }
            }
            return grid;
        };
        
        ns.core.Grid.prototype[serialize] = function () {
            var attributeStrings = [],
                output = '<grid ';

            if (this.color() !== undefined) {
                attributeStrings.push('color="' + this.color().getHexString() + '"');
            }

            attributeStrings = window.multigraph.utilityFunctions.serializeScalarAttributes(this, scalarAttributes, attributeStrings);

            output += attributeStrings.join(' ') + '/>';

            return output;
        };

    });
});
