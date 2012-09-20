window.multigraph.util.namespace("window.multigraph.parser.jquery", function (ns) {
    "use strict";

    var scalarAttributes = ["format", "bgalpha", "border", "pad"],
        Variable = window.multigraph.core.DatatipsVariable;

    ns.mixin.add(function (ns, parse, serialize) {

        ns.core.Datatips[parse] = function (xml) {
            var datatips = new ns.core.Datatips();
            if (xml) {
                if (xml.find("variable").length > 0) {
                    $.each(xml.find("variable"), function (i, e) {
                        datatips.variables().add( ns.core.DatatipsVariable[parse]($(e)) );
                    });
                }
                datatips.format(xml.attr("format"));
                datatips.bgcolor(window.multigraph.math.RGBColor.parse(xml.attr("bgcolor")));
                datatips.bgalpha(xml.attr("bgalpha"));
                if (xml.attr("border") !== undefined) {
                    datatips.border(parseInt(xml.attr("border"), 10));
                }
                datatips.bordercolor(window.multigraph.math.RGBColor.parse(xml.attr("bordercolor")));
                if (xml.attr("pad") !== undefined) {
                    datatips.pad(parseInt(xml.attr("pad"), 10));
                }

            }
            return datatips;
        };

        ns.core.Datatips.prototype[serialize] = function () {
            var attributeStrings = [],
                output = '<datatips ',
                i;

            if (this.bgcolor() !== undefined) {
                attributeStrings.push('bgcolor="' + this.bgcolor().getHexString() + '"');
            }

            if (this.bordercolor() !== undefined) {
                attributeStrings.push('bordercolor="' + this.bordercolor().getHexString() + '"');
            }

            attributeStrings = window.multigraph.utilityFunctions.serializeScalarAttributes(this, scalarAttributes, attributeStrings);

            output += attributeStrings.join(' ');

            if (this.variables().size() !== 0) {
                output += '>';
                for (i = 0; i < this.variables().size(); i++) {
                    output += this.variables().at(i)[serialize]();
                }
                output += '</datatips>';
            } else {
                output += '/>';
            }
            return output;
        };

    });
});
