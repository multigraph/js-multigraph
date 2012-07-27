window.multigraph.util.namespace("window.multigraph.parser.jquery", function (ns) {
    "use strict";

    var scalarAttributes = ["start", "angle", "densityfactor", "spacing"];

    ns.mixin.add(function (ns, parse, serialize) {
        
        ns.core.Labeler[parse] = function (xml, axis, labels) {
            var labeler;
            if (xml && xml.attr("spacing") !== undefined) {
                labeler = new ns.core.Labeler(axis);
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
                    labeler.angle(ns.utilityFunctions.parseDoubleOrUndefined(xml.attr("angle")));
                } else if (labels !== undefined) {
                    labeler.angle(labels.angle());
                }
                if (xml.attr("position") !== undefined) { 
                    labeler.position(ns.math.Point.parse(xml.attr("position")));
                } else if (labels !== undefined) {
                    labeler.position(labels.position());
                }
                if (xml.attr("anchor") !== undefined) {
                    labeler.anchor(ns.math.Point.parse(xml.attr("anchor")));
                } else if (labels !== undefined) {
                    labeler.anchor(labels.anchor());
                }
                if (xml.attr("densityfactor") !== undefined) {
                    labeler.densityfactor(ns.utilityFunctions.parseDoubleOrUndefined(xml.attr("densityfactor")));
                } else if (labels !== undefined) {
                    labeler.densityfactor(labels.densityfactor());
                }
            }
            return labeler;
        };
        
        ns.core.Labeler.prototype[serialize] = function () {
            var attributeStrings = [],
                output = '<label ';

            attributeStrings = window.multigraph.utilityFunctions.serializeScalarAttributes(this, scalarAttributes, attributeStrings);
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
});
