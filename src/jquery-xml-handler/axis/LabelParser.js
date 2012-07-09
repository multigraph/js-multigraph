if (!window.multigraph) {
    window.multigraph = {};
}

if (!window.multigraph.Axis) {
    window.multigraph.Axis = {};
}

(function (ns) {
    "use strict";

    var scalarAttributes = ["format", "start", "angle", "position", "anchor", "densityfactor", "spacing"];
    ns.jQueryXMLHandler = ns.jQueryXMLHandler ? ns.jQueryXMLHandler : { "mixinfuncs" : [] };
    ns.jQueryXMLHandler.mixinfuncs.push(function (nsObj, parse, serialize) {
        
        nsObj.Axis.Labels.Label[parse] = function (xml) {
            var label;
            if (xml && xml.attr("spacing") !== undefined) {
                label = new nsObj.Axis.Labels.Label(xml.attr("spacing"));
                label.format(xml.attr("format"));
                label.start(xml.attr("start"));
                label.angle(nsObj.utilityFunctions.parseDoubleOrUndefined(xml.attr("angle")));
                label.position(xml.attr("position"));
                label.anchor(xml.attr("anchor"));
                label.densityfactor(xml.attr("densityfactor"));
            }
            return label;
        };
        
        nsObj.Axis.Labels.Label.prototype[serialize] = function () {
            var attributeStrings = [],
                output = '<label ';

            attributeStrings = ns.utilityFunctions.serializeScalarAttributes(this, scalarAttributes, attributeStrings);

            output += attributeStrings.join(' ') + '/>';

            return output;
        };

    });
}(window.multigraph));
