window.multigraph.util.namespace("window.multigraph.utilityFunctions", function (ns) {
    "use strict";

    ns.serializeScalarAttributes = function (elem, scalarAttributes, attributeStrings) {
        var i;

        for (i = 0; i < scalarAttributes.length; i++) {
            if (elem[scalarAttributes[i]]() !== undefined) {
                attributeStrings.push(scalarAttributes[i] + '="' + elem[scalarAttributes[i]]() + '"');
            }
        }

        return attributeStrings;
    };

});
