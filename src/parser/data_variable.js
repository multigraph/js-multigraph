var DataVariable = require('../core/data_variable.js');

DataVariable.parseXML = function (xml, data) {
    var variable,
        pF = require('../util/parsingFunctions.js'),
        parseAttribute   = pF.parseAttribute,
        DataValue        = require('../core/data_value.js'),
        attr;

    if (xml && pF.getXMLAttr(xml,"id")) {
        variable = new DataVariable(pF.getXMLAttr(xml,"id"));
        parseAttribute(pF.getXMLAttr(xml,"column"),       variable.column,       pF.parseInteger);
        parseAttribute(pF.getXMLAttr(xml,"type"),         variable.type,         DataValue.parseType);
        //parseAttribute(pF.getXMLAttr(xml,"missingvalue"), variable.missingvalue, pF.parseDataValue(variable.type()));
        parseAttribute(pF.getXMLAttr(xml,"missingvalue"), variable.missingvalue, function(v) { return DataValue.parse(variable.type(), v); });
        parseAttribute(pF.getXMLAttr(xml,"missingop"),    variable.missingop,    DataValue.parseComparator);
    }
    return variable;
};

module.exports = DataVariable;
