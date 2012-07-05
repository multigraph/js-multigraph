if (!window.multigraph) {
    window.multigraph = {};
}

if (!window.multigraph.Axis) {
    window.multigraph.Axis = {};
}

(function (ns) {
    "use strict";

    var scalarAttributes = ["id", "min", "max"];
    ns.jQueryXMLHandler = ns.jQueryXMLHandler ? ns.jQueryXMLHandler : { "mixinfuncs" : [] };
    ns.jQueryXMLHandler.mixinfuncs.push(function (nsObj, parse, serialize) {
        
        nsObj.Axis.Binding[parse] = function (xml) {
            var binding;
            if (xml && xml.attr("id") !== undefined && xml.attr("min") !== undefined && xml.attr("max") !== undefined) {
                binding = new nsObj.Axis.Binding(xml.attr("id"), xml.attr("min"), xml.attr("max"));
            }
            return binding;
        };
        
        nsObj.Axis.Binding.prototype[serialize] = function () {
            var attributeStrings = [],
                output = '<binding ',
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
