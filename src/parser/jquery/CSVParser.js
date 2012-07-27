if (!window.multigraph) {
    window.multigraph = {};
}

if (!window.multigraph.Data) {
    window.multigraph.Data = {};
}

(function (ns) {
    "use strict";

    var scalarAttributes = ["location"];

    ns.jQueryXMLMixin.add(function (nsObj, parse, serialize) {
        
        nsObj.Data.CSV[parse] = function (xml) {
            var csv = new nsObj.Data.CSV();
            if (xml) {
                csv.location(xml.attr("location"));
            }
            return csv;
        };
        
        nsObj.Data.CSV.prototype[serialize] = function () {
            var attributeStrings = [],
                output = '<csv ';

            attributeStrings = ns.utilityFunctions.serializeScalarAttributes(this, scalarAttributes, attributeStrings);

            output += attributeStrings.join(' ') + '/>';

            return output;
        };

    });
}(window.multigraph));
