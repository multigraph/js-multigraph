window.multigraph.util.namespace("window.multigraph.core", function (ns) {
    "use strict";

    var utilityFunctions = window.multigraph.utilityFunctions,
        defaultValues = utilityFunctions.getDefaultValuesFromXSD(),
        attributes = utilityFunctions.getKeys(defaultValues.legend.icon),
        Icon = new window.jermaine.Model("Icon", function () {
            this.hasA("height").which.isA("integer");
            this.hasA("width").which.isA("integer");
            this.hasA("border").which.isA("integer");

            utilityFunctions.insertDefaults(this, defaultValues.legend.icon, attributes);
        });

    ns.Icon = Icon;


});
