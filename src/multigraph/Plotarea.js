if(!window.multigraph) {
    window.multigraph = {};
}

(function (ns) {
    "use strict";

    var Plotarea = ns.ModelTool.Model('Plotarea', function () {
        this.hasA("marginbottom").which.validatesWith(function (marginbottom) {
            return typeof(marginbottom) === 'string';
        });
        this.hasA("marginleft").which.validatesWith(function (marginleft) {
            return typeof(marginleft) === 'string';
        });
        this.hasA("margintop").which.validatesWith(function (margintop) {
            return typeof(margintop) === 'string';
        });
        this.hasA("marginright").which.validatesWith(function (marginright) {
            return typeof(marginright) === 'string';
        });
        this.hasA("border").which.validatesWith(function (border) {
            return typeof(border) === 'string';
        });
        this.hasA("bordercolor").which.validatesWith(function (bordercolor) {
            return typeof(bordercolor) === 'string';
        });

    });

    ns.Plotarea = Plotarea;


}(window.multigraph));
