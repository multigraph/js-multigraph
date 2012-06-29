if (!window.multigraph) {
    window.multigraph = {};
}

if (!window.multigraph.utilityFunctions) {
    window.multigraph.utilityFunctions = {};
}

(function (ns) {
    "use strict";

    ns.utilityFunctions.validateColor = function (color) {
        return typeof(color) === 'string';
    };

    ns.utilityFunctions.validateInteger = function (number) {
        return (typeof(number) === 'number') && (number === parseInt(number));
    };

    ns.utilityFunctions.validateDouble = function (number) {
        return typeof(number) === 'string' || typeof(number) === 'number';
    };

    ns.utilityFunctions.validateNumberRange = function (number, lowerBound, upperBound) {
        return typeof(number) === 'string' ||
            (typeof(number) === 'number' && number >= lowerBound && number <= upperBound);
    };

    ns.utilityFunctions.validateCoordinatePair = function (coord) {
        return typeof(coord) === 'string';
    };

}(window.multigraph));
