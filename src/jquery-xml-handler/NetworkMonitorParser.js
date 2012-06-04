if (!window.multigraph) {
    window.multigraph = {};
}

(function (ns) {
    "use strict";

    var attributes = ['visible', 'fixed'];
    ns.jQueryXMLHandler = ns.jQueryXMLHandler ? ns.jQueryXMLHandler : { 'mixinfuncs' : [] };
    ns.jQueryXMLHandler.mixinfuncs.push(function(nsObj, parse, serialize) {
        
        nsObj.NetworkMonitor[parse] = function (xml) {
            var networkmonitor = new nsObj.NetworkMonitor();
            if (xml) {
                networkmonitor.visible(xml.attr('visible'));
                networkmonitor.fixed(xml.attr('fixed'));
            }
            return networkmonitor;
        };
        
        nsObj.NetworkMonitor.prototype[serialize] = function () {
            var attributeStrings = [],
                i;
            attributeStrings.push('networkmonitor');

            for (i = 0; i < attributes.length; i++) {
                if (this[attributes[i]]() !== undefined) {
                    attributeStrings.push(attributes[i] + '="' + this[attributes[i]]() + '"');
                }
            }
            return '<' + attributeStrings.join(' ') + '/>';
        };

    });
}(window.multigraph));
