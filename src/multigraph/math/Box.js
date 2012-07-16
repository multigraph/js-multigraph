// 1. isA
// 2. quotes
if (!window.multigraph) {
    window.multigraph = {};
}
if (!window.multigraph.math) {
    window.multigraph.math = {};
}

(function (ns) {
    "use strict";

    var Box = new ns.ModelTool.Model( 'Box', function () {
        
        this.hasA("width").which.validatesWith(function (val) {
            return typeof(val) === 'number';
        });
        this.hasA("height").which.validatesWith(function (val) {
            return typeof(val) === 'number';
        });
        this.isBuiltWith('width', 'height');
    });

    ns.math.Box = Box;
    
}(window.multigraph));
