var DatatipsVariable = require('../core/datatips_variable.js');

DatatipsVariable.parseXML = function (xml) {
    var variable = new DatatipsVariable(),
        parsingFunctions = require('../util/parsingFunctions.js');

    if (xml) {
        parsingFunctions.parseAttribute(xml.attr("format"), variable.format, parsingFunctions.parseString);
    }
    return variable;
};

module.exports = DatatipsVariable;
