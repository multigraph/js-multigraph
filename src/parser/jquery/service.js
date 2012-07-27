window.multigraph.util.namespace("window.multigraph.parser.jquery", function (ns) {
    "use strict";

    var scalarAttributes = ["location"];

    ns.mixin.add(function (ns, parse, serialize) {
        
        ns.core.Service[parse] = function (xml) {
            var service = new ns.core.Service();
            if (xml) {
                service.location(xml.attr("location"));
            }
            return service;
        };
        
        ns.core.Service.prototype[serialize] = function () {
            var attributeStrings = [],
                output = '<service ';

            attributeStrings = window.multigraph.utilityFunctions.serializeScalarAttributes(this, scalarAttributes, attributeStrings);

            output += attributeStrings.join(' ') + '/>';

            return output;
        };

    });
});
