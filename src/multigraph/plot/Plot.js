if (!window.multigraph) {
    window.multigraph = {};
}

(function (ns) {
    "use strict";

    var Plot,
        Legend,
        Filter,
        Renderer,
        Datatips,
        defaultValues = ns.utilityFunctions.getDefaultValuesFromXSD(),
        attributes = ns.utilityFunctions.getKeys(defaultValues.plot);

    if (ns.Plot) {
        if (ns.Plot.Legend) {
            Legend = ns.Plot.Legend;
        }
        if (ns.Plot.Filter) {
            Filter = ns.Plot.Filter;
        }
        if (ns.Plot.Renderer) {
            Renderer = ns.Plot.Renderer;
        }
        if (ns.Plot.Datatips) {
            Datatips = ns.Plot.Datatips;
        }
    }

    Plot = new window.jermaine.Model( "Plot", function () {
        this.hasA("legend").which.validatesWith(function (legend) {
            return legend instanceof window.multigraph.Plot.Legend;
        });
        this.hasA("horizontalaxis").which.validatesWith(function (axis) {
            return axis instanceof window.multigraph.Axis;
        });
        this.hasA("verticalaxis").which.validatesWith(function (axis) {
            return axis instanceof window.multigraph.Axis;
        });
        this.hasMany("variable").which.validatesWith(function (variable) {
            return variable instanceof window.multigraph.Data.Variables.DataVariable;
        });
        this.hasA("filter").which.validatesWith(function (filter) {
            return filter instanceof window.multigraph.Plot.Filter;
        });
        this.hasA("renderer").which.validatesWith(function (renderer) {
            return renderer instanceof window.multigraph.Plot.Renderer;
        });
        this.hasA("datatips").which.validatesWith(function (datatips) {
            return datatips instanceof window.multigraph.Plot.Datatips;
        });

        ns.utilityFunctions.insertDefaults(this, defaultValues.plot, attributes);
    });

    ns.Plot = Plot;

    if (Legend) {
        ns.Plot.Legend = Legend;
    }
    if (Filter) {
        ns.Plot.Filter = Filter;
    }
    if (Renderer) {
        ns.Plot.Renderer = Renderer;
    }
    if (Datatips) {
        ns.Plot.Datatips = Datatips;
    }

}(window.multigraph));
