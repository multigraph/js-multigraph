var Model = require('../../lib/jermaine/src/core/model.js');

var RGBColor = require('../math/rgb_color.js'),
    Insets = require('../math/insets.js'),
    utilityFunctions = require('../util/utilityFunctions.js'),
    defaultValues = utilityFunctions.getDefaultValuesFromXSD(),
    attributes = utilityFunctions.getKeys(defaultValues.plotarea);

var Plotarea = new Model("Plotarea", function () {

    this.hasA("margin").which.validatesWith(function (margin) {
        return margin instanceof Insets;
    });

    this.hasA("border").which.isA("integer");

    this.hasA("color").which.validatesWith(function (color) {
        return color === null || color instanceof RGBColor;
    });

    this.hasA("bordercolor").which.validatesWith(function (bordercolor) {
        return bordercolor instanceof RGBColor;
    });

    utilityFunctions.insertDefaults(this, defaultValues.plotarea, attributes);
});

module.exports = Plotarea;
