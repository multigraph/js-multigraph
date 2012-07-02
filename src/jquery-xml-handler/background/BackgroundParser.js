if(!window.multigraph) {
    window.multigraph = {};
}

(function (ns) {
    "use strict";

    var scalarAttributes = ['color'],
        Img = ns.Background.Img,
        i;

    ns.jQueryXMLHandler = ns.jQueryXMLHandler ? ns.jQueryXMLHandler : { 'mixinfuncs' : [] };
    ns.jQueryXMLHandler.mixinfuncs.push(function (nsObj, parse, serialize) {

        nsObj.Background[parse] = function (xml) {
            var background = new nsObj.Background();
            if (xml) {
                background.color(xml.attr('color'));
                if (xml.find('img').length > 0) {
                    background.img(Img[parse](xml.find("img")));
                }
            }
            return background;
        };

        nsObj.Background.prototype[serialize] = function () {
            var attributeStrings = [],
                output = '<background ',
                i;

            for (i = 0; i < scalarAttributes.length; i++) {
                if (this[scalarAttributes[i]]() !== undefined) {
                    attributeStrings.push(scalarAttributes[i] + '="' + this[scalarAttributes[i]]() + '"');
                }
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
