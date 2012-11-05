window.multigraph.util.namespace("window.multigraph.serializer", function (ns) {
    "use strict";

    var scalarAttributes = ["src", "frame"];

    ns.mixin.add(function (ns, serialize) {

        ns.core.Img.prototype[serialize] = function () {
            var attributeStrings = [],
                output = '<img ';

            attributeStrings = window.multigraph.utilityFunctions.serializeScalarAttributes(this, scalarAttributes, attributeStrings);
            if (this.anchor() !== undefined) {
                attributeStrings.push('anchor="' + this.anchor().serialize() + '"');
            }
            if (this.base() !== undefined) {
                attributeStrings.push('base="' + this.base().serialize() + '"');
            }
            if (this.position() !== undefined) {
                attributeStrings.push('position="' + this.position().serialize() + '"');
            }
            output += attributeStrings.join(' ') + '/>';

            return output;
        };

    });
});
