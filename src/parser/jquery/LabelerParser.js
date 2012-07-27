if (!window.multigraph) {
    window.multigraph = {};
}

if (!window.multigraph.Axis) {
    window.multigraph.Axis = {};
}

(function (ns) {
    "use strict";

    var scalarAttributes = ["start", "angle", "densityfactor", "spacing"];

    ns.jQueryXMLMixin.add(function (nsObj, parse, serialize) {
        
        nsObj.Axis.Labeler[parse] = function (xml, axis, labels) {
            var labeler;
            if (xml && xml.attr("spacing") !== undefined) {
                labeler = new nsObj.Axis.Labeler(axis);
                labeler.spacing(xml.attr("spacing"));
                if (xml.attr("format") !== undefined) {
                    labeler.formatter(xml.attr("format"));
                } else if (labels !== undefined) {
                    labeler.formatter(labels.formatter());
                }
                if (xml.attr("start") !== undefined) {
                    labeler.start(xml.attr("start"));
                } else if (labels !== undefined) {
                    labeler.start(labels.start());
                }
                if (xml.attr("angle") !== undefined) {
                    labeler.angle(nsObj.utilityFunctions.parseDoubleOrUndefined(xml.attr("angle")));
                } else if (labels !== undefined) {
                    labeler.angle(labels.angle());
                }
                if (xml.attr("position") !== undefined) { 
                    labeler.position(nsObj.math.Point.parse(xml.attr("position")));
                } else if (labels !== undefined) {
                    labeler.position(labels.position());
                }
                if (xml.attr("anchor") !== undefined) {
                    labeler.anchor(nsObj.math.Point.parse(xml.attr("anchor")));
                } else if (labels !== undefined) {
                    labeler.anchor(labels.anchor());
                }
                if (xml.attr("densityfactor") !== undefined) {
                    labeler.densityfactor(nsObj.utilityFunctions.parseDoubleOrUndefined(xml.attr("densityfactor")));
                } else if (labels !== undefined) {
                    labeler.densityfactor(labels.densityfactor());
                }
            }
            return labeler;
        };
        
        nsObj.Axis.Labeler.prototype[serialize] = function () {
            var attributeStrings = [],
                output = '<label ';

            attributeStrings = ns.utilityFunctions.serializeScalarAttributes(this, scalarAttributes, attributeStrings);
            if (this.formatter()) {
                attributeStrings.push('format="' + this.formatter() + '"');
            }
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
