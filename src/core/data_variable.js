var DataValue = require('./data_value.js');

var utilityFunctions = require('../util/utilityFunctions.js'),
    defaultValues = utilityFunctions.getDefaultValuesFromXSD(),
    attributes = utilityFunctions.getKeys(defaultValues.data.variables.variable);

var DataVariable = new window.jermaine.Model("DataVariable", function () {
    this.hasA("id").which.isA("string");
    this.hasA("column").which.isA("integer");
    this.hasA("type").which.isOneOf(DataValue.types()).and.defaultsTo(DataValue.NUMBER);
    this.hasA("data").which.validatesWith(function (data) {
        return data instanceof window.multigraph.core.Data;
    });
    this.hasA("missingvalue").which.validatesWith(DataValue.isInstance);

    this.hasA("missingop").which.isOneOf(DataValue.comparators());
    this.isBuiltWith("id", "%column", "%type");

    utilityFunctions.insertDefaults(this, defaultValues.data.variables.variable, attributes);
});

module_exports = DataVariable;
