if (!window.multigraph) {
    window.multigraph = {};
}

(function (ns) {
    "use strict";

    var scalarAttributes = ["src", "frame"];

    ns.jQueryXMLMixin.add(function (nsObj, parse, serialize) {
        
        nsObj.Background.Img[parse] = function (xml) {
            var img;
            if (xml && xml.attr("src") !== undefined) {
                img = new nsObj.Background.Img(xml.attr("src"));
                if (xml.attr("anchor") !== undefined) {
                    img.anchor(ns.math.Point.parse(xml.attr("anchor")));
                }
                if (xml.attr("base") !== undefined) {
                    img.base(ns.math.Point.parse(xml.attr("base")));
                }
                if (xml.attr("position") !== undefined) {
                    img.position(ns.math.Point.parse(xml.attr("position")));
                }
                img.frame(xml.attr("frame"));
            }
            return img;
        };
        
        nsObj.Background.Img.prototype[serialize] = function () {
            var attributeStrings = [],
                output = '<img ';

            attributeStrings = ns.utilityFunctions.serializeScalarAttributes(this, scalarAttributes, attributeStrings);
            attributeStrings.push('anchor="' + this.anchor().serialize() + '"');
            attributeStrings.push('base="' + this.base().serialize() + '"');
            attributeStrings.push('position="' + this.position().serialize() + '"');
            output += attributeStrings.join(' ') + '/>';

            return output;
        };

    });
}(window.multigraph));
