window.multigraph.util.namespace("window.multigraph.core", function (ns) {
    "use strict";

    var defaultValues = window.multigraph.utilityFunctions.getDefaultValuesFromXSD(),
        attributes = window.multigraph.utilityFunctions.getKeys(defaultValues.ui),
        UI = new window.jermaine.Model( "UI", function () {
            this.hasA("eventhandler").which.validatesWith(function (eventhandler) {
                return typeof(eventhandler) === "string";
            });

            window.multigraph.utilityFunctions.insertDefaults(this, defaultValues.ui, attributes);

        });

    ns.UI = UI;

});
