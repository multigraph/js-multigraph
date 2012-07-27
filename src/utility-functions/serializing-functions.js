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

    ns.serializeChildModels = function (elem, children, childStrings, serialize) {
        var i;

        for (i = 0; i < children.length; i++) {
            if (elem[children[i]]()) {
                childStrings.push(elem[children[i]]()[serialize]());
            }
        }

        return childStrings;
    };
});
