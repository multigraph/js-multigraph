if (!window.multigraph) {
    window.multigraph = {};
}

if (!window.multigraph.Axis) {
    window.multigraph.Axis = {};
}

(function (ns) {
    "use strict";

    var scalarAttributes = ["visible"];
    ns.jQueryXMLHandler = ns.jQueryXMLHandler ? ns.jQueryXMLHandler : { "mixinfuncs" : [] };
    ns.jQueryXMLHandler.mixinfuncs.push(function (nsObj, parse, serialize) {
        
        nsObj.Axis.Grid[parse] = function (xml) {
            var grid = new nsObj.Axis.Grid();
            if (xml) {
                grid.color(nsObj.math.RGBColor.parse(xml.attr("color")));
                grid.visible(xml.attr("visible"));
            }
            return grid;
        };
        
        nsObj.Axis.Grid.prototype[serialize] = function () {
            var attributeStrings = [],
                output = '<grid ';

            if (this.color() !== undefined) {
                attributeStrings.push('color="' + this.color().getHexString() + '"');
            }

            attributeStrings = ns.utilityFunctions.serializeScalarAttributes(this, scalarAttributes, attributeStrings);

            output += attributeStrings.join(' ') + '/>';

            return output;
        };

    });
}(window.multigraph));
