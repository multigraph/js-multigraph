if(!window.multigraph) {
    window.multigraph = {};
}

if(!window.multigraph.Legend) {
    window.multigraph.Legend = {};
}

(function (ns) {
    "use strict";

    var Icon = new ns.ModelTool.Model( 'Icon', function () {
        this.hasA("height").which.validatesWith(function (height) {
            return typeof(height) === 'string';
        });
        this.hasA("width").which.validatesWith(function (width) {
            return typeof(width) === 'string';
        });
        this.hasA("border").which.validatesWith(function (border) {
            return ns.utilityFunctions.validateInteger(border);
        });

    });

    ns.Legend.Icon = Icon;


}(window.multigraph));
