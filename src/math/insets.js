window.multigraph.util.namespace("window.multigraph.math", function (ns) {
    "use strict";

    ns.Insets = new window.jermaine.Model( "Insets", function () {
        this.hasA("top").which.isA("number");
        this.hasA("left").which.isA("number");
        this.hasA("bottom").which.isA("number");
        this.hasA("right").which.isA("number");
        this.respondsTo("set", function(top,left,bottom,right) {
            this.top(top);
            this.left(left);
            this.bottom(bottom);
            this.right(right);
        });
        this.isBuiltWith("top", "left", "bottom", "right");
    });
    
});
