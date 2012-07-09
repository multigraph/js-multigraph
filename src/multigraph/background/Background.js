if (!window.multigraph) {
    window.multigraph = {};
}

(function (ns) {
    "use strict";

    var Img,
        Background,
        defaultValues = ns.utilityFunctions.getDefaultValuesFromXSD(),
        attributes = ns.utilityFunctions.getKeys(defaultValues.background);

    if (ns.Background && ns.Background.Img) {
        Img = ns.Background.Img;
    }

    Background = new ns.ModelTool.Model( "Background", function () {
        this.hasA("color").which.validatesWith(function (color) {
            return color instanceof ns.math.RGBColor;
        }).defaultsTo(ns.math.RGBColor.parse(defaultValues.background.color));
//        this.hasAn("img").which.isA(ns.Background.Img);
        this.hasA("img").which.validatesWith(function (img) {
            return img instanceof ns.Background.Img;
        });
    });

    ns.Background = Background;

    if (Img) {
        ns.Background.Img = Img;
    }

}(window.multigraph));
