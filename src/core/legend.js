window.multigraph.util.namespace("window.multigraph.core", function (ns) {
    "use strict";

    var Icon,
        Legend,
        defaultValues = window.multigraph.utilityFunctions.getDefaultValuesFromXSD(),
        attributes = window.multigraph.utilityFunctions.getKeys(defaultValues.legend);

    Legend = new window.jermaine.Model( "Legend", function () {
        this.hasA("visible").which.isA("boolean");
        this.hasA("base").which.validatesWith(function (base) {
            return base instanceof window.multigraph.math.Point;
        });
        this.hasAn("anchor").which.validatesWith(function (anchor) {
            return anchor instanceof window.multigraph.math.Point;
        });
        this.hasA("position").which.validatesWith(function (position) {
            return position instanceof window.multigraph.math.Point;
        });
        this.hasA("frame").which.validatesWith(function (frame) {
            return frame === "plot" || frame === "padding";
        });
        this.hasA("color").which.validatesWith(function (color) {
            return color instanceof window.multigraph.math.RGBColor;
        });
        this.hasA("bordercolor").which.validatesWith(function (bordercolor) {
            return bordercolor instanceof window.multigraph.math.RGBColor;
        });
        this.hasA("opacity").which.validatesWith(function (opacity) {
            return window.multigraph.utilityFunctions.validateNumberRange(opacity, 0.0, 1.0);
        });
        this.hasA("border").which.validatesWith(function (border) {
            return window.multigraph.utilityFunctions.validateInteger(border);
        });
        this.hasA("rows").which.isA("integer");
        this.hasA("columns").which.isA("integer");
        this.hasA("cornerradius").which.isA("integer");
        this.hasA("padding").which.validatesWith(function (padding) {
            return window.multigraph.utilityFunctions.validateInteger(padding);
        });
        this.hasA("icon").which.validatesWith(function (icon) {
            return icon instanceof ns.Icon;
        });

        window.multigraph.utilityFunctions.insertDefaults(this, defaultValues.legend, attributes);
    });

    ns.Legend = Legend;

});
