window.multigraph.util.namespace("window.multigraph.utilityFunctions", function (ns) {
    "use strict";

    /**
     * The Utility Functions module provides utility functions which correspond to general concepts.
     *
     * @module multigraph
     * @submodule utilityfunctions
     * @main utilityfunctions
     */

    /**
     * Functions which provide abstractions for the parser.
     *
     * @class ParsingFunctions
     * @for ParsingFunctions
     * @static
     */

    /**
     * Abstract function for parsing and setting jermaine attributes which do not require
     * extremely complicated logic to determine their values. Any attributes which require
     * complex logic to determine their proper values should be explicitly set in the parser.
     *
     * @method parseAttribute
     * @param {String} value
     * @param {Function} attribute
     * @param {Function} preprocessor
     * @static
     * @return {Boolean}
     */
    ns.parseAttribute = function (value, attribute, preprocessor) {
        if (value !== undefined) {
            attribute(preprocessor(value));
            return true;
        }
        return false;
    };
    
    /**
     * Parses String attributes.
     *
     * @method parseString
     * @param {String} value
     * @static
     * @return {String}
     */
    ns.parseString = function (value) {
        return value;
    };

    /**
     * Parses a string argument with a radix of 10 and returns an integer.
     *
     * @method parseInteger
     * @param {String} value
     * @static
     * @return {Integer}
     */
    ns.parseInteger = function (value) {
        return parseInt(value, 10);
    };

    /**
     * Returns a curried function that parses a value into a DataValue of the specified type.
     *
     * @method parseDataValue
     * @param {String} type
     * @static
     * @return {Function}
     */
    ns.parseDataValue = function (type) {
        return function (value) {
            return window.multigraph.core.DataValue.parse(type, value);
        };
    };

    /**
     * Returns a curried function that parses a value into a DataMeasure of the specified type.
     *
     * @method parseDataMeasure
     * @param {String} type
     * @static
     * @return {Function}
     */
    ns.parseDataMeasure = function (type) {
        return function (value) {
            return window.multigraph.core.DataMeasure.parse(type, value);
        };
    };

    /**
     * Parses the allowed Boolean Strings and returns the appropriate value. If the parameter
     * is not one of the allowed values then the parameter is returned as an error might not
     * need to be thrown immediately.
     *
     * @method parseBoolean
     * @param {String} param
     * @static
     * @return {Boolean}
     */
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
