window.multigraph.util.namespace("window.multigraph.utilityFunctions", function (ns) {
    "use strict";

    ns.parseAttribute = function (value, attribute, preprocessor) {
        if (value !== undefined) {
            attribute(preprocessor(value));
            return true;
        }
        return false;
    };
    
    ns.parseString = function (value) {
        return value;
    };

    ns.parseInteger = function (value) {
        return parseInt(value, 10);
    };

    ns.parseDataValue = function (type) {
        return function (value) {
            return window.multigraph.core.DataValue.parse(type, value);
        };
    };

    ns.parseDataMeasure = function (type) {
        return function (value) {
            return window.multigraph.core.DataMeasure.parse(type, value);
        };
    };

    ns.parseBoolean = function (param) {
        switch (param.toLowerCase()) {
            case "true":
            case "yes":
                return true;
            case "false":
            case "no":
                return false;
            default:
                return param;
        }
    };

});
