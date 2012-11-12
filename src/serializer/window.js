window.multigraph.util.namespace("window.multigraph.serializer", function (ns) {
    "use strict";

    var scalarAttributes = ["width", "height", "border"];
    ns.mixin.add(function (ns, serialize) {

        ns.core.Window.prototype[serialize] = function () {
            var attributeStrings = [],
                output = '<window ';

            attributeStrings.push('margin="' + this.margin().top() + '"');
            attributeStrings.push('padding="' + this.padding().top() + '"');
            if (this.bordercolor() !== undefined) {
                attributeStrings.push('bordercolor="' + this.bordercolor().getHexString() + '"');
            }

            attributeStrings = window.multigraph.utilityFunctions.serializeScalarAttributes(this, scalarAttributes, attributeStrings);

            output += attributeStrings.join(' ') + '/>';

            return output;
        };

    });
});
