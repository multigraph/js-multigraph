var Pan = require('../../core/pan.js');

Pan.parseJSON = function (json, type) {
    var pan            = new Pan(),
        pF             = require('../../util/parsingFunctions.js'),
        vF             = require('../../util/validationFunctions.js'),
        parseAttribute = pF.parseAttribute,
        parseBoolean   = pF.parseBoolean,
        DataValue      = require('../../core/data_value.js'),
        parseDataValue = function(v) { return DataValue.parse(type, v); };
    if (vF.typeOf(json) === 'boolean') {
        parseAttribute(json,         pan.allowed, parseBoolean);
    } else if (json) {
        parseAttribute(json.allowed, pan.allowed, parseBoolean);
        parseAttribute(json.min,     pan.min,     parseDataValue);
        parseAttribute(json.max,     pan.max,     parseDataValue);
    }
    return pan;
};

module.exports = Pan;
