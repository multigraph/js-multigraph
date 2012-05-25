if (!window.multigraph) {
    window.multigraph = {};
}

if (!window.multigraph.utilityFunctions) {
    window.multigraph.utilityFunctions = {};
}

(function (ns) {
    "use strict";

    ns.utilityFunctions.parseInteger = function (number) {
        return parseInt(number);
    };

    ns.utilityFunctions.parseDouble = function (number) {
        return Number(number);
    };

}(window.multigraph));
