window.multigraph.util.namespace("window.multigraph.parser.jquery", function (ns) {
    "use strict";

    var scalarAttributes = ["location"];

    ns.mixin.add(function (ns, parse, serialize) {
        
        ns.core.CSV[parse] = function (xml) {
            var csv = new ns.core.CSV();
            if (xml) {
                csv.location(xml.attr("location"));
            }
            return csv;
        };
        
        ns.core.CSV.prototype[serialize] = function () {
            var attributeStrings = [],
                output = '<csv ';

            attributeStrings = window.multigraph.utilityFunctions.serializeScalarAttributes(this, scalarAttributes, attributeStrings);

            output += attributeStrings.join(' ') + '/>';

            return output;
        };

    });
});
