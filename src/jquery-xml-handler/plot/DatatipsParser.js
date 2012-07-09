if (!window.multigraph) {
    window.multigraph = {};
}

(function (ns) {
    "use strict";

    var scalarAttributes = ["format", "bgalpha", "border", "pad"],
        Variable = ns.Plot.Datatips.Variable;

    ns.jQueryXMLHandler = ns.jQueryXMLHandler ? ns.jQueryXMLHandler : { "mixinfuncs" : [] };
    ns.jQueryXMLHandler.mixinfuncs.push(function (nsObj, parse, serialize) {

        nsObj.Plot.Datatips[parse] = function (xml) {
            var datatips = new nsObj.Plot.Datatips();
            if (xml) {
                if (xml.find("variable").length > 0) {
                    $.each(xml.find("variable"), function(i,e) {
                        datatips.variables().add( nsObj.Plot.Datatips.Variable[parse]($(e)) );
                    });
                }
                datatips.format(xml.attr("format"));
                datatips.bgcolor(ns.math.RGBColor.parse(xml.attr("bgcolor")));
                datatips.bgalpha(xml.attr("bgalpha"));
                datatips.border(ns.utilityFunctions.parseIntegerOrUndefined(xml.attr("border")));
                datatips.bordercolor(ns.math.RGBColor.parse(xml.attr("bordercolor")));
                datatips.pad(ns.utilityFunctions.parseIntegerOrUndefined(xml.attr("pad")));

            }
            return datatips;
        };

        nsObj.Plot.Datatips.prototype[serialize] = function () {
            var attributeStrings = [],
                output = '<datatips ',
                i;

            if (this.bgcolor() !== undefined) {
                attributeStrings.push('bgcolor="' + this.bgcolor().getHexString() + '"');
            }

            if (this.bordercolor() !== undefined) {
                attributeStrings.push('bordercolor="' + this.bordercolor().getHexString() + '"');
            }

            for (i = 0; i < scalarAttributes.length; i++) {
                if (this[scalarAttributes[i]]() !== undefined) {
                    attributeStrings.push(scalarAttributes[i] + '="' + this[scalarAttributes[i]]() + '"');
                }
            }

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
}(window.multigraph));
