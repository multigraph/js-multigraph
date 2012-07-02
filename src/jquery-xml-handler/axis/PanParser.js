if (!window.multigraph) {
    window.multigraph = {};
}

if (!window.multigraph.Axis) {
    window.multigraph.Axis = {};
}

(function (ns) {
    "use strict";

    var scalarAttributes = ['allowed', 'min', 'max'];
    ns.jQueryXMLHandler = ns.jQueryXMLHandler ? ns.jQueryXMLHandler : { 'mixinfuncs' : [] };
    ns.jQueryXMLHandler.mixinfuncs.push(function (nsObj, parse, serialize) {
        
        nsObj.Axis.Pan[parse] = function (xml) {
            var pan = new nsObj.Axis.Pan();
            if (xml) {
                pan.allowed(xml.attr('allowed'));
                pan.min(xml.attr('min'));
                pan.max(xml.attr('max'));
            }
            return pan;
        };
        
        nsObj.Axis.Pan.prototype[serialize] = function () {
            var attributeStrings = [],
                output = '<pan ',
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
