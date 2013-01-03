window.multigraph.util.namespace("window.multigraph.core", function (ns) {
    "use strict";

    var Plot;

    Plot = new window.jermaine.Model("Plot", function () {
        this.hasA("legend").which.validatesWith(function (legend) {
            return legend instanceof ns.PlotLegend;
        });
        this.hasA("horizontalaxis").which.validatesWith(function (axis) {
            return axis instanceof ns.Axis;
        });
        this.hasA("verticalaxis").which.validatesWith(function (axis) {
            return axis instanceof ns.Axis;
        });
        this.hasA("renderer").which.validatesWith(function (renderer) {
            return renderer instanceof ns.Renderer;
        });
    });

    ns.Plot = Plot;
});
