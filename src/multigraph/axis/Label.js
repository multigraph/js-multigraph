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
        Label = new ns.ModelTool.Model( "Label", function () {
            this.hasA("format").which.validatesWith(function (format) {
                return typeof(format) === "string";
            });
            this.hasA("start").which.validatesWith(function (start) {
                //TODO: DataValue
                return typeof(start) === "string";
            });
            this.hasA("angle").which.isA("number");
            this.hasA("position").which.validatesWith(function (position) {
                //TODO: Point
                return ns.utilityFunctions.validateCoordinatePair(position);
            });
            this.hasA("anchor").which.validatesWith(function (anchor) {
                //TODO: Point
                return ns.utilityFunctions.validateCoordinatePair(anchor);
            });
            this.hasA("spacing").which.validatesWith(function (spacing) {
                //TODO: DataMeasure
                return typeof(spacing) === "string";
            });
            this.hasA("densityfactor").which.validatesWith(function (densityfactor) {
                //TODO: number
                return typeof(densityfactor) === "string";
            });
            this.isBuiltWith("spacing");

            ns.utilityFunctions.insertDefaults(this, defaultValues.horizontalaxis.labels.label, attributes);
        });

    ns.Axis.Labels.Label = Label;

}(window.multigraph));
