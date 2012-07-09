if (!window.multigraph) {
    window.multigraph = {};
}

if (!window.multigraph.utilityFunctions) {
    window.multigraph.utilityFunctions = {};
}

(function (ns) {
    "use strict";

    ns.utilityFunctions.serializeScalarAttributes = function (elem, scalarAttributes, attributeStrings) {
        var i;

        for (i = 0; i < scalarAttributes.length; i++) {
            if (elem[scalarAttributes[i]]() !== undefined) {
                attributeStrings.push(scalarAttributes[i] + '="' + elem[scalarAttributes[i]]() + '"');
            }
        }

        return attributeStrings;
    };

    ns.utilityFunctions.serializeChildModels = function (elem, children, childStrings, serialize) {
        var i;

        for (i = 0; i < children.length; i++) {
            if (elem[children[i]]()) {
                childStrings.push(elem[children[i]]()[serialize]());
            }
        }

        return childStrings;
    }

}(window.multigraph));
