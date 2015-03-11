var DataVariable = require('../../core/data_variable.js');

//  "variable" : {
//      "id"           : STRING!,
//      "column"       : INTEGER,
//      "type"         : DATATYPE(number),
//      "missingvalue" : STRING,
//      "missingop"    : COMPARATOR,
//  }
DataVariable.parseJSON = function (json, data) {
    var variable,
        pF             = require('../../util/parsingFunctions.js'),
        parseAttribute = pF.parseAttribute,
        DataValue      = require('../../core/data_value.js'),
        attr;

    if (json && json.id) {
        variable = new DataVariable(json.id);
        parseAttribute(json.column,       variable.column);
        parseAttribute(json.type,         variable.type,         DataValue.parseType);
        parseAttribute(json.missingvalue, variable.missingvalue, function(v) { return DataValue.parse(variable.type(), v); });
        parseAttribute(json.missingop,    variable.missingop,    DataValue.parseComparator);
    }
    return variable;
};

module.exports = DataVariable;
