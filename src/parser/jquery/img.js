window.multigraph.util.namespace("window.multigraph.parser.jquery", function (ns) {
    "use strict";

    var scalarAttributes = ["src", "frame"];

    ns.mixin.add(function (ns, parse, serialize) {
        
        ns.core.Img[parse] = function (xml) {
            var img;
            if (xml && xml.attr("src") !== undefined) {
                img = new ns.core.Img(xml.attr("src"));
                if (xml.attr("anchor") !== undefined) {
                    img.anchor(window.multigraph.math.Point.parse(xml.attr("anchor")));
                }
                if (xml.attr("base") !== undefined) {
                    img.base(window.multigraph.math.Point.parse(xml.attr("base")));
                }
                if (xml.attr("position") !== undefined) {
                    img.position(window.multigraph.math.Point.parse(xml.attr("position")));
                }
                img.frame(xml.attr("frame"));
            }
            return img;
        };
        
        ns.core.Img.prototype[serialize] = function () {
            var attributeStrings = [],
                output = '<img ';

            attributeStrings = window.multigraph.utilityFunctions.serializeScalarAttributes(this, scalarAttributes, attributeStrings);
            attributeStrings.push('anchor="' + this.anchor().serialize() + '"');
            attributeStrings.push('base="' + this.base().serialize() + '"');
            attributeStrings.push('position="' + this.position().serialize() + '"');
            output += attributeStrings.join(' ') + '/>';

            return output;
        };

    });
});
