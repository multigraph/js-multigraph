if (!window.multigraph) {
    window.multigraph = {};
}

(function (ns) {
    "use strict";

    var children = ['variables', 'values', 'csv', 'service'];

    ns.jQueryXMLHandler = ns.jQueryXMLHandler ? ns.jQueryXMLHandler : { 'mixinfuncs' : [] };
    ns.jQueryXMLHandler.mixinfuncs.push(function(nsObj, parse, serialize) {
        
        nsObj.Data[parse] = function(xml, orient) {
            var data = new nsObj.Data(),
                childModels = ['Variables', 'Values', 'CSV', 'Service'],
                i;

            if (xml) {
                for (i = 0; i < children.length; i++) {
                    if (xml.find(children[i]).length > 0) {
                        data[children[i]](ns.Data[childModels[i]][parse](xml.find(children[i])));
                    }
                }

            }
            return data;
        };
        
        nsObj.Data.prototype[serialize] = function() {
            var childStrings = [],
                output,
                i;

            output = '<data';

            for (i = 0; i < children.length; i++) {
                if (this[children[i]]()) {
                    childStrings.push(this[children[i]]()[serialize]());
                }
            }

            if (childStrings.length > 0) {
                output += '>' + childStrings.join('') + '</data>';
            } else {
                output += '/>';
            }

            return output;
        };

    });
}(window.multigraph));
