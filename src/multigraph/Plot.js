if(!window.multigraph) {
    window.multigraph = {};
}

(function (ns) {
    "use strict";

    var Plot = new ns.ModelTool.Model( 'Plot', function() {
        this.hasA("horizontalaxis").which.validatesWith(function(axis) {
            return axis instanceof window.multigraph.Axis;
        });
        this.hasA("verticalaxis").which.validatesWith(function(axis) {
            return axis instanceof window.multigraph.Axis;
        });
    });

    ns.Plot = Plot;


}(window.multigraph));
