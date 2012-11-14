window.multigraph.util.namespace("window.multigraph.serializer", function (ns) {
    "use strict";

    var scalarAttributes = ["border"];
    ns.mixin.add(function (ns, serialize) {

        ns.core.Plotarea.prototype[serialize] = function () {
            var attributeStrings = [],
                output = '<plotarea ';

            attributeStrings.push('margintop="' + this.margin().top() + '"');
            attributeStrings.push('marginleft="' + this.margin().left() + '"');
            attributeStrings.push('marginbottom="' + this.margin().bottom() + '"');
            attributeStrings.push('marginright="' + this.margin().right() + '"');

            if (this.bordercolor() !== undefined) {
                attributeStrings.push('bordercolor="' + this.bordercolor().getHexString() + '"');
            }

            if (this.color() !== undefined && this.color() !== null) {
                attributeStrings.push('color="' + this.color().getHexString() + '"');
            }

            attributeStrings = window.multigraph.utilityFunctions.serializeScalarAttributes(this, scalarAttributes, attributeStrings);

            output += attributeStrings.join(' ') + '/>';

            return output;
        };

    });
});
