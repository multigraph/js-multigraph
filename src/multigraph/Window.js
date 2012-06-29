if (!window.multigraph) {
    window.multigraph = {};
}

(function (ns) {
    "use strict";

    var defaultValues = ns.utilityFunctions.getDefaultValuesFromXSD(),
        attributes = ns.utilityFunctions.getKeys(defaultValues.window),
        Window = new ns.ModelTool.Model( 'Window', function () {

            this.hasA("width").which.validatesWith(function (width) {
                return ns.utilityFunctions.validateIntegerCorrectly(width);
            });

            this.hasA("height").which.validatesWith(function (height) {
                return ns.utilityFunctions.validateIntegerCorrectly(height);
            });

            this.hasA("border").which.validatesWith(function (border) {
                return ns.utilityFunctions.validateIntegerCorrectly(border);
            }).defaultsTo(defaultValues.window.border);

            this.hasA("margin").which.validatesWith(function (margin) {
                return margin instanceof ns.math.Insets;
            }); // defaultTo temporarily handled in isBuiltWith below

            this.hasA("padding").which.validatesWith(function (padding) {
                return padding instanceof ns.math.Insets;
            }); // defaultTo temporarily handled in isBuiltWith below

            this.hasA("bordercolor").which.validatesWith(function (bordercolor) {
                return ns.utilityFunctions.validateColor(bordercolor);
            }).defaultsTo(defaultValues.window.bordercolor);

            this.isBuiltWith(function() {
                // temporary workaround until we can pass a function to be evaled to defaultsTo():
                this.margin( defaultValues.window.margin() );
                this.padding( defaultValues.window.padding() );
            });

        });

    ns.Window = Window;

}(window.multigraph));
