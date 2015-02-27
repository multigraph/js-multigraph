var Model = require('../../lib/jermaine/src/core/model.js');

var DataValue = require('./data_value.js'),
    NumberFormatter = require('./number_formatter.js'),
    DatetimeFormatter = require('./datetime_formatter.js');

var DataFormatter = {};
/*
 * Return true or false depending on whether obj is an instance of a DataFormatter type
 */
DataFormatter.isInstance = function (obj) {
    return (obj && (typeof(obj.format) === "function") && (typeof(obj.getMaxLength) === "function"));
};

/*
 * Create a new DataFormatter subtype of a given type
 */
DataFormatter.create = function (type, format) {
    if (type === DataValue.NUMBER) {
        return new NumberFormatter(format);
    } else if (type === DataValue.DATETIME) {
        return new DatetimeFormatter(format);
    }
    throw new Error("attempt to create an unknown DataFormatter type");
};

module.exports = DataFormatter;
