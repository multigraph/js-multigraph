if (!window.multigraph) {
    window.multigraph = {};
}

(function (ns) {
    "use strict";

    var defaultValues = ns.utilityFunctions.getDefaultValuesFromXSD(),
        attributes = ns.utilityFunctions.getKeys(defaultValues.ui),
        UI = new ns.ModelTool.Model( 'UI', function () {
            this.hasA("eventhandler").which.validatesWith(function (eventhandler) {
                return typeof(eventhandler) === 'string';
            });

            ns.utilityFunctions.insertDefaults(this, defaultValues.ui, attributes);

        });

    ns.UI = UI;

}(window.multigraph));
