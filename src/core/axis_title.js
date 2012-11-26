window.multigraph.util.namespace("window.multigraph.core", function (ns) {
    "use strict";

    var defaultValues = window.multigraph.utilityFunctions.getDefaultValuesFromXSD(),
        attributes = window.multigraph.utilityFunctions.getKeys(defaultValues.horizontalaxis.title),
        AxisTitle;

    AxisTitle = new window.jermaine.Model( "AxisTitle", function () {
        this.hasA("axis").which.validatesWith(function (axis) {
            return axis instanceof window.multigraph.core.Axis;
        });
        this.hasA("content").which.validatesWith(function (content) {
            return content instanceof window.multigraph.core.Text;
        });
        this.hasA("anchor").which.validatesWith(function (anchor) {
            return anchor instanceof window.multigraph.math.Point;
        });
        this.hasA("base").which.isA("number");
        this.hasA("position").which.validatesWith(function (position) {
            return position instanceof window.multigraph.math.Point;
        });
        this.hasA("angle").which.isA("number");

        this.isBuiltWith("axis");
        
        window.multigraph.utilityFunctions.insertDefaults(this, defaultValues.horizontalaxis.title, attributes);
    });

    ns.AxisTitle = AxisTitle;

});
