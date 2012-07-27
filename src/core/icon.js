if(!window.multigraph) {
    window.multigraph = {};
}

if(!window.multigraph.Legend) {
    window.multigraph.Legend = {};
}

(function (ns) {
    "use strict";

    var defaultValues = ns.utilityFunctions.getDefaultValuesFromXSD(),
        attributes = ns.utilityFunctions.getKeys(defaultValues.legend.icon),
        Icon = new window.jermaine.Model( "Icon", function () {
            this.hasA("height").which.isA("integer");
            this.hasA("width").which.isA("integer");
            this.hasA("border").which.isA("integer");

            ns.utilityFunctions.insertDefaults(this, defaultValues.legend.icon, attributes);
        });

    ns.Legend.Icon = Icon;


}(window.multigraph));
