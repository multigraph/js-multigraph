window.multigraph.util.namespace("window.multigraph.parser.jquery", function (ns) {
    "use strict";

    var scalarAttributes = ["visible"];

    ns.mixin.add(function (ns, parse, serialize) {
        
        ns.core.Grid[parse] = function (xml) {
            var grid = new ns.core.Grid();
            if (xml) {
                grid.color(ns.math.RGBColor.parse(xml.attr("color")));
                grid.visible(xml.attr("visible"));
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
