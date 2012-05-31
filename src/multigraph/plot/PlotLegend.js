if (!window.multigraph) {
    window.multigraph = {};
}

if (!window.multigraph.Plot) {
    window.multigraph.Plot = {};
}

(function (ns) {
    "use strict";

    var Legend = new ns.ModelTool.Model( 'PlotLegend', function () {
        this.hasA("visible").which.validatesWith(function (visible) {
            return visible === 'true' || visible === 'false';
        });
        this.hasA("label").which.validatesWith(function (label) {
            return typeof(label) === 'string';
        });

    });

    ns.Plot.Legend = Legend;


}(window.multigraph));
