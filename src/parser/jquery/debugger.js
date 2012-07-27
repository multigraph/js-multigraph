window.multigraph.util.namespace("window.multigraph.parser.jquery", function (ns) {
    "use strict";

    var scalarAttributes = ["visible", "fixed"];
    ns.mixin.add(function(ns, parse, serialize) {
        
        ns.core.Debugger[parse] = function (xml) {
            var debug = new ns.core.Debugger();
            if (xml) {
                debug.visible(xml.attr("visible"));
                debug.fixed(xml.attr("fixed"));
            }
            return debug;
        };
        
        ns.core.Debugger.prototype[serialize] = function () {
            var attributeStrings = [],
                output = '<debugger ';

            attributeStrings = window.multigraph.utilityFunctions.serializeScalarAttributes(this, scalarAttributes, attributeStrings);

            output += attributeStrings.join(' ') + '/>';

            return output;
        };

    });
});
