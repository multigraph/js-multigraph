var Model = require('../../lib/jermaine/src/core/model.js');

var DataValue = require('./data_value.js'),
    NumberMeasure = require('./number_measure.js'),
    DatetimeMeasure = require('./datetime_measure.js');

var DataMeasure = {};

/*
 * Return true or false depending on whether obj is an instance of a DataMeasure type
 */
DataMeasure.isInstance = function (obj) {
    return (obj && (typeof(obj.getRealValue) === "function") && (!obj.compareTo));
};

/*
 * Create a new DataMeasure subtype of a given type by parsing a string
 */
DataMeasure.parse = function (type, string) {
    if (type === DataValue.NUMBER) {
        return NumberMeasure.parse(string);
    } else if (type === DataValue.DATETIME) {
        return DatetimeMeasure.parse(string);
    }
    throw new Error("attempt to parse an unknown DataMeasure type");
};

module.exports = DataMeasure;
