window.multigraph.util.namespace("window.multigraph.core", function (ns) {
    "use strict";

    var defaultValues = window.multigraph.utilityFunctions.getDefaultValuesFromXSD(),
    attributes = window.multigraph.utilityFunctions.getKeys(defaultValues.horizontalaxis.pan),
    Pan = new window.jermaine.Model( "Pan", function () {
	//TODO: change "allowed" attribute to be a Boolean value (true/false).
	//      See comments for zoom's "allowed" attribute for more info.
        this.hasA("allowed").which.validatesWith(function (allowed) {
            return allowed === Pan.YES || allowed === Pan.NO;
        });
	//TODO: change "min" attribute to be a DataValue instance; see comments
	//      for zoom's "min" attribute for more info, except that pan's
	//      "min" attr is a DataValue (whereas zoom's "min" is a DataMeasure).
        this.hasA("min").which.validatesWith(function (min) {
            return typeof(min) === "string";
        });
	//TODO: change "max" attribute to be a DataValue instance -- just like
	//      "min" above.
        this.hasA("max").which.validatesWith(function (max) {
            return typeof(max) === "string";
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

    Pan.YES = "yes";
    Pan.NO  = "no";

    ns.Pan = Pan;

});
