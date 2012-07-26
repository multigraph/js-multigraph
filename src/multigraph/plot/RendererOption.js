if (!window.multigraph) {
    window.multigraph = {};
}

if (!window.multigraph.Plot) {
    window.multigraph.Plot = {};
}

if (!window.multigraph.Plot.Renderer) {
    window.multigraph.Plot.Renderer = {};
}

(function (ns) {
    "use strict";

    var defaultValues = ns.utilityFunctions.getDefaultValuesFromXSD(),
        attributes = ns.utilityFunctions.getKeys(defaultValues.plot.renderer.option),
        Option = new window.jermaine.Model( "RendererOption", function () {
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

            ns.utilityFunctions.insertDefaults(this, defaultValues.plot.renderer.option, attributes);
        });

    ns.Plot.Renderer.Option = Option;

}(window.multigraph));
