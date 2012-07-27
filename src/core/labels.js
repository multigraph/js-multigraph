window.multigraph.util.namespace("window.multigraph.core", function (ns) {
    "use strict";

    var Labels,
        defaultValues = window.multigraph.utilityFunctions.getDefaultValuesFromXSD(),
        attributes = window.multigraph.utilityFunctions.getKeys(defaultValues.horizontalaxis.labels);

    Labels = new window.jermaine.Model( "Labels", function () {
        this.hasA("axis").which.validatesWith(function (axis) {
            return axis instanceof ns.Axis;
        });

        this.hasA("formatter").which.validatesWith(function (format) {
            return typeof(format) === "string";
        }).defaultsTo("%1d");
        this.hasA("start").which.validatesWith(function (start) {
            //TODO: DataValue
            return typeof(start) === "string";
        });
        this.hasA("angle").which.isA("number");
        this.hasA("position").which.validatesWith(function (position) {
            return position instanceof window.multigraph.math.Point;
        });
        this.hasA("anchor").which.validatesWith(function (anchor) {
            return anchor instanceof window.multigraph.math.Point;
        });
        this.hasA("spacing").which.validatesWith(function (spacing) {
            //TODO: DataMeasure
            return typeof(spacing) === "string";
        });
        this.hasA("densityfactor").which.isA("number");

        window.multigraph.utilityFunctions.insertDefaults(this, defaultValues.horizontalaxis.labels, attributes);
    });

    ns.Labels = Labels;

});
