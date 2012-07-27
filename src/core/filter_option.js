window.multigraph.util.namespace("window.multigraph.core", function (ns) {
    "use strict";

    var defaultValues = window.multigraph.utilityFunctions.getDefaultValuesFromXSD(),
        attributes = window.multigraph.utilityFunctions.getKeys(defaultValues.plot.filter.option),
        FilterOption = new window.jermaine.Model( "FilterOption", function () {
        this.hasA("name").which.validatesWith(function (name) {
            return typeof(name) === "string";
        });
        this.hasA("value").which.validatesWith(function (value) {
            return typeof(value) === "string";
        });

        window.multigraph.utilityFunctions.insertDefaults(this, defaultValues.plot.filter.option, attributes);
    });

    ns.FilterOption = FilterOption;

});
