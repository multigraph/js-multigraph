if(!window.multigraph) {
    window.multigraph = {};
}

if(!window.multigraph.Background) {
    window.multigraph.Background = {};
}

(function (ns) {
    "use strict";

    var Img = ns.ModelTool.Model( 'Img', function () {
        this.hasA("src").which.validatesWith(function (src) {
            return typeof(src) === 'string';
        });
        this.hasA("anchor").which.validatesWith(function (anchor) {
            return ns.utilityFunctions.validateCoordinatePair(anchor);
        });
        this.hasA("base").which.validatesWith(function (base) {
            return ns.utilityFunctions.validateCoordinatePair(base);
        });
        this.hasA("position").which.validatesWith(function (position) {
            return ns.utilityFunctions.validateCoordinatePair(position);
        });
        this.hasA("frame").which.validatesWith(function (frame) {
            return ns.utilityFunctions.validateColor(frame);
        });

    });

    ns.Background.Img = Img;


}(window.multigraph));
