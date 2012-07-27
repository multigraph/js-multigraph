window.multigraph.util.namespace("window.multigraph.core", function (ns) {
    "use strict";

    var defaultValues = window.multigraph.utilityFunctions.getDefaultValuesFromXSD(),
        attributes = window.multigraph.utilityFunctions.getKeys(defaultValues.plot.renderer.option),
        RendererOption = new window.jermaine.Model( "RendererOption", function () {
            this.hasA("name").which.validatesWith(function (name) {
                return typeof(name) === "string";
            });
            this.hasA("value").which.validatesWith(function (value) {
                return typeof(value) === "string";
            });
            this.hasA("min").which.validatesWith(function (min) {
                return typeof(min) === "string";
            });
            this.hasA("max").which.validatesWith(function (max) {
                return typeof(max) === "string";
            });
            this.isBuiltWith("name", "value");

            window.multigraph.utilityFunctions.insertDefaults(this, defaultValues.plot.renderer.option, attributes);
        });

    ns.RendererOption = RendererOption;

});
