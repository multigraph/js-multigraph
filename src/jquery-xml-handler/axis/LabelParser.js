if (!window.multigraph) {
    window.multigraph = {};
}

if (!window.multigraph.Axis) {
    window.multigraph.Axis = {};
}

(function (ns) {
    "use strict";

    var scalarAttributes = ["format", "start", "angle", "densityfactor", "spacing"];

    ns.jQueryXMLMixin.add(function (nsObj, parse, serialize) {
        
        nsObj.Axis.Labels.Label[parse] = function (xml) {
            var label;
            if (xml && xml.attr("spacing") !== undefined) {
                label = new nsObj.Axis.Labels.Label(xml.attr("spacing"));
                label.format(xml.attr("format"));
                label.start(xml.attr("start"));
                label.angle(nsObj.utilityFunctions.parseDoubleOrUndefined(xml.attr("angle")));
                if (xml.attr("position") !== undefined) { 
                    label.position(nsObj.math.Point.parse(xml.attr("position")));
                }
                if (xml.attr("anchor")) {
                    label.anchor(nsObj.math.Point.parse(xml.attr("anchor")));
                }
                label.densityfactor(nsObj.utilityFunctions.parseDoubleOrUndefined(xml.attr("densityfactor")));
            }
            return label;
        };
        
        nsObj.Axis.Labels.Label.prototype[serialize] = function () {
            var attributeStrings = [],
                output = '<label ';

            attributeStrings = ns.utilityFunctions.serializeScalarAttributes(this, scalarAttributes, attributeStrings);
            if (this.anchor()) {
                attributeStrings.push('anchor="' + this.anchor().serialize() + '"');
            }
            if (this.position()) {
                attributeStrings.push('position="' + this.position().serialize() + '"');
            }
            output += attributeStrings.join(' ') + '/>';

            return output;
        };

    });
}(window.multigraph));
