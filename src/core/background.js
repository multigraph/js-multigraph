var jermaine = require('../../lib/jermaine/src/jermaine.js');

var utilityFunctions = require('../util/utilityFunctions.js'),
    defaultValues    = utilityFunctions.getDefaultValuesFromXSD(),
    attributes       = utilityFunctions.getKeys(defaultValues.background),
    RGBColor         = require('../math/rgb_color.js'),
    Img              = require('./img.js');

var Background = new jermaine.Model("Background", function () {
    this.hasA("color").which.validatesWith(function (color) {
        return color instanceof RGBColor;
    }).defaultsTo(RGBColor.parse(defaultValues.background.color));
    this.hasA("img").which.validatesWith(function (img) {
        return img instanceof Img;
    });
});

module.exports = Background;
