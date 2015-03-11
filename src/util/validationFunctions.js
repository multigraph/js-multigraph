var ValidationFunctions = {};

ValidationFunctions.validateNumberRange = function (number, lowerBound, upperBound) {
    return typeof(number) === "number" && number >= lowerBound && number <= upperBound;
};

// This function, from http://javascript.crockford.com/remedial.html, should correctly
// return 'array' for any Array object, including [].
// Returns 'object' for any JS object.
ValidationFunctions.typeOf = function(value) {
    var s = typeof value;
    if (s === 'object') {
        if (value) {
            //NOTE: Crockford used "=="   ?????!!!!!  mbp Fri Sep 28 08:44:34 2012
            //if (Object.prototype.toString.call(value) == '[object Array]') {
            if (Object.prototype.toString.call(value) === '[object Array]') {
                s = 'array';
            }
        } else {
            s = 'null';
        }
    }
    return s;
};

ValidationFunctions.isNumberNotNaN = function(x) {
    return (typeof(x) === "number") && (x === x);
};

module.exports = ValidationFunctions;
