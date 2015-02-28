var DataVariable = require('../core/data_variable.js');

DataVariable.parseXML = function (xml, data) {
    var variable,
        parsingFunctions = require('../util/parsingFunctions.js'),
        parseAttribute   = parsingFunctions.parseAttribute,
        DataValue        = require('../core/data_value.js'),
        attr;

    if (xml && xml.attr("id")) {
        variable = new DataVariable(xml.attr("id"));
        parseAttribute(xml.attr("column"),       variable.column,       parsingFunctions.parseInteger);
        parseAttribute(xml.attr("type"),         variable.type,         DataValue.parseType);
        parseAttribute(xml.attr("missingvalue"), variable.missingvalue, parsingFunctions.parseDataValue(variable.type()));
        parseAttribute(xml.attr("missingop"),    variable.missingop,    DataValue.parseComparator);
    }
    return variable;
};

module.exports = DataVariable;
