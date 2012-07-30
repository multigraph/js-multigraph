window.multigraph.util.namespace("window.multigraph.core", function (ns) {
    "use strict";

    var Plot,
        defaultValues = window.multigraph.utilityFunctions.getDefaultValuesFromXSD(),
        attributes = window.multigraph.utilityFunctions.getKeys(defaultValues.plot);

    Plot = new window.jermaine.Model( "Plot", function () {
        this.hasA("legend").which.validatesWith(function (legend) {
            return legend instanceof ns.PlotLegend;
        });
        this.hasA("horizontalaxis").which.validatesWith(function (axis) {
            return axis instanceof ns.Axis;
        });
        this.hasA("verticalaxis").which.validatesWith(function (axis) {
            return axis instanceof ns.Axis;
        });
        this.hasMany("variable").which.validatesWith(function (variable) {
            return variable instanceof ns.DataVariable;
        });
        this.hasA("filter").which.validatesWith(function (filter) {
            return filter instanceof ns.Filter;
        });
        this.hasA("renderer").which.validatesWith(function (renderer) {
            return renderer instanceof ns.Renderer;
        });
        this.hasA("datatips").which.validatesWith(function (datatips) {
            return datatips instanceof ns.Datatips;
        });
        this.hasA("data").which.validatesWith(function (datatips) {
            return datatips instanceof ns.Data;
        });

        window.multigraph.utilityFunctions.insertDefaults(this, defaultValues.plot, attributes);
    });

    ns.Plot = Plot;
});
