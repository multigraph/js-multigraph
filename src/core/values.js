window.multigraph.util.namespace("window.multigraph.core", function (ns) {
    "use strict";

    var defaultValues = window.multigraph.utilityFunctions.getDefaultValuesFromXSD(),
        attributes = window.multigraph.utilityFunctions.getKeys(defaultValues.data.values),
        Values = new window.jermaine.Model( "Values", function () {
            this.hasA("content").which.validatesWith(function (content) {
                return typeof(content) === "string";
            });

            window.multigraph.utilityFunctions.insertDefaults(this, defaultValues.data.values, attributes);
        });

    ns.Values = Values;

});
