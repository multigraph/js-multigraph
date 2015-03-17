var jermaine = require('../../lib/jermaine/src/jermaine.js');

var utilityFunctions = require('../util/utilityFunctions.js'),
    defaultValues = utilityFunctions.getDefaultValuesFromXSD(),
    attributes = utilityFunctions.getKeys(defaultValues.plot.datatips.variable),
    DataFormatter = require('./data_formatter.js');

var DatatipsVariable = new jermaine.Model("DatatipsVariable", function () {
    this.hasA("formatString").which.isA("string");
    this.hasA("formatter").which.validatesWith(DataFormatter.isInstance);

    utilityFunctions.insertDefaults(this, defaultValues.plot.datatips.variable, attributes);
});

module.exports = DatatipsVariable;
