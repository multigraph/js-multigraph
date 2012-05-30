if(!window.multigraph) {
    window.multigraph = {};
}

(function (ns) {
    "use strict";

    var attributes = ['height', 'width', 'border'];
    ns.jQueryXMLHandler = ns.jQueryXMLHandler ? ns.jQueryXMLHandler : { 'mixinfuncs' : [] };
    ns.jQueryXMLHandler.mixinfuncs.push(function (nsObj, parse, serialize) {
        
        nsObj.Legend.Icon[parse] = function (xml) {
            var icon = new nsObj.Legend.Icon();
            if (xml) {
                icon.height(xml.attr('height'));
                icon.width(xml.attr('width'));
                icon.border(xml.attr('border'));
            }
            return icon;
        };
        
        nsObj.Legend.Icon.prototype[serialize] = function () {
            var attributeStrings = [],
                i;
            attributeStrings.push('icon');

            for (i = 0; i < attributes.length; i++) {
                if (this[attributes[i]]() !== undefined) {
                    attributeStrings.push(attributes[i] + '="' + this[attributes[i]]() + '"');
                }
            }

            return '<' + attributeStrings.join(' ') + '/>';
        };

    });
}(window.multigraph));
