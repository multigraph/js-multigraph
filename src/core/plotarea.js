if(!window.multigraph) {
    window.multigraph = {};
}

(function (ns) {
    "use strict";

    var defaultValues = ns.utilityFunctions.getDefaultValuesFromXSD(),
        attributes = ns.utilityFunctions.getKeys(defaultValues.plotarea),
        Plotarea = new window.jermaine.Model("Plotarea", function () {

            this.hasA("margin").which.validatesWith(function (margin) {
                return margin instanceof ns.math.Insets;
            }); // defaultTo temporarily handled in isBuiltWith below

            this.hasA("border").which.validatesWith(function (border) {
                return ns.utilityFunctions.validateInteger(border);
            }).defaultsTo(defaultValues.plotarea.border);

            this.hasA("bordercolor").which.validatesWith(function (bordercolor) {
                return bordercolor instanceof ns.math.RGBColor;
            }).defaultsTo(ns.math.RGBColor.parse(defaultValues.plotarea.bordercolor));

            this.isBuiltWith(function() {
                // temporary workaround until we can pass a function to be evaled to defaultsTo():
                this.margin( defaultValues.plotarea.margin() );
            });

        });

    ns.Plotarea = Plotarea;


}(window.multigraph));
