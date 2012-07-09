if (!window.multigraph) {
    window.multigraph = {};
}

if (!window.multigraph.Plot) {
    window.multigraph.Plot = {};
}

(function (ns) {
    "use strict";

    var Datatips,
        DatatipsVariable,
        defaultValues = ns.utilityFunctions.getDefaultValuesFromXSD(),
        attributes = ns.utilityFunctions.getKeys(defaultValues.plot.datatips);


    if (ns.Plot.Datatips && ns.Plot.Datatips.Variable) {
        DatatipsVariable = ns.Plot.Datatips.Variable;
    }

    Datatips = new ns.ModelTool.Model( "Datatips", function () {
        this.hasMany("variables").which.validatesWith(function (variable) {
            return variable instanceof ns.Plot.Datatips.Variable;
        });
        this.hasA("format").which.validatesWith(function (format) {
            return typeof(format) === "string";
        });
        this.hasA("bgcolor").which.validatesWith(function (bgcolor) {
            return bgcolor instanceof ns.math.RGBColor;
        });
        this.hasA("bgalpha").which.validatesWith(function (bgalpha) {
            return typeof(bgalpha) === "string";
        });
        this.hasA("border").which.validatesWith(function (border) {
            return ns.utilityFunctions.validateInteger(border);
        });
        this.hasA("bordercolor").which.validatesWith(function (bordercolor) {
            return bordercolor instanceof ns.math.RGBColor;
        });
        this.hasA("pad").which.isA("integer");

        ns.utilityFunctions.insertDefaults(this, defaultValues.plot.datatips, attributes);
    });

    ns.Plot.Datatips = Datatips;

    if (DatatipsVariable) {
        ns.Plot.Datatips.Variable = DatatipsVariable;
    }

}(window.multigraph));
