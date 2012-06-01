if (!window.multigraph) {
    window.multigraph = {};
}

if (!window.multigraph.Axis) {
    window.multigraph.Axis = {};
}

(function (ns) {
    "use strict";

    var attributes = ['allowed', 'min', 'max', 'anchor'];
    ns.jQueryXMLHandler = ns.jQueryXMLHandler ? ns.jQueryXMLHandler : { 'mixinfuncs' : [] };
    ns.jQueryXMLHandler.mixinfuncs.push(function (nsObj, parse, serialize) {
        
        nsObj.Axis.Zoom[parse] = function (xml) {
            var zoom = new nsObj.Axis.Zoom();
            if (xml) {
                zoom.allowed(xml.attr('allowed'));
                zoom.min(xml.attr('min'));
                zoom.max(xml.attr('max'));
                zoom.anchor(xml.attr('anchor'));
            }
            return zoom;
        };
        
        nsObj.Axis.Zoom.prototype[serialize] = function () {
            var attributeStrings = [],
                i;
            attributeStrings.push('zoom');

            for (i = 0; i < attributes.length; i++) {
                if (this[attributes[i]]() !== undefined) {
                    attributeStrings.push(attributes[i] + '="' + this[attributes[i]]() + '"');
                }
            }

            return '<' + attributeStrings.join(' ') + '/>';
        };

    });
}(window.multigraph));
