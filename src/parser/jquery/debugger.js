if (!window.multigraph) {
    window.multigraph = {};
}

(function (ns) {
    "use strict";

    var scalarAttributes = ["visible", "fixed"];
    ns.jQueryXMLMixin.add(function(nsObj, parse, serialize) {
        
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
                output = '<debugger ';

            attributeStrings = ns.utilityFunctions.serializeScalarAttributes(this, scalarAttributes, attributeStrings);

            output += attributeStrings.join(' ') + '/>';

            return output;
        };

    });
}(window.multigraph));
