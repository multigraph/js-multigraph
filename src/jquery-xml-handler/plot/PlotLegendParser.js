if (!window.multigraph) {
    window.multigraph = {};
}

(function (ns) {
    "use strict";

    var scalarAttributes = ["visible", "label"];
    ns.jQueryXMLHandler = ns.jQueryXMLHandler ? ns.jQueryXMLHandler : { "mixinfuncs" : [] };
    ns.jQueryXMLHandler.mixinfuncs.push(function (nsObj, parse, serialize) {
        
        nsObj.Plot.Legend[parse] = function (xml) {
            var legend = new nsObj.Plot.Legend();
            if (xml) {
                legend.visible(xml.attr("visible"));
                legend.label(xml.attr("label"));
            }
            return legend;
        };
        
        nsObj.Plot.Legend.prototype[serialize] = function () {
            var attributeStrings = [],
                output = '<legend ',
                i;

            for(i = 0; i < scalarAttributes.length; i++) {
                if (this[scalarAttributes[i]]() !== undefined) {
                    attributeStrings.push(scalarAttributes[i] + '="' + this[scalarAttributes[i]]() + '"');
                }
            }

            output += attributeStrings.join(' ') + '/>';

            return output;
        };

    });
}(window.multigraph));
