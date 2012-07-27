window.multigraph.util.namespace("window.multigraph.math", function (ns) {
    "use strict";

    ns.Box = new window.jermaine.Model( "Box", function () {
        this.hasA("width").which.isA("number");
        this.hasA("height").which.isA("number");
        this.isBuiltWith("width", "height");
    });
    
});
