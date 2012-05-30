if (!window.multigraph) {
    window.multigraph = {};
}

if (!window.multigraph.Plot) {
    window.multigraph.Plot = {};
}

if (!window.multigraph.Plot.Datatips) {
    window.multigraph.Plot.Datatips = {};
}

(function (ns) {
    "use strict";

    var DatatipsVariable = new ns.ModelTool.Model( 'DatatipsVariable', function () {
        this.hasA("format").which.validatesWith(function (format) {
            return typeof(format) === 'string';
        });

    });

    ns.Plot.Datatips.Variable = DatatipsVariable;

}(window.multigraph));
