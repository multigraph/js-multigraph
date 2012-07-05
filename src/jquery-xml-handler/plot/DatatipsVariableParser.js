if (!window.multigraph) {
    window.multigraph = {};
}

(function (ns) {
    "use strict";

    var scalarAttributes = ["format"];
    ns.jQueryXMLHandler = ns.jQueryXMLHandler ? ns.jQueryXMLHandler : { "mixinfuncs" : [] };
    ns.jQueryXMLHandler.mixinfuncs.push(function (nsObj, parse, serialize) {
        
        nsObj.Plot.Datatips.Variable[parse] = function (xml) {
            var variable = new nsObj.Plot.Datatips.Variable();
            if (xml) {
                variable.format(xml.attr("format"));
            }
            return variable;
        };
        
        nsObj.Plot.Datatips.Variable.prototype[serialize] = function () {
            var attributeStrings = [],
                output = '<variable ',
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
