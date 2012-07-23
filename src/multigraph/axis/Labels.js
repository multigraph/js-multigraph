if (!window.multigraph) {
    window.multigraph = {};
}

if (!window.multigraph.Axis) {
    window.multigraph.Axis = {};
}

(function (ns) {
    "use strict";

    var Label,
        Labels,
        defaultValues = ns.utilityFunctions.getDefaultValuesFromXSD(),
        attributes = ns.utilityFunctions.getKeys(defaultValues.horizontalaxis.labels);

    if (ns.Axis.Labels && ns.Axis.Labels.Label) {
        Label = ns.Axis.Labels.Label;
    }

    Labels = new ns.ModelTool.Model( "Labels", function () {
        this.hasMany("label").which.validatesWith(function (label) {
            return label instanceof ns.Axis.Labels.Label;
        });
        this.hasA("format").which.validatesWith(function (format) {
            return typeof(format) === "string";
        });
        this.hasA("start").which.validatesWith(function (start) {
            //TODO: DataValue
            return typeof(start) === "string";
        });
        this.hasA("angle").which.isA("number");
        this.hasA("position").which.validatesWith(function (position) {
            return position instanceof ns.math.Point;
        });
        this.hasA("anchor").which.validatesWith(function (anchor) {
            return anchor instanceof ns.math.Point;
        });
        this.hasA("spacing").which.validatesWith(function (spacing) {
            //TODO: DataMeasure
            return typeof(spacing) === "string";
        });
        this.hasA("densityfactor").which.isA("number");

        ns.utilityFunctions.insertDefaults(this, defaultValues.horizontalaxis.labels, attributes);
    });

    ns.Axis.Labels = Labels;

    if (Label) {
        ns.Axis.Labels.Label = Label;
    }

}(window.multigraph));
