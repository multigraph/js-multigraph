var Point = require('../math/point.js');

var utilityFunctions = require('../util/utilityFunctions.js'),
    defaultValues = utilityFunctions.getDefaultValuesFromXSD(),
    attributes = utilityFunctions.getKeys(defaultValues.background.img);

var Img = new window.jermaine.Model("Img", function () {
    this.hasA("src").which.isA("string");
    this.hasA("anchor").which.validatesWith(function (anchor) {
        return anchor instanceof Point;
    });
    this.hasA("base").which.validatesWith(function (base) {
        return base instanceof Point;
    });
    this.hasA("position").which.validatesWith(function (position) {
        return position instanceof Point;
    });
    this.hasA("frame").which.validatesWith(function (frame) {
        return frame === Img.PADDING || frame === Img.PLOT;
    });
    this.isBuiltWith("src");

    utilityFunctions.insertDefaults(this, defaultValues.background.img, attributes);
});

Img.PADDING = "padding";
Img.PLOT    = "plot";

module.exports = Img;
