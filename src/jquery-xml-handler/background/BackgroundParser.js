if(!window.multigraph) {
    window.multigraph = {};
}

(function (ns) {
    "use strict";

    var attributes = ['color'],
        Img = ns.Background.Img,
        i;

    ns.jQueryXMLHandler = ns.jQueryXMLHandler ? ns.jQueryXMLHandler : { 'mixinfuncs' : [] };
    ns.jQueryXMLHandler.mixinfuncs.push(function (nsObj, parse, serialize) {

        nsObj.Background[parse] = function (xml) {
            var background = new nsObj.Background();
            if (xml) {
                background.color(xml.attr('color'));
                if (xml.find('img')) {
                    background.img(Img.parseXML(xml.find("img")));
                }
            }
            return background;
        };

        nsObj.Background.prototype[serialize] = function () {
            var attributeStrings = [],
                output,
                i;

            attributeStrings.push('background');

            for (i = 0; i < attributes.length; i++) {
                if (this[attributes[i]]() !== undefined) {
                    attributeStrings.push(attributes[i] + '="' + this[attributes[i]]() + '"');
                }
            }

            output = '<' + attributeStrings.join(' ');
            if (this.img()) {
                output += '>' + this.img().serialize() + '</background>';
            } else {
                output += '/>';
            }
            return output;
        };

    });
}(window.multigraph));
