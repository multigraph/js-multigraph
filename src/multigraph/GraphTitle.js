if (!window.multigraph) {
    window.multigraph = {};
}

(function (ns) {
    "use strict";

    var defaultValues = ns.utilityFunctions.getDefaultValuesFromXSD(),
        attributes = ns.utilityFunctions.getKeys(defaultValues.title),
        Title = new ns.ModelTool.Model( "GraphTitle", function () {
            this.hasA("content").which.isA("string");
            this.hasA("border").which.validatesWith(function (border) {
                return typeof(border) === "string";
            });
            this.hasA("color").which.validatesWith(function (color) {
                return color instanceof ns.math.RGBColor;
            });
            this.hasA("bordercolor").which.validatesWith(function (bordercolor) {
                return bordercolor instanceof ns.math.RGBColor;
            });
            this.hasA("opacity").which.isA("number");
            this.hasA("padding").which.validatesWith(function (padding) {
                return typeof(padding) === "string";
            });
            this.hasA("cornerradius").which.validatesWith(function (cornerradius) {
                return typeof(cornerradius) === "string";
            });
            this.hasA("base").which.validatesWith(function (base) {
                return ns.utilityFunctions.validateCoordinatePair(base);
            });
            this.hasA("position").which.validatesWith(function (position) {
                return ns.utilityFunctions.validateCoordinatePair(position);
            });
            this.hasA("anchor").which.validatesWith(function (anchor) {
                return ns.utilityFunctions.validateCoordinatePair(anchor);
            });

            ns.utilityFunctions.insertDefaults(this, defaultValues.title, attributes);

        });

    ns.Title = Title;

}(window.multigraph));
