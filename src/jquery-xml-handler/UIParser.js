if (!window.multigraph) {
    window.multigraph = {};
}

(function (ns) {
    "use strict";

    var scalarAttributes = ["eventhandler"];
    ns.jQueryXMLMixin.add(function(nsObj, parse, serialize) {
        
        nsObj.UI[parse] = function (xml) {
            var ui = new nsObj.UI();
            if (xml) {
                ui.eventhandler(xml.attr("eventhandler"));
            }
            return ui;
        };
        
        nsObj.UI.prototype[serialize] = function () {
            var attributeStrings = [],
                output = '<ui ';

            attributeStrings = ns.utilityFunctions.serializeScalarAttributes(this, scalarAttributes, attributeStrings);

            output += attributeStrings.join(' ') + '/>';

            return output;
        };

    });
}(window.multigraph));
