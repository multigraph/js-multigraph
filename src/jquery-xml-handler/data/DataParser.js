if (!window.multigraph) {
    window.multigraph = {};
}

(function (ns) {
    "use strict";

    var children = ["variables", "values", "csv", "service"];

    ns.jQueryXMLMixin.add(function(nsObj, parse, serialize) {
        
        nsObj.Data[parse] = function (xml, orient) {
            var data = new nsObj.Data(),
                childModelNames = ["Variables", "Values", "CSV", "Service"],
                i;

            if (xml) {
                for (i = 0; i < children.length; i++) {
                    if (xml.find(children[i]).length > 0) {
                        data[children[i]](ns.Data[childModelNames[i]][parse](xml.find(children[i])));
                    }
                }

            }
            return data;
        };
        
        nsObj.Data.prototype[serialize] = function () {
            var childStrings = [],
                output = '<data',
                i;

            childStrings = ns.utilityFunctions.serializeChildModels(this, children, childStrings, serialize);
/*
            for (i = 0; i < children.length; i++) {
                if (this[children[i]]()) {
                    childStrings.push(this[children[i]]()[serialize]());
                }
            }
*/

            if (childStrings.length > 0) {
                output += '>' + childStrings.join('') + '</data>';
            } else {
                output += '/>';
            }

            return output;
        };

    });
}(window.multigraph));
