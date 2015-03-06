var jermaine = require('../../lib/jermaine/src/jermaine.js');

var DatatipsVariable = require('./datatips_variable.js'),
    utilityFunctions = require('../util/utilityFunctions.js'),
    RGBColor = require('../math/rgb_color.js'),
    defaultValues = utilityFunctions.getDefaultValuesFromXSD(),
    attributes = utilityFunctions.getKeys(defaultValues.plot.datatips);

var Datatips = new jermaine.Model("Datatips", function () {
    this.hasMany("variables").eachOfWhich.validateWith(function (variable) {
        return variable instanceof DatatipsVariable;
    });
    this.hasA("format").which.validatesWith(function (format) {
        return typeof(format) === "string";
    });
    this.hasA("bgcolor").which.validatesWith(function (bgcolor) {
        return bgcolor instanceof RGBColor;
    });
    this.hasA("bgalpha").which.validatesWith(function (bgalpha) {
        return typeof(bgalpha) === "string";
    });
    this.hasA("border").which.isA("integer");
    this.hasA("bordercolor").which.validatesWith(function (bordercolor) {
        return bordercolor instanceof RGBColor;
    });
    this.hasA("pad").which.isA("integer");

    utilityFunctions.insertDefaults(this, defaultValues.plot.datatips, attributes);
});

module.exports = Datatips;
