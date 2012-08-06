window.multigraph.util.namespace("window.multigraph.core", function (ns) {
    "use strict";

    var defaultValues = window.multigraph.utilityFunctions.getDefaultValuesFromXSD(),
        attributes = window.multigraph.utilityFunctions.getKeys(defaultValues.background.img),
        Img = new window.jermaine.Model( "Img", function () {
            this.hasA("src").which.validatesWith(function (src) {
                return typeof(src) === "string";
            });
            this.hasA("anchor").which.validatesWith(function (anchor) {
                return anchor instanceof window.multigraph.math.Point;
            });
            this.hasA("base").which.validatesWith(function (base) {
                return base instanceof window.multigraph.math.Point;
            });
            this.hasA("position").which.validatesWith(function (position) {
                return position instanceof window.multigraph.math.Point;
            });
            this.hasA("frame").which.validatesWith(function (frame) {
                return frame === Img.PADDING || frame === Img.PLOT;
            });
            this.isBuiltWith("src");

            window.multigraph.utilityFunctions.insertDefaults(this, defaultValues.background.img, attributes);
        });

    Img.PADDING = "padding";
    Img.PLOT    = "plot";

    ns.Img = Img;
});
