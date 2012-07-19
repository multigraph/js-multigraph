if (!window.multigraph) {
    window.multigraph = {};
}

(function (ns) {
    "use strict";

    var scalarAttributes = ["format"];

    ns.jQueryXMLMixin.add(function (nsObj, parse, serialize) {
        
        nsObj.Plot.Datatips.Variable[parse] = function (xml) {
            var variable = new nsObj.Plot.Datatips.Variable();
            if (xml) {
                variable.format(xml.attr("format"));
            }
            return variable;
        };
        
        nsObj.Plot.Datatips.Variable.prototype[serialize] = function () {
            var attributeStrings = [],
                output = '<variable ';

            attributeStrings = ns.utilityFunctions.serializeScalarAttributes(this, scalarAttributes, attributeStrings);

            output += attributeStrings.join(' ') + '/>';

            return output;
        };

    });
}(window.multigraph));
