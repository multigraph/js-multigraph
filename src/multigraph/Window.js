if(!window.multigraph) {
    window.multigraph = {};
}

(function (ns) {
    "use strict";

    var Window = ns.ModelTool.Model( 'Window', function () {
        this.hasA("width").which.validatesWith(function (width) {
            return typeof(width) === 'string';
        });
        this.hasA("height").which.validatesWith(function (height) {
            return typeof(height) === 'string';
        });
        this.hasA("border").which.validatesWith(function (border) {
            return typeof(border) === 'string';
        });
        this.hasA("margin").which.validatesWith(function (margin) {
            return typeof(margin) === 'string';
        });
        this.hasA("padding").which.validatesWith(function (padding) {
            return typeof(padding) === 'string';
        });
        this.hasA("bordercolor").which.validatesWith(function (bordercolor) {
            return typeof(bordercolor) === 'string';
        });

    });

    ns.Window = Window;


}(window.multigraph));
