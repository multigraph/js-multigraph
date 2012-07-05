if (!window.multigraph) {
    window.multigraph = {};
}

if (!window.multigraph.Data) {
    window.multigraph.Data = {};
}

(function (ns) {
    "use strict";

    var defaultValues = ns.utilityFunctions.getDefaultValuesFromXSD(),
        attributes = ns.utilityFunctions.getKeys(defaultValues.data.values),
        Values = new ns.ModelTool.Model( "Values", function () {
            this.hasA("content").which.validatesWith(function (content) {
                return typeof(content) === "string";
            });

            ns.utilityFunctions.insertDefaults(this, defaultValues.data.values, attributes);
        });

    ns.Data.Values = Values;

}(window.multigraph));
