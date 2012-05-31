if (!window.multigraph) {
    window.multigraph = {};
}

if (!window.multigraph.Plot) {
    window.multigraph.Plot = {};
}

(function (ns) {
    "use strict";

    var Filter,
        Option;

    if (ns.Plot.Filter && ns.Plot.Filter.Option) {
        Option = ns.Plot.Filter.Option;
    }

    Filter = new ns.ModelTool.Model( 'Filter', function () {
        this.hasMany("options").which.validatesWith(function (option) {
            return option instanceof ns.Plot.Filter.Option;
        });
        this.hasA("type").which.validatesWith(function (type) {
            return typeof(type) === 'string';
        });

    });

    ns.Plot.Filter = Filter;

    if (Option) {
        ns.Plot.Filter.Option = Option;
    }

}(window.multigraph));
