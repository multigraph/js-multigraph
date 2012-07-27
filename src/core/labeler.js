window.multigraph.util.namespace("window.multigraph.core", function (ns) {
    "use strict";

    var defaultValues = window.multigraph.utilityFunctions.getDefaultValuesFromXSD(),
        attributes = window.multigraph.utilityFunctions.getKeys(defaultValues.horizontalaxis.labels.label),
        Labeler = new window.jermaine.Model( "Labeler", function () {

            this.hasA("axis").which.validatesWith(function (axis) {
                return axis instanceof ns.Axis;
            });

            this.hasA("formatter").which.validatesWith(function (formatter) {
                return true;
                //return formatter instanceof DataFormatter;
            });
            this.hasA("start").which.validatesWith(function (start) {
//                return DataValue.isInstance(start);
                return true;
            });
            this.hasA("angle").which.isA("number");
            this.hasA("position").which.validatesWith(function (position) {
                return position instanceof window.multigraph.math.Point;
            });
            this.hasA("anchor").which.validatesWith(function (anchor) {
                return anchor instanceof window.multigraph.math.Point;
            });
            this.hasA("spacing").which.validatesWith(function (spacing) {
                //return DataValue.isInstance(start);
                return true;
            });
            this.hasA("densityfactor").which.isA("number");

            this.isBuiltWith("axis");
            //window.multigraph.utilityFunctions.insertDefaults(this, defaultValues.horizontalaxis.labels.label, attributes);
        });

    ns.Labeler = Labeler;

});
