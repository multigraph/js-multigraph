var Pan = require('../core/pan.js');

Pan.parseXML = function (xml, type) {
    var pan = new Pan(),
        parsingFunctions = require('../util/parsingFunctions.js'),
        parseAttribute   = parsingFunctions.parseAttribute,
        parseDataValue   = parsingFunctions.parseDataValue;
    if (xml) {
        parseAttribute(xml.attr("allowed"), pan.allowed, parsingFunctions.parseBoolean);
        parseAttribute(xml.attr("min"),     pan.min,     parseDataValue(type));
        parseAttribute(xml.attr("max"),     pan.max,     parseDataValue(type));
    }
    return pan;
};

module.exports = Pan;
