var DatatipsVariable = require('../../core/datatips_variable.js');

DatatipsVariable.parseXML = function (xml) {
    var variable = new DatatipsVariable(),
        pF = require('../../util/parsingFunctions.js');

    if (xml) {
        pF.parseAttribute(pF.getXMLAttr(xml,"format"), variable.formatString);
    }
    return variable;
};

module.exports = DatatipsVariable;
