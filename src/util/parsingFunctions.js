var ParsingFunctions = {};

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
ParsingFunctions.parseAttribute = function (value, attribute, preprocessor) {
    if (value !== undefined) {
        attribute((preprocessor !== undefined) ? preprocessor(value) : value);
        return true;
    }
    return false;
};

/**
 * Parses a string argument with a radix of 10 and returns an integer.
 *
 * @method parseInteger
 * @param {String} value
 * @static
 * @return {Integer}
 */
ParsingFunctions.parseInteger = function (value) {
    return parseInt(value, 10);
};

//mbp
///**
// * Returns a curried function that parses a value into a DataValue of the specified type.
// *
// * @method parseDataValue
// * @param {String} type
// * @static
// * @return {Function}
// */
//ParsingFunctions.parseDataValue = function (type) {
//    return function (value) {
//        return window.multigraph.core.DataValue.parse(type, value);
//    };
//};

//mbp
///**
// * Returns a curried function that parses a value into a DataMeasure of the specified type.
// *
// * @method parseDataMeasure
// * @param {String} type
// * @static
// * @return {Function}
// */
//ParsingFunctions.parseDataMeasure = function (type) {
//    return function (value) {
//        return window.multigraph.core.DataMeasure.parse(type, value);
//    };
//};

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
ParsingFunctions.parseBoolean = function (param) {
    if (typeof(param) === "string") {
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
    } else {
        return param;
    }
};

/*
 * The ParsingFunctions.getXMLAttr() function returns the value of an attribute for
 * an XML document node.
 * 
 * The `node` argument should be a node in an XML document as returned by the jQuery
 * parseXML function.
 * 
 * The `attrname` argument should be a string which is the name of an attribute.
 * 
 * This function ensures to return "undefined" if the node does not have the attribute.
 * 
 * This function itself does not depend on jQuery, which is why it is located in this
 * file -- so that code needing to use this function don't have to require jQuery just
 * for this function.  (The use of this function does require jQuery at some point in
 * the program, because this `node` object must be a jQuery object representing an XML
 * document.)
 * 
 * The reason we have this function for extracting attribute values, rather than
 * just calling node.attr(attrname) directly, is that in some cases node.attr()
 * returns the empty string for attributes which have not been set.  This function
 * uses the hasAttribute() method to check to see whether the attribute value
 * is present, and always returns `undefined` if it is not.
 */
ParsingFunctions.getXMLAttr = function(node, attrname) {
    if (node.length >= 1 && node[0].hasAttribute(attrname)) {
        return node.attr(attrname);
    }
    return undefined;
};

module.exports = ParsingFunctions;
