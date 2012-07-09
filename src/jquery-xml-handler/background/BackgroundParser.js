if (!window.multigraph) {
    window.multigraph = {};
}

(function (ns) {
    "use strict";

    ns.jQueryXMLHandler = ns.jQueryXMLHandler ? ns.jQueryXMLHandler : { "mixinfuncs" : [] };
    ns.jQueryXMLHandler.mixinfuncs.push(function (nsObj, parse, serialize) {

        nsObj.Background[parse] = function (xml) {
            var background = new nsObj.Background();
            if (xml) {
                background.color(nsObj.math.RGBColor.parse(xml.attr("color")));
                if (xml.find("img").length > 0) {
                    background.img(nsObj.Background.Img[parse](xml.find("img")));
                }
            }
            return background;
        };

        nsObj.Background.prototype[serialize] = function () {
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
}(window.multigraph));
