window.multigraph.util.namespace("window.multigraph.core", function (ns) {
    "use strict";

    var defaultValues = window.multigraph.utilityFunctions.getDefaultValuesFromXSD(),
        attributes = window.multigraph.utilityFunctions.getKeys(defaultValues.title),
        Title = new window.jermaine.Model( "GraphTitle", function () {
            this.hasA("content").which.isA("string");
            this.hasA("border").which.validatesWith(function (border) {
                return typeof(border) === "string";
            });
            this.hasA("color").which.validatesWith(function (color) {
                return color instanceof window.multigraph.math.RGBColor;
            });
            this.hasA("bordercolor").which.validatesWith(function (bordercolor) {
                return bordercolor instanceof window.multigraph.math.RGBColor;
            });
            this.hasA("opacity").which.isA("number");
            this.hasA("padding").which.validatesWith(function (padding) {
                return typeof(padding) === "string";
            });
            this.hasA("cornerradius").which.validatesWith(function (cornerradius) {
                return typeof(cornerradius) === "string";
            });
            this.hasA("anchor").which.validatesWith(function (anchor) {
                return anchor instanceof window.multigraph.math.Point;
            });
            this.hasA("base").which.validatesWith(function (base) {
                return base instanceof window.multigraph.math.Point;
            });
            this.hasA("position").which.validatesWith(function (position) {
                return position instanceof window.multigraph.math.Point;
            });

            window.multigraph.utilityFunctions.insertDefaults(this, defaultValues.title, attributes);

        });

    ns.Title = Title;
});
