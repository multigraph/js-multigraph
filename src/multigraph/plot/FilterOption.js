if (!window.multigraph) {
    window.multigraph = {};
}

if (!window.multigraph.Plot) {
    window.multigraph.Plot = {};
}

if (!window.multigraph.Plot.Filter) {
    window.multigraph.Plot.Filter = {};
}

(function (ns) {
    "use strict";

    var defaultValues = ns.utilityFunctions.getDefaultValuesFromXSD(),
        attributes = ns.utilityFunctions.getKeys(defaultValues.plot.filter.option),
        Option = new window.jermaine.Model( "FilterOption", function () {
        this.hasA("name").which.validatesWith(function (name) {
            return typeof(name) === "string";
        });
        this.hasA("value").which.validatesWith(function (value) {
            return typeof(value) === "string";
        });

        ns.utilityFunctions.insertDefaults(this, defaultValues.plot.filter.option, attributes);
    });

    ns.Plot.Filter.Option = Option;

}(window.multigraph));
