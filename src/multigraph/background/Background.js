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
            return ns.utilityFunctions.validateColor(color);
        });
//        this.hasAn("img").which.isA(ns.Background.Img);
        this.hasA("img").which.validatesWith(function (img) {
            return img instanceof ns.Background.Img;
        });
        ns.utilityFunctions.insertDefaults(this, defaultValues.background, attributes);
    });

    ns.Background = Background;

    if (Img) {
        ns.Background.Img = Img;
    }

}(window.multigraph));
