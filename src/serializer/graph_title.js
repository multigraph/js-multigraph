window.multigraph.util.namespace("window.multigraph.serializer", function (ns) {
    "use strict";

    var scalarAttributes = ["border", "opacity", "padding", "cornerradius"];

    ns.mixin.add(function (ns, serialize) {

        ns.core.Title.prototype[serialize] = function () {
            var attributeStrings = [],
                output = '<title ';

            if (this.color() !== undefined) {
                attributeStrings.push('color="' + this.color().getHexString() + '"');
            }

            if (this.bordercolor() !== undefined) {
                attributeStrings.push('bordercolor="' + this.bordercolor().getHexString() + '"');
            }

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

            output += attributeStrings.join(' ');

            if (this.content() !== undefined && this.content() !== '') {
                output += '>' + this.content() + '</title>';
            } else {
                output += '/>';
            }

            return output;
        };

    });
});
