window.multigraph.util.namespace("window.multigraph.core", function (ns) {
    "use strict";

    var Filter,
        utilityFunctions = window.multigraph.utilityFunctions,
        defaultValues = utilityFunctions.getDefaultValuesFromXSD(),
        attributes = utilityFunctions.getKeys(defaultValues.plot.filter);

    Filter = new window.jermaine.Model("Filter", function () {
        this.hasMany("options").eachOfWhich.validatesWith(function (option) {
            return option instanceof ns.FilterOption;
        });
        this.hasA("type").which.validatesWith(function (type) {
            return typeof(type) === "string";
        });

        utilityFunctions.insertDefaults(this, defaultValues.plot.filter, attributes);
    });

    ns.Filter = Filter;
});
