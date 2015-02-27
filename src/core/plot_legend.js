var Model = require('../../lib/jermaine/src/core/model.js');

var Text = require('./text.js'),
    utilityFunctions = require('../util/utilityFunctions.js'),
    defaultValues = utilityFunctions.getDefaultValuesFromXSD(),
    attributes = utilityFunctions.getKeys(defaultValues.plot.legend);

var PlotLegend = new Model("PlotLegend", function () {
    this.hasA("visible").which.isA("boolean");
    this.hasA("label").which.validatesWith(function (label) {
        return label instanceof Text;
    });

    utilityFunctions.insertDefaults(this, defaultValues.plot.legend, attributes);
});

module.exports = PlotLegend;
