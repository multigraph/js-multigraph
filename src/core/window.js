var Model = require('../../lib/jermaine/src/core/model.js');

var Insets = require('../math/insets.js'),
    RGBColor = require('../math/rgb_color.js'),
    utilityFunctions = require('../util/utilityFunctions.js'),
    defaultValues = utilityFunctions.getDefaultValuesFromXSD(),
    attributes = utilityFunctions.getKeys(defaultValues.window);

var Window = new Model("Window", function () {

    this.hasA("width").which.isA("integer");

    this.hasA("height").which.isA("integer");

    this.hasA("border").which.isA("integer");

    this.hasA("margin").which.validatesWith(function (margin) {
        return margin instanceof Insets;
    });

    this.hasA("padding").which.validatesWith(function (padding) {
        return padding instanceof Insets;
    });

    this.hasA("bordercolor").which.validatesWith(function (bordercolor) {
        return bordercolor instanceof RGBColor;
    });

    utilityFunctions.insertDefaults(this, defaultValues.window, attributes);
});

module.exports = Window;
