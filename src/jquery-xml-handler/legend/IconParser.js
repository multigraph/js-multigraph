if(!window.multigraph) {
    window.multigraph = {};
}

(function (ns) {
    "use strict";

    var scalarAttributes = ['height', 'width', 'border'];
    ns.jQueryXMLHandler = ns.jQueryXMLHandler ? ns.jQueryXMLHandler : { 'mixinfuncs' : [] };
    ns.jQueryXMLHandler.mixinfuncs.push(function (nsObj, parse, serialize) {
        
        nsObj.Legend.Icon[parse] = function (xml) {
            var icon = new nsObj.Legend.Icon();
            if (xml) {
                icon.height(xml.attr('height'));
                icon.width(xml.attr('width'));
                icon.border(ns.utilityFunctions.parseIntegerOrUndefined(xml.attr('border')));
            }
            return icon;
        };
        
        nsObj.Legend.Icon.prototype[serialize] = function () {
            var attributeStrings = [],
                output = '<icon ',
                i;

            for (i = 0; i < scalarAttributes.length; i++) {
                if (this[scalarAttributes[i]]() !== undefined) {
                    attributeStrings.push(scalarAttributes[i] + '="' + this[scalarAttributes[i]]() + '"');
                }
            }

            output += attributeStrings.join(' ') + '/>';

            return output;
        };

    });
}(window.multigraph));
