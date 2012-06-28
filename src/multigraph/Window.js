if (!window.multigraph) {
    window.multigraph = {};
}

(function (ns) {
    "use strict";

    var defaultValues = ns.utilityFunctions.getDefaultValuesFromXSD(),
        attributes = ns.utilityFunctions.getKeys(defaultValues.window),
        Window = new ns.ModelTool.Model( 'Window', function () {
            this.hasA("width").which.validatesWith(function (width) {
                return ns.utilityFunctions.validateInteger(width);
            });
            this.hasA("height").which.validatesWith(function (height) {
                return ns.utilityFunctions.validateInteger(height);
            });
            this.hasA("border").which.validatesWith(function (border) {
                return ns.utilityFunctions.validateInteger(border);
            });
            this.hasA("margin").which.validatesWith(function (margin) {
                //return ns.utilityFunctions.validateInteger(margin);
                return margin instanceof ns.math.Insets;
            });
            this.hasA("padding").which.validatesWith(function (padding) {
                return ns.utilityFunctions.validateInteger(padding);
            });
            this.hasA("bordercolor").which.validatesWith(function (bordercolor) {
                return ns.utilityFunctions.validateColor(bordercolor);
            });

            this.isBuiltWith(function() {
                this.margin( new ns.math.Insets(0,0,0,0) );
            });

//            ns.utilityFunctions.insertDefaults(this, defaultValues.window, attributes);

        });

    ns.Window = Window;

}(window.multigraph));
