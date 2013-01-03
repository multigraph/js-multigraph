window.multigraph.util.namespace("window.multigraph.core", function (ns) {
    "use strict";

    var defaultValues = window.multigraph.utilityFunctions.getDefaultValuesFromXSD(),
    attributes = window.multigraph.utilityFunctions.getKeys(defaultValues.horizontalaxis.pan),
    Pan = new window.jermaine.Model("Pan", function () {
        this.hasA("allowed").which.isA("boolean");
        this.hasA("min").which.validatesWith(function (min) {
            return ns.DataValue.isInstance(min);
        });
        this.hasA("max").which.validatesWith(function (max) {
            return ns.DataValue.isInstance(max);
        });

        //NOTE: the distinction between DataValue and DataMeasure for the zoom & pan model
        //      attributes might seem confusing, so here's a table to clarify it:
        //
        //              Boolean      DataValue      DataMeasure
        //              -------      ---------      -----------
        //  zoom:       allowed      anchor         min,max
        //   pan:       allowed      min,max

        window.multigraph.utilityFunctions.insertDefaults(this, defaultValues.horizontalaxis.pan, attributes);
    });

    ns.Pan = Pan;

});
