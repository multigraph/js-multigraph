var Icon = require('../../core/icon.js');

// <icon border="2" width="30" height="20"/>
Icon.parseXML = function (xml) {

    var icon = new Icon(),
        pF = require('../../util/parsingFunctions.js'),
        parseAttribute   = pF.parseAttribute,
        parseInteger     = pF.parseInteger;
    if (xml) {
        parseAttribute(pF.getXMLAttr(xml,"height"), icon.height, parseInteger);
        parseAttribute(pF.getXMLAttr(xml,"width"),  icon.width,  parseInteger);
        parseAttribute(pF.getXMLAttr(xml,"border"), icon.border, parseInteger);
    }
    return icon;
};

module.exports = Icon;
