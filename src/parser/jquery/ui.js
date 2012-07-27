window.multigraph.util.namespace("window.multigraph.parser.jquery", function (ns) {
    "use strict";

    var scalarAttributes = ["eventhandler"];
    ns.mixin.add(function(ns, parse, serialize) {
        
        ns.core.UI[parse] = function (xml) {
            var ui = new ns.core.UI();
            if (xml) {
                ui.eventhandler(xml.attr("eventhandler"));
            }
            return ui;
        };
        
        ns.core.UI.prototype[serialize] = function () {
            var attributeStrings = [],
                output = '<ui ';

            attributeStrings = window.multigraph.utilityFunctions.serializeScalarAttributes(this, scalarAttributes, attributeStrings);

            output += attributeStrings.join(' ') + '/>';

            return output;
        };

    });
});
