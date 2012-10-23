window.multigraph.util.namespace("window.multigraph.parser.jquery", function (ns) {
    "use strict";

    var scalarAttributes = ["border"];
    ns.mixin.add(function (ns, parse, serialize) {
        
        ns.core.Plotarea[parse] = function (xml) {
            var plotarea = new ns.core.Plotarea();
            if (xml) {
                if (xml.attr("marginbottom") !== undefined) {
                    plotarea.margin().bottom(parseInt(xml.attr("marginbottom"), 10));
                }
                if (xml.attr("marginleft") !== undefined) {
                    plotarea.margin().left(parseInt(xml.attr("marginleft"), 10));
                }
                if (xml.attr("margintop") !== undefined) {
                    plotarea.margin().top(parseInt(xml.attr("margintop"), 10));
                }
                if (xml.attr("marginright") !== undefined) {
                    plotarea.margin().right(parseInt(xml.attr("marginright"), 10));
                }
                if (xml.attr("border") !== undefined) {
                    plotarea.border(parseInt(xml.attr("border"), 10));
                }
                if (xml.attr("color") !== undefined) {
                    plotarea.color(ns.math.RGBColor.parse(xml.attr("color")));
                }
                plotarea.bordercolor(ns.math.RGBColor.parse(xml.attr("bordercolor")));
            }
            return plotarea;
        };
        
        ns.core.Plotarea.prototype[serialize] = function () {
            var attributeStrings = [],
                output = '<plotarea ';

            attributeStrings.push('margintop="' + this.margin().top() + '"');
            attributeStrings.push('marginleft="' + this.margin().left() + '"');
            attributeStrings.push('marginbottom="' + this.margin().bottom() + '"');
            attributeStrings.push('marginright="' + this.margin().right() + '"');

            if (this.bordercolor() !== undefined) {
                attributeStrings.push('bordercolor="' + this.bordercolor().getHexString() + '"');
            }

            if (this.color() !== undefined && this.color() !== null) {
                attributeStrings.push('color="' + this.color().getHexString() + '"');
            }

            attributeStrings = window.multigraph.utilityFunctions.serializeScalarAttributes(this, scalarAttributes, attributeStrings);

            output += attributeStrings.join(' ') + '/>';

            return output;
        };

    });
});
