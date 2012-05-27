if(!window.multigraph) {
    window.multigraph = {};
}

(function (ns) {
    "use strict";

    var attributes = ['src', 'anchor', 'base', 'position', 'frame'];
    ns.jQueryXMLHandler = ns.jQueryXMLHandler ? ns.jQueryXMLHandler : { 'mixinfuncs' : [] };
    ns.jQueryXMLHandler.mixinfuncs.push(function (nsObj, parse, serialize) {
        
        nsObj.Background.Img[parse] = function (xml) {
            var img = new nsObj.Background.Img();
            if (xml) {
                img.src(xml.attr('src'));
                img.anchor(xml.attr('anchor'));
                img.base(xml.attr('base'));
                img.position(xml.attr('position'));
                img.frame(xml.attr('frame'));
            }
            return img;
        };
        
        nsObj.Background.Img.prototype[serialize] = function () {
            var attributeStrings = [],
                i;
            attributeStrings.push('img');

            for(i = 0; i < attributes.length; i++) {
                if (this[attributes[i]]() !== undefined) {
                    attributeStrings.push(attributes[i] + '="' + this[attributes[i]]() + '"');
                }
            }

            return '<' + attributeStrings.join(' ') + '/>';
        };

    });
}(window.multigraph));
