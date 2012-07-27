window.multigraph.util.namespace("window.multigraph.parser.jquery", function (ns) {
    "use strict";

    var scalarAttributes = ["border", "opacity", "padding", "cornerradius", "base", "position", "anchor"];

    ns.mixin.add(function (ns, parse, serialize) {
        
        ns.core.Title[parse] = function (xml) {
            var title = new ns.core.Title();
            if (xml) {
                title.content(xml.text());
                title.border(xml.attr("border"));
                title.color(window.multigraph.math.RGBColor.parse(xml.attr("color")));
                title.bordercolor(window.multigraph.math.RGBColor.parse(xml.attr("bordercolor")));
                title.opacity(ns.utilityFunctions.parseDoubleOrUndefined(xml.attr("opacity")));
                title.padding(xml.attr("padding"));
                title.cornerradius(xml.attr("cornerradius"));
                title.base(xml.attr("base"));
                title.position(xml.attr("position"));
                title.anchor(xml.attr("anchor"));
            }
            return title;
        };

        ns.core.Title.prototype[serialize] = function () {
            var attributeStrings = [],
                output = '<title ';

            if (this.color() !== undefined) {
                attributeStrings.push('color="' + this.color().getHexString() + '"');
            }

            if (this.bordercolor() !== undefined) {
                attributeStrings.push('bordercolor="' + this.bordercolor().getHexString() + '"');
            }

            attributeStrings = window.multigraph.utilityFunctions.serializeScalarAttributes(this, scalarAttributes, attributeStrings);

            output += attributeStrings.join(' ');

            if (this.content() !== undefined && this.content() !== '') {
                output += '>' + this.content() + '</title>';
            } else {
                output += '/>';
            }

            return output;
        };

    });
});
