window.multigraph.util.namespace("window.multigraph.parser.jquery", function (ns) {
    "use strict";

    var scalarAttributes = ["border", "opacity", "padding", "cornerradius"];

    ns.mixin.add(function (ns, parse, serialize) {
        
        ns.core.Title[parse] = function (xml) {
            var title = new ns.core.Title();
            if (xml) {
                title.content(xml.text());
                title.border(xml.attr("border"));
                title.color(window.multigraph.math.RGBColor.parse(xml.attr("color")));
                title.bordercolor(window.multigraph.math.RGBColor.parse(xml.attr("bordercolor")));
                if (xml.attr("opacity") !== undefined) {
                    title.opacity(parseFloat(xml.attr("opacity")));
                }
                title.padding(xml.attr("padding"));
                title.cornerradius(xml.attr("cornerradius"));
                if (xml.attr("anchor") !== undefined) {
                    title.anchor(window.multigraph.math.Point.parse(xml.attr("anchor")));
                }
                if (xml.attr("base") !== undefined) {
                    title.base(window.multigraph.math.Point.parse(xml.attr("base")));
                }
                if (xml.attr("position") !== undefined) {
                    title.position(window.multigraph.math.Point.parse(xml.attr("position")));
                }
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

            if (this.anchor() !== undefined) {
                attributeStrings.push('anchor="' + this.anchor().serialize() + '"');
            }
            if (this.base() !== undefined) {
                attributeStrings.push('base="' + this.base().serialize() + '"');
            }
            if (this.position() !== undefined) {
                attributeStrings.push('position="' + this.position().serialize() + '"');
            }

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
