window.multigraph.util.namespace("window.multigraph.serializer", function (ns) {
    "use strict";

    var scalarAttributes = ["angle"];

    ns.mixin.add(function (ns, serialize) {
        
        ns.core.AxisTitle.prototype[serialize] = function () {
            var attributeStrings = [],
                output = '<title ';

            attributeStrings = window.multigraph.utilityFunctions.serializeScalarAttributes(this, scalarAttributes, attributeStrings);

            if (this.anchor() !== undefined) {
                attributeStrings.push('anchor="' + this.anchor().serialize() + '"');
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
