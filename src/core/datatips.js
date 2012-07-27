window.multigraph.util.namespace("window.multigraph.core", function (ns) {
    "use strict";

    var Datatips,
        defaultValues = window.multigraph.utilityFunctions.getDefaultValuesFromXSD(),
        attributes = window.multigraph.utilityFunctions.getKeys(defaultValues.plot.datatips);

    Datatips = new window.jermaine.Model( "Datatips", function () {
        this.hasMany("variables").which.validatesWith(function (variable) {
            return variable instanceof ns.DatatipsVariable;
        });
        this.hasA("format").which.validatesWith(function (format) {
            return typeof(format) === "string";
        });
        this.hasA("bgcolor").which.validatesWith(function (bgcolor) {
            return bgcolor instanceof window.multigraph.math.RGBColor;
        });
        this.hasA("bgalpha").which.validatesWith(function (bgalpha) {
            return typeof(bgalpha) === "string";
        });
        this.hasA("border").which.validatesWith(function (border) {
            return window.multigraph.utilityFunctions.validateInteger(border);
        });
        this.hasA("bordercolor").which.validatesWith(function (bordercolor) {
            return bordercolor instanceof window.multigraph.math.RGBColor;
        });
        this.hasA("pad").which.isA("integer");

        window.multigraph.utilityFunctions.insertDefaults(this, defaultValues.plot.datatips, attributes);
    });

    ns.Datatips = Datatips;

});
