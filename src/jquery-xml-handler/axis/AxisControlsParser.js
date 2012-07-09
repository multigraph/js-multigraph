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
        
        nsObj.Axis.AxisControls[parse] = function (xml) {
            var axiscontrols = new nsObj.Axis.AxisControls();
            if (xml) {
                axiscontrols.visible(xml.attr("visible"));
            }
            return axiscontrols;
        };
        
        nsObj.Axis.AxisControls.prototype[serialize] = function () {
            var attributeStrings = [],
                output = '<axiscontrols ';

            attributeStrings = ns.utilityFunctions.serializeScalarAttributes(this, scalarAttributes, attributeStrings);

            output += attributeStrings.join(' ') + '/>';

            return output;
        };

    });
}(window.multigraph));
