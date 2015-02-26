var utilityFunctions = require('../util/utilityFunctions.js'),
    defaultValues = utilityFunctions.getDefaultValuesFromXSD(),
    attributes = utilityFunctions.getKeys(defaultValues.plot.filter.option);

var FilterOption = new window.jermaine.Model("FilterOption", function () {
    this.hasA("name").which.validatesWith(function (name) {
        return typeof(name) === "string";
    });
    this.hasA("value").which.validatesWith(function (value) {
        return typeof(value) === "string";
    });

    utilityFunctions.insertDefaults(this, defaultValues.plot.filter.option, attributes);
});

module.exports = FilterOption;
