var Model = require('../../lib/jermaine/src/core/model.js');

var DatatipsVariable = require('./datatips_variable.js'),
    utilityFunctions = require('../util/utilityFunctions.js'),
    defaultValues = utilityFunctions.getDefaultValuesFromXSD(),
    attributes = utilityFunctions.getKeys(defaultValues.plot.datatips);

var Datatips = new Model("Datatips", function () {
    this.hasMany("variables").eachOfWhich.validateWith(function (variable) {
        return variable instanceof DatatipsVariable;
    });
    this.hasA("format").which.validatesWith(function (format) {
        return typeof(format) === "string";
    });
    this.hasA("bgcolor").which.validatesWith(function (bgcolor) {
        return bgcolor instanceof window.multigraph.math.RGBColor;
    });
    this.hasA("bgalpha").which.validatesWith(function (bgalpha) {
        return typeof(bgalpha) === "string";
    });
    this.hasA("border").which.isA("integer");
    this.hasA("bordercolor").which.validatesWith(function (bordercolor) {
        return bordercolor instanceof window.multigraph.math.RGBColor;
    });
    this.hasA("pad").which.isA("integer");

    utilityFunctions.insertDefaults(this, defaultValues.plot.datatips, attributes);
});

module.exports = Datatips;
