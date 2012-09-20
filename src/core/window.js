window.multigraph.util.namespace("window.multigraph.core", function (ns) {
    "use strict";

    var defaultValues = window.multigraph.utilityFunctions.getDefaultValuesFromXSD(),
        attributes = window.multigraph.utilityFunctions.getKeys(defaultValues.window),
        Window = new window.jermaine.Model( "Window", function () {

            this.hasA("width").which.isA("integer");

            this.hasA("height").which.isA("integer");

            this.hasA("border").which.isA("integer").and.defaultsTo(defaultValues.window.border);

            this.hasA("margin").which.validatesWith(function (margin) {
                return margin instanceof window.multigraph.math.Insets;
            }); // defaultTo temporarily handled in isBuiltWith below

            this.hasA("padding").which.validatesWith(function (padding) {
                return padding instanceof window.multigraph.math.Insets;
            }); // defaultTo temporarily handled in isBuiltWith below

            this.hasA("bordercolor").which.validatesWith(function (bordercolor) {
                return bordercolor instanceof window.multigraph.math.RGBColor;
            }).defaultsTo(window.multigraph.math.RGBColor.parse(defaultValues.window.bordercolor));

            this.isBuiltWith(function () {
                // temporary workaround until we can pass a function to be evaled to defaultsTo():
                this.margin( defaultValues.window.margin() );
                this.padding( defaultValues.window.padding() );
            });

        });

    ns.Window = Window;
});
