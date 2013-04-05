window.multigraph.util.namespace("window.multigraph.core", function (ns) {
    "use strict";

    var utilityFunctions = window.multigraph.utilityFunctions,
        defaultValues = utilityFunctions.getDefaultValuesFromXSD(),
        attributes = utilityFunctions.getKeys(defaultValues.horizontalaxis.pan),
        Pan;

    Pan = new window.jermaine.Model("Pan", function () {
        this.hasA("allowed").which.isA("boolean");
        this.hasA("min").which.validatesWith(ns.DataValue.isInstanceOrNull);
        this.hasA("max").which.validatesWith(ns.DataValue.isInstanceOrNull);

        //NOTE: the distinction between DataValue and DataMeasure for the zoom & pan model
        //      attributes might seem confusing, so here's a table to clarify it:
        //
        //              Boolean      DataValue      DataMeasure
        //              -------      ---------      -----------
        //  zoom:       allowed      anchor         min,max
        //   pan:       allowed      min,max

        utilityFunctions.insertDefaults(this, defaultValues.horizontalaxis.pan, attributes);
    });

    ns.Pan = Pan;

});
