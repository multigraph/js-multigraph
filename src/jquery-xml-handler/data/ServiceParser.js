if (!window.multigraph) {
    window.multigraph = {};
}

if (!window.multigraph.Data) {
    window.multigraph.Data = {};
}

(function (ns) {
    "use strict";

    var scalarAttributes = ["location"];
    ns.jQueryXMLHandler = ns.jQueryXMLHandler ? ns.jQueryXMLHandler : { "mixinfuncs" : [] };
    ns.jQueryXMLHandler.mixinfuncs.push(function (nsObj, parse, serialize) {
        
        nsObj.Data.Service[parse] = function (xml) {
            var service = new nsObj.Data.Service();
            if (xml) {
                service.location(xml.attr("location"));
            }
            return service;
        };
        
        nsObj.Data.Service.prototype[serialize] = function () {
            var attributeStrings = [],
                output = '<service ';

            attributeStrings = ns.utilityFunctions.serializeScalarAttributes(this, scalarAttributes, attributeStrings);

            output += attributeStrings.join(' ') + '/>';

            return output;
        };

    });
}(window.multigraph));
