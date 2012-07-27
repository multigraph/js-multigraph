window.multigraph.util.namespace("window.multigraph.utilityFunctions", function (ns) {
    "use strict";
    
    ns.validateColor = function (color) {
        return typeof(color) === "string";
    };
    
    ns.validateInteger = function (number) {
        return (typeof(number) === "number") && (number === parseInt(number,10));
    };
    
    ns.validateDouble = function (number) {
        return typeof(number) === "number";
    };

    ns.validateNumberRange = function (number, lowerBound, upperBound) {
        return typeof(number) === "number" && number >= lowerBound && number <= upperBound;
    };

    ns.validateCoordinatePair = function (coord) {
        return typeof(coord) === "string";
    };
});