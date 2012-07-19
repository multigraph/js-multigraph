if (!window.multigraph) {
    window.multigraph = {};
}

if (!window.multigraph.Axis) {
    window.multigraph.Axis = {};
}

(function (ns) {
    "use strict";

    var scalarAttributes = ["format", "start", "angle", "position", "anchor", "densityfactor", "function"];

    ns.jQueryXMLMixin.add(function (nsObj, parse, serialize) {

        nsObj.Axis.Labels[parse] = function (xml) {
            var labels = new nsObj.Axis.Labels();
            if (xml) {
                labels.format(xml.attr("format"));
                labels.start(xml.attr("start"));
                labels.angle(nsObj.utilityFunctions.parseDoubleOrUndefined(xml.attr("angle")));
                labels.position(xml.attr("position"));
                labels.anchor(xml.attr("anchor"));
                labels.spacing(xml.attr("spacing"));
                labels["function"](xml.attr("function"));
                labels.densityfactor(xml.attr("densityfactor"));
                if (xml.find(">label").length > 0) {
                    $.each(xml.find(">label"), function (i,e) {
                        labels.label().add( nsObj.Axis.Labels.Label[parse]($(e)) );
                    });
                }
            }
            return labels;
        };

        nsObj.Axis.Labels.prototype[serialize] = function () {
            var attributeStrings = [],
                output = '<labels ',
                i;

            attributeStrings = ns.utilityFunctions.serializeScalarAttributes(this, scalarAttributes, attributeStrings);

            output += attributeStrings.join(' ');

            if (this.label().size() > 0) {
                output += '>';
                for (i = 0; i < this.label().size(); i++) {
                    output += this.label().at(i)[serialize]();
                }
                output += '</labels>';
            } else if (this.spacing() !== undefined) {
                output += ' spacing="' + this.spacing() + '"/>';
            } else {
                output += '/>';
            }

            return output;
        };

    });
}(window.multigraph));
