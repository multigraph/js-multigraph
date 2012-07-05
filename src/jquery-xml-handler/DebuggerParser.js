if (!window.multigraph) {
    window.multigraph = {};
}

(function (ns) {
    "use strict";

    var scalarAttributes = ["visible", "fixed"];
    ns.jQueryXMLHandler = ns.jQueryXMLHandler ? ns.jQueryXMLHandler : { "mixinfuncs" : [] };
    ns.jQueryXMLHandler.mixinfuncs.push(function(nsObj, parse, serialize) {
        
        nsObj.Debugger[parse] = function (xml) {
            var debug = new nsObj.Debugger();
            if (xml) {
                debug.visible(xml.attr("visible"));
                debug.fixed(xml.attr("fixed"));
            }
            return debug;
        };
        
        nsObj.Debugger.prototype[serialize] = function () {
            var attributeStrings = [],
                output = '<debugger ',
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
