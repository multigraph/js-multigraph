if (!window.multigraph) {
    window.multigraph = {};
}

(function (ns) {
    "use strict";

    var Title = new ns.ModelTool.Model( 'GraphTitle', function () {
        this.hasA("content").which.validatesWith(function (content) {
            return typeof(content) === 'string';
        });
        this.hasA("border").which.validatesWith(function (border) {
            return typeof(border) === 'string';
        });
        this.hasA("color").which.validatesWith(function (color) {
            return ns.utilityFunctions.validateColor(color);
        });
        this.hasA("bordercolor").which.validatesWith(function (bordercolor) {
            return ns.utilityFunctions.validateColor(bordercolor);
        });
        this.hasA("opacity").which.validatesWith(function (opacity) {
            return typeof(opacity) === 'string';
        });
        this.hasA("padding").which.validatesWith(function (padding) {
            return typeof(padding) === 'string';
        });
        this.hasA("cornerradius").which.validatesWith(function (cornerradius) {
            return typeof(cornerradius) === 'string';
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
    });

    ns.Title = Title;

}(window.multigraph));
