window.multigraph.util.namespace("window.multigraph.parser.jquery", function (ns) {
    "use strict";

    var scalarAttributes = ["missingvalue", "missingop"];

    ns.mixin.add(function (ns, parse, serialize) {

        ns.core.Variables[parse] = function (xml, data) {
            var variables = new ns.core.Variables();
            if (xml) {
                variables.missingvalue(xml.attr("missingvalue"));
                variables.missingop(xml.attr("missingop"));
                if (xml.find(">variable").length > 0) {
                    $.each(xml.find(">variable"), function (i,e) {
                        variables.variable().add( ns.core.DataVariable[parse]($(e), data) );
                    });
                }
            }
            return variables;
        };

        ns.core.Variables.prototype[serialize] = function () {
            var attributeStrings = [],
                output = '<variables ',
                i;

            attributeStrings = window.multigraph.utilityFunctions.serializeScalarAttributes(this, scalarAttributes, attributeStrings);

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
});
