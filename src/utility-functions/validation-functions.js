window.multigraph.util.namespace("window.multigraph.utilityFunctions", function (ns) {
    "use strict";
    
    ns.validateNumberRange = function (number, lowerBound, upperBound) {
        return typeof(number) === "number" && number >= lowerBound && number <= upperBound;
    };

});
