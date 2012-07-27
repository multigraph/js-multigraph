window.multigraph.util.namespace("window.multigraph.core", function (ns) {
    "use strict";

    var defaultValues = window.multigraph.utilityFunctions.getDefaultValuesFromXSD(),
        attributes = window.multigraph.utilityFunctions.getKeys(defaultValues.plotarea),
        Plotarea = new window.jermaine.Model("Plotarea", function () {

            this.hasA("margin").which.validatesWith(function (margin) {
                return margin instanceof window.multigraph.math.Insets;
            }); // defaultTo temporarily handled in isBuiltWith below

            this.hasA("border").which.validatesWith(function (border) {
                return window.multigraph.utilityFunctions.validateInteger(border);
            }).defaultsTo(defaultValues.plotarea.border);

            this.hasA("bordercolor").which.validatesWith(function (bordercolor) {
                return bordercolor instanceof window.multigraph.math.RGBColor;
            }).defaultsTo(window.multigraph.math.RGBColor.parse(defaultValues.plotarea.bordercolor));

            this.isBuiltWith(function() {
                // temporary workaround until we can pass a function to be evaled to defaultsTo():
                this.margin( defaultValues.plotarea.margin() );
            });

        });

    ns.Plotarea = Plotarea;
});
