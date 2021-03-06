var jermaine = require('../../lib/jermaine/src/jermaine.js');

var RGBColor = require('../math/rgb_color.js'),
    utilityFunctions = require('../util/utilityFunctions.js'),
    defaultValues = utilityFunctions.getDefaultValuesFromXSD(),
    attributes = utilityFunctions.getKeys(defaultValues.horizontalaxis.grid);

var Grid = new jermaine.Model("Grid", function () {
    this.hasA("color").which.validatesWith(function (color) {
        return color instanceof RGBColor;
    });
    this.hasA("visible").which.isA("boolean");

    utilityFunctions.insertDefaults(this, defaultValues.horizontalaxis.grid, attributes);
});

module.exports = Grid;
