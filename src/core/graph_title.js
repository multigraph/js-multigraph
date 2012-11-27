window.multigraph.util.namespace("window.multigraph.core", function (ns) {
    "use strict";

    /**
     * @module multigraph
     * @submodule core
     */

    var defaultValues = window.multigraph.utilityFunctions.getDefaultValuesFromXSD(),
        attributes = window.multigraph.utilityFunctions.getKeys(defaultValues.title),
        Title;

    Title = new window.jermaine.Model( "GraphTitle", function () {
        this.hasA("graph").which.validatesWith(function (graph) {
            return graph instanceof window.multigraph.core.Graph;
        });
        this.hasA("text").which.validatesWith(function (text) {
            return text instanceof window.multigraph.core.Text;
        });
        this.hasA("frame").which.isA("string");
        this.hasA("border").which.isAn("integer");
        this.hasA("color").which.validatesWith(function (color) {
            return color instanceof window.multigraph.math.RGBColor;
        });
        this.hasA("bordercolor").which.validatesWith(function (bordercolor) {
            return bordercolor instanceof window.multigraph.math.RGBColor;
        });
        this.hasA("opacity").which.isA("number");
        this.hasA("padding").which.isAn("integer");
        this.hasA("cornerradius").which.isAn("integer");
        this.hasA("anchor").which.validatesWith(function (anchor) {
            return anchor instanceof window.multigraph.math.Point;
        });
        this.hasA("base").which.validatesWith(function (base) {
            return base instanceof window.multigraph.math.Point;
        });
        this.hasA("position").which.validatesWith(function (position) {
            return position instanceof window.multigraph.math.Point;
        });

        this.isBuiltWith("text", "graph");

        window.multigraph.utilityFunctions.insertDefaults(this, defaultValues.title, attributes);

    });

    ns.Title = Title;

});
