window.multigraph.util.namespace("window.multigraph.core", function (ns) {
    "use strict";

    var defaultValues = window.multigraph.utilityFunctions.getDefaultValuesFromXSD(),
        attributes = window.multigraph.utilityFunctions.getKeys(defaultValues.horizontalaxis.binding),
        Binding = new window.jermaine.Model( "Binding", function () {
            this.hasA("id").which.validatesWith(function (id) {
                return typeof(id) === "string";
            });
            this.hasA("min").which.validatesWith(function (min) {
                return typeof(min) === "string";
            });
            this.hasA("max").which.validatesWith(function (max) {
                return typeof(max) === "string";
            });
            this.isBuiltWith("id", "min", "max");

            window.multigraph.utilityFunctions.insertDefaults(this, defaultValues.horizontalaxis.binding, attributes);
        });

    ns.Binding = Binding;

});
