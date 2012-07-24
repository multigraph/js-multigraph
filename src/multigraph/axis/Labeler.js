if (!window.multigraph) {
    window.multigraph = {};
}

if (!window.multigraph.Axis) {
    window.multigraph.Axis = {};
}

if (!window.multigraph.Axis.Labels) {
    window.multigraph.Axis.Labels = {};
}

(function (ns) {
    "use strict";

    var defaultValues = ns.utilityFunctions.getDefaultValuesFromXSD(),
        attributes = ns.utilityFunctions.getKeys(defaultValues.horizontalaxis.labels.label),
        Labeler = new ns.ModelTool.Model( "Labeler", function () {

            this.hasA("axis").which.validatesWith(function (axis) {
                return axis instanceof Axis;
            });

            this.hasA("formater").which.validatesWith(function (formatter) {
                return true;
                //return formatter instanceof DataFormatter;
            });
            this.hasA("start").which.validatesWith(function (start) {
                return DataValue.isInstance(start);
            });
            this.hasA("angle").which.isA("number");
            this.hasA("position").which.validatesWith(function (position) {
                return position instanceof ns.math.Point;
            });
            this.hasA("anchor").which.validatesWith(function (anchor) {
                return anchor instanceof ns.math.Point;
            });
            this.hasA("spacing").which.validatesWith(function (spacing) {
                //return DataValue.isInstance(start);
                return true;
            });
            this.hasA("densityfactor").which.isA("number");

            //ns.utilityFunctions.insertDefaults(this, defaultValues.horizontalaxis.labels.label, attributes);
        });

    ns.Axis.Labels.Labeler = Labeler;

}(window.multigraph));
