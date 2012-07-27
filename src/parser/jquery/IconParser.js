if (!window.multigraph) {
    window.multigraph = {};
}

(function (ns) {
    "use strict";

    var scalarAttributes = ["height", "width", "border"];

    ns.jQueryXMLMixin.add(function (nsObj, parse, serialize) {
        
        nsObj.Legend.Icon[parse] = function (xml) {
            var icon = new nsObj.Legend.Icon();
            if (xml) {
                icon.height(nsObj.utilityFunctions.parseIntegerOrUndefined(xml.attr("height")));
                icon.width(nsObj.utilityFunctions.parseIntegerOrUndefined(xml.attr("width")));
                icon.border(nsObj.utilityFunctions.parseIntegerOrUndefined(xml.attr("border")));
            }
            return icon;
        };
        
        nsObj.Legend.Icon.prototype[serialize] = function () {
            var attributeStrings = [],
                output = '<icon ';

            attributeStrings = ns.utilityFunctions.serializeScalarAttributes(this, scalarAttributes, attributeStrings);

            output += attributeStrings.join(' ') + '/>';

            return output;
        };

    });
}(window.multigraph));
