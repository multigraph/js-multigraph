window.multigraph.util.namespace("window.multigraph.core", function (ns) {
    "use strict";

    var defaultValues = window.multigraph.utilityFunctions.getDefaultValuesFromXSD(),
        attributes = window.multigraph.utilityFunctions.getKeys(defaultValues.legend.icon),
        Icon = new window.jermaine.Model("Icon", function () {
            this.hasA("height").which.isA("integer");
            this.hasA("width").which.isA("integer");
            this.hasA("border").which.isA("integer");

            window.multigraph.utilityFunctions.insertDefaults(this, defaultValues.legend.icon, attributes);
        });

    ns.Icon = Icon;


});
