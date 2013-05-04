window.multigraph.util.namespace("window.multigraph.core", function (ns) {
    "use strict";

    var Datatips,
        utilityFunctions = window.multigraph.utilityFunctions,
        defaultValues = utilityFunctions.getDefaultValuesFromXSD(),
        attributes = utilityFunctions.getKeys(defaultValues.plot.datatips);

    Datatips = new window.jermaine.Model("Datatips", function () {
        this.hasMany("variables").eachOfWhich.validateWith(function (variable) {
            return variable instanceof ns.DatatipsVariable;
        });
        this.hasA("formatString").which.isA("string");
        this.hasA("bgcolor").which.validatesWith(function (bgcolor) {
            return bgcolor instanceof window.multigraph.math.RGBColor;
        });
        this.hasA("bgalpha").which.isA("number");
        this.hasA("border").which.isA("integer");
        this.hasA("bordercolor").which.validatesWith(function (bordercolor) {
            return bordercolor instanceof window.multigraph.math.RGBColor;
        });
        this.hasA("pad").which.isA("integer");

        utilityFunctions.insertDefaults(this, defaultValues.plot.datatips, attributes);
    });

    ns.Datatips = Datatips;
});
