if (!window.multigraph) {
    window.multigraph = {};
}

(function (ns) {
    "use strict";

    var scalarAttributes = ["src", "anchor", "base", "position", "frame"];
    ns.jQueryXMLHandler = ns.jQueryXMLHandler ? ns.jQueryXMLHandler : { "mixinfuncs" : [] };
    ns.jQueryXMLHandler.mixinfuncs.push(function (nsObj, parse, serialize) {
        
        nsObj.Background.Img[parse] = function (xml) {
            var img;
            if (xml && xml.attr("src") !== undefined) {
                img = new nsObj.Background.Img(xml.attr("src"));
                img.anchor(xml.attr("anchor"));
                img.base(xml.attr("base"));
                img.position(xml.attr("position"));
                img.frame(xml.attr("frame"));
            }
            return img;
        };
        
        nsObj.Background.Img.prototype[serialize] = function () {
            var attributeStrings = [],
                output = '<img ',
                i;

            for(i = 0; i < scalarAttributes.length; i++) {
                if (this[scalarAttributes[i]]() !== undefined) {
                    attributeStrings.push(scalarAttributes[i] + '="' + this[scalarAttributes[i]]() + '"');
                }
            }

            output += attributeStrings.join(' ') + '/>';

            return output;
        };

    });
}(window.multigraph));
