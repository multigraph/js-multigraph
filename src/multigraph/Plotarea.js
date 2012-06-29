if(!window.multigraph) {
    window.multigraph = {};
}

(function (ns) {
    "use strict";

    var defaultValues = ns.utilityFunctions.getDefaultValuesFromXSD(),
        attributes = ns.utilityFunctions.getKeys(defaultValues.plotarea),
        Plotarea = new ns.ModelTool.Model('Plotarea', function () {
            this.hasA("margin").which.validatesWith(function (margin) {
                return margin instanceof ns.math.Insets;
            });
            this.hasA("border").which.validatesWith(function (border) {
                return ns.utilityFunctions.validateInteger(border);
            });
            this.hasA("bordercolor").which.validatesWith(function (bordercolor) {
                return ns.utilityFunctions.validateColor(bordercolor);
            });

            this.isBuiltWith(function() {
                this.margin( new ns.math.Insets(0,0,0,0) );
            });

            ns.utilityFunctions.insertDefaults(this, defaultValues.plotarea, attributes);
        });

    ns.Plotarea = Plotarea;


}(window.multigraph));
