if (!window.multigraph) {
    window.multigraph = {};
}

(function (ns) {
    "use strict";

    var attributes = ['visible', 'fixed'];
    ns.jQueryXMLHandler = ns.jQueryXMLHandler ? ns.jQueryXMLHandler : { 'mixinfuncs' : [] };
    ns.jQueryXMLHandler.mixinfuncs.push(function(nsObj, parse, serialize) {
        
        nsObj.Debugger[parse] = function (xml) {
            var debug = new nsObj.Debugger();
            if (xml) {
                debug.visible(xml.attr('visible'));
                debug.fixed(xml.attr('fixed'));
            }
            return debug;
        };
        
        nsObj.Debugger.prototype[serialize] = function () {
            var attributeStrings = [],
                i;
            attributeStrings.push('debugger');

            for (i = 0; i < attributes.length; i++) {
                if (this[attributes[i]]() !== undefined) {
                    attributeStrings.push(attributes[i] + '="' + this[attributes[i]]() + '"');
                }
            }
            return '<' + attributeStrings.join(' ') + '/>';
        };

    });
}(window.multigraph));
