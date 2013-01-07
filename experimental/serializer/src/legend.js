window.multigraph.util.namespace("window.multigraph.serializer", function (ns) {
    "use strict";

    var scalarAttributes = ["visible", "frame", "opacity", "border", "rows", "columns", "cornerradius", "padding"];

    ns.mixin.add(function (ns, serialize) {

        ns.core.Legend.prototype[serialize] = function () {
            var attributeStrings = [],
                output = '<legend ';

            if (this.color() !== undefined) {
                attributeStrings.push('color="' + this.color().getHexString() + '"');
            }

            if (this.bordercolor() !== undefined) {
                attributeStrings.push('bordercolor="' + this.bordercolor().getHexString() + '"');
            }

            if (this.base() !== undefined) {
                attributeStrings.push('base="' + this.base().serialize() + '"');
            }

            if (this.anchor() !== undefined) {
                attributeStrings.push('anchor="' + this.anchor().serialize() + '"');
            }

            if (this.position() !== undefined) {
                attributeStrings.push('position="' + this.position().serialize() + '"');
            }

            attributeStrings = window.multigraph.utilityFunctions.serializeScalarAttributes(this, scalarAttributes, attributeStrings);

            output +=  attributeStrings.join(' ');
            if (this.icon()) {
                output += '>' + this.icon()[serialize]() + '</legend>';
            } else {
                output += '/>';
            }
            return output;
        };

    });
});
