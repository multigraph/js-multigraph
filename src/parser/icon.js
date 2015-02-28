var Icon = require('../core/icon.js');

Icon.parseXML = function (xml) {
    var icon = new Icon(),
        parsingFunctions = require('../util/parsingFunctions.js'),
        parseAttribute   = parsingFunctions.parseAttribute,
        parseInteger     = parsingFunctions.parseInteger;
    if (xml) {
        parseAttribute(xml.attr("height"), icon.height, parseInteger);
        parseAttribute(xml.attr("width"),  icon.width,  parseInteger);
        parseAttribute(xml.attr("border"), icon.border, parseInteger);
    }
    return icon;
};

module.exports = Icon;
