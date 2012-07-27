window.multigraph.util.namespace("window.multigraph.parser.jquery", function (ns) {
    "use strict";

    ns.mixin.add(function (ns, parse, serialize) {

        ns.core.Background[parse] = function (xml) {
            var background = new ns.core.Background();
            if (xml) {
                background.color(ns.math.RGBColor.parse(xml.attr("color")));
                if (xml.find("img").length > 0) {
                    background.img(ns.core.Img[parse](xml.find("img")));
                }
            }
            return background;
        };

        ns.core.Background.prototype[serialize] = function () {
            var attributeStrings = [],
                output = '<background ';

            if (this.color() !== undefined) {
                attributeStrings.push('color="' + this.color().getHexString() + '"');
            }

            output += attributeStrings.join(' ');
            if (this.img()) {
                output += '>' + this.img()[serialize]() + '</background>';
            } else {
                output += '/>';
            }
            return output;
        };

    });
});
