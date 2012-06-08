if (!window.multigraph) {
    window.multigraph = {};
}

(function (ns) {
    "use strict";

    var defaultValues = ns.utilityFunctions.getDefaultValuesFromXSD(),
        attributes = ns.utilityFunctions.getKeys(defaultValues.networkmonitor),
        NetworkMonitor = new ns.ModelTool.Model( 'NetworkMonitor', function () {
            this.hasA("visible").which.validatesWith(function (visible) {
                return typeof(visible) === 'string';
            });
            this.hasA("fixed").which.validatesWith(function (fixed) {
                return typeof(fixed) === 'string';
            });

            ns.utilityFunctions.insertDefaults(this, defaultValues.networkmonitor, attributes);

        });

    ns.NetworkMonitor = NetworkMonitor;

}(window.multigraph));
