var Pan = require('../core/pan.js');

Pan.parseXML = function (xml, type) {
    var pan            = new Pan(),
        pF             = require('../util/parsingFunctions.js'),
        DataValue      = require('../core/data_value.js'),
        parseAttribute = pF.parseAttribute,
        parseDataValue = function(v) { return DataValue.parse(type, v); };
    if (xml) {
        parseAttribute(pF.getXMLAttr(xml,"allowed"), pan.allowed, pF.parseBoolean);
        parseAttribute(pF.getXMLAttr(xml,"min"),     pan.min,     parseDataValue);
        parseAttribute(pF.getXMLAttr(xml,"max"),     pan.max,     parseDataValue);
    }
    return pan;
};

module.exports = Pan;
