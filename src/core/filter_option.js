window.multigraph.util.namespace("window.multigraph.core", function (ns) {
    "use strict";

    var utilityFunctions = window.multigraph.utilityFunctions,
        defaultValues = utilityFunctions.getDefaultValuesFromXSD(),
        attributes = utilityFunctions.getKeys(defaultValues.plot.filter.option),
        FilterOption = new window.jermaine.Model("FilterOption", function () {
            this.hasA("name").which.validatesWith(function (name) {
                return typeof(name) === "string";
            });
            this.hasA("value").which.validatesWith(function (value) {
                return typeof(value) === "string";
            });

            utilityFunctions.insertDefaults(this, defaultValues.plot.filter.option, attributes);
    });

    ns.FilterOption = FilterOption;

});
