if (!window.multigraph) {
    window.multigraph = {};
}

(function (ns) {
    "use strict";

    var Img,
        Background;

    if (ns.Background && ns.Background.Img) {
        Img = ns.Background.Img;
    }

    Background = new ns.ModelTool.Model( 'Background', function () {
        this.hasA("color").which.validatesWith(function (color) {
            return ns.utilityFunctions.validateColor(color);
        });
        this.hasA("img").which.validatesWith(function (img) {
            return img instanceof window.multigraph.Background.Img;
        });

    });

    ns.Background = Background;

    if (Img) {
        ns.Background.Img = Img;
    }

}(window.multigraph));
