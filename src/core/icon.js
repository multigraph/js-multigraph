var Model = require('../../lib/jermaine/src/core/model.js');

var utilityFunctions = require('../util/utilityFunctions.js'),
    defaultValues = utilityFunctions.getDefaultValuesFromXSD(),
    attributes = utilityFunctions.getKeys(defaultValues.legend.icon);

var Icon = new Model("Icon", function () {
    this.hasA("height").which.isA("integer");
    this.hasA("width").which.isA("integer");
    this.hasA("border").which.isA("integer");

    utilityFunctions.insertDefaults(this, defaultValues.legend.icon, attributes);
});

module.exports = Icon;
