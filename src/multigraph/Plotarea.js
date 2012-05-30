if(!window.multigraph) {
    window.multigraph = {};
}

(function (ns) {
    "use strict";

    var Plotarea = new ns.ModelTool.Model('Plotarea', function () {
        this.hasA("marginbottom").which.validatesWith(function (marginbottom) {
            return ns.utilityFunctions.validateInteger(marginbottom);
        });
        this.hasA("marginleft").which.validatesWith(function (marginleft) {
            return ns.utilityFunctions.validateInteger(marginleft);
        });
        this.hasA("margintop").which.validatesWith(function (margintop) {
            return ns.utilityFunctions.validateInteger(margintop);
        });
        this.hasA("marginright").which.validatesWith(function (marginright) {
            return ns.utilityFunctions.validateInteger(marginright);
        });
        this.hasA("border").which.validatesWith(function (border) {
            return ns.utilityFunctions.validateInteger(border);
        });
        this.hasA("bordercolor").which.validatesWith(function (bordercolor) {
            return ns.utilityFunctions.validateColor(bordercolor);
        });

    });

    ns.Plotarea = Plotarea;


}(window.multigraph));
