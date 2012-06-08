if (!window.multigraph) {
    window.multigraph = {};
}

(function (ns) {
    "use strict";

    var defaultValues = ns.utilityFunctions.getDefaultValuesFromXSD(),
        attributes = ns.utilityFunctions.getKeys(defaultValues['debugger']),
        Debugger = new ns.ModelTool.Model( 'Debugger', function () {
            this.hasA("visible").which.validatesWith(function (visible) {
                return typeof(visible) === 'string';
            });
            this.hasA("fixed").which.validatesWith(function (fixed) {
                return typeof(fixed) === 'string';
            });

            ns.utilityFunctions.insertDefaults(this, defaultValues['debugger'], attributes);

        });

    ns.Debugger = Debugger;

}(window.multigraph));
