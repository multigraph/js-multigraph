if (!window.multigraph) {
    window.multigraph = {};
}

if (!window.multigraph.Data) {
    window.multigraph.Data = {};
}

(function (ns) {
    "use strict";

    var scalarAttributes = ["missingvalue", "missingop"];
    ns.jQueryXMLHandler = ns.jQueryXMLHandler ? ns.jQueryXMLHandler : { "mixinfuncs" : [] };
    ns.jQueryXMLHandler.mixinfuncs.push(function (nsObj, parse, serialize) {

        nsObj.Data.Variables[parse] = function (xml) {
            var variables = new nsObj.Data.Variables();
            if (xml) {
                variables.missingvalue(xml.attr("missingvalue"));
                variables.missingop(xml.attr("missingop"));
                if (xml.find(">variable").length > 0) {
                    $.each(xml.find(">variable"), function (i,e) {
                        variables.variable().add( nsObj.Data.Variables.Variable[parse]($(e)) );
                    });
                }
            }
            return variables;
        };

        nsObj.Data.Variables.prototype[serialize] = function () {
            var attributeStrings = [],
                output = '<variables ',
                i;

            attributeStrings = ns.utilityFunctions.serializeScalarAttributes(this, scalarAttributes, attributeStrings);

            output += attributeStrings.join(' ');

            if (this.variable().size() > 0) {
                output += '>';
                for (i = 0; i < this.variable().size(); i++) {
                    output += this.variable().at(i)[serialize]();
                }
                output += '</variables>';
            } else {
                output += '/>';
            }

            return output;
        };

    });
}(window.multigraph));
