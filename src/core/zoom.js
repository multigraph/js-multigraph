var Model = require('../../lib/jermaine/src/core/model.js');

var DataMeasure = require('./data_measure.js'),
    DataValue = require('./data_value.js');

var utilityFunctions = require('../util/utilityFunctions.js'),
    defaultValues = utilityFunctions.getDefaultValuesFromXSD(),
    attributes = utilityFunctions.getKeys(defaultValues.horizontalaxis.zoom);

var Zoom = new Model("Zoom", function () {

    this.hasA("allowed").which.isA("boolean");
    this.hasA("min").which.validatesWith(function (min) {
        return DataMeasure.isInstance(min);
    });
    this.hasA("max").which.validatesWith(function (max) {
        return DataMeasure.isInstance(max);
    });
    this.hasA("anchor").which.validatesWith(function (anchor) {
        return DataValue.isInstance(anchor) || anchor === null;
    });

    utilityFunctions.insertDefaults(this, defaultValues.horizontalaxis.zoom, attributes);
});

module.exports = Zoom;
