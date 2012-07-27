if (!window.multigraph) {
    window.multigraph = {};
}
if (!window.multigraph.math) {
    window.multigraph.math = {};
}

(function (ns) {
    "use strict";

    var Box = new window.jermaine.Model( "Box", function () {
        
        this.hasA("width").which.isA("number");
        this.hasA("height").which.isA("number");
        this.isBuiltWith("width", "height");
    });

    ns.math.Box = Box;
    
}(window.multigraph));
