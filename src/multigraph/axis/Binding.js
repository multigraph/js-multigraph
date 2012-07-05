if (!window.multigraph) {
    window.multigraph = {};
}

if (!window.multigraph.Axis) {
    window.multigraph.Axis = {};
}

(function (ns) {
    "use strict";

    var defaultValues = ns.utilityFunctions.getDefaultValuesFromXSD(),
        attributes = ns.utilityFunctions.getKeys(defaultValues.horizontalaxis.binding),
        Binding = new ns.ModelTool.Model( "Binding", function () {
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

            ns.utilityFunctions.insertDefaults(this, defaultValues.horizontalaxis.binding, attributes);
        });

    ns.Axis.Binding = Binding;

}(window.multigraph));
