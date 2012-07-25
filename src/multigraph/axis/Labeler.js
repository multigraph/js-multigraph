if (!window.multigraph) {
    window.multigraph = {};
}

if (!window.multigraph.Axis) {
    window.multigraph.Axis = {};
}

(function (ns) {
    "use strict";

    var defaultValues = ns.utilityFunctions.getDefaultValuesFromXSD(),
        attributes = ns.utilityFunctions.getKeys(defaultValues.horizontalaxis.labels.label),
        Labeler = new ns.ModelTool.Model( "Labeler", function () {

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

            this.isBuiltWith("axis")
            //ns.utilityFunctions.insertDefaults(this, defaultValues.horizontalaxis.labels.label, attributes);
        });

    ns.Axis.Labeler = Labeler;

}(window.multigraph));
