window.multigraph.util.namespace("window.multigraph.serializer", function (ns) {
    "use strict";

    var scalarAttributes = ["format", "bgalpha", "border", "pad"];

    ns.mixin.add(function (ns, serialize) {

        ns.core.Datatips.prototype[serialize] = function () {
            var attributeStrings = [],
                output = '<datatips ',
                i;

            if (this.bgcolor() !== undefined) {
                attributeStrings.push('bgcolor="' + this.bgcolor().getHexString() + '"');
            }

            if (this.bordercolor() !== undefined) {
                attributeStrings.push('bordercolor="' + this.bordercolor().getHexString() + '"');
            }

            attributeStrings = window.multigraph.utilityFunctions.serializeScalarAttributes(this, scalarAttributes, attributeStrings);

            output += attributeStrings.join(' ');

            if (this.variables().size() !== 0) {
                output += '>';
                for (i = 0; i < this.variables().size(); i++) {
                    output += this.variables().at(i)[serialize]();
                }
                output += '</datatips>';
            } else {
                output += '/>';
            }
            return output;
        };

    });
});
