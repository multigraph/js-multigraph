var jermaine = require('../../lib/jermaine/src/jermaine.js');

DataValue = require('./data_value.js');

var utilityFunctions = require('../util/utilityFunctions.js'),
    defaultValues = utilityFunctions.getDefaultValuesFromXSD(),
    attributes = utilityFunctions.getKeys(defaultValues.horizontalaxis.pan);

var Pan = new jermaine.Model("Pan", function () {
    this.hasA("allowed").which.isA("boolean");
    this.hasA("min").which.validatesWith(DataValue.isInstanceOrNull);
    this.hasA("max").which.validatesWith(DataValue.isInstanceOrNull);

    //NOTE: the distinction between DataValue and DataMeasure for the zoom & pan model
    //      attributes might seem confusing, so here's a table to clarify it:
    //
    //              Boolean      DataValue      DataMeasure
    //              -------      ---------      -----------
    //  zoom:       allowed      anchor         min,max
    //   pan:       allowed      min,max

    utilityFunctions.insertDefaults(this, defaultValues.horizontalaxis.pan, attributes);
});

module.exports = Pan;
