window.multigraph.util.namespace("window.multigraph.parser.jquery", function (ns) {
    "use strict";

    var scalarAttributes = ["border"];
    ns.mixin.add(function(ns, parse, serialize) {
        
        ns.core.Plotarea[parse] = function (xml) {
            var plotarea = new ns.core.Plotarea();
            if (xml) {
                plotarea.margin().bottom(window.multigraph.utilityFunctions.parseIntegerOrUndefined(xml.attr("marginbottom")));
                plotarea.margin().left(window.multigraph.utilityFunctions.parseIntegerOrUndefined(xml.attr("marginleft")));
                plotarea.margin().top(window.multigraph.utilityFunctions.parseIntegerOrUndefined(xml.attr("margintop")));
                plotarea.margin().right(window.multigraph.utilityFunctions.parseIntegerOrUndefined(xml.attr("marginright")));
                plotarea.border(window.multigraph.utilityFunctions.parseIntegerOrUndefined(xml.attr("border")));
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

            attributeStrings = window.multigraph.utilityFunctions.serializeScalarAttributes(this, scalarAttributes, attributeStrings);

            output += attributeStrings.join(' ') + '/>';

            return output;
        };

    });
});
