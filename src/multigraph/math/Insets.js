if (!window.multigraph) {
    window.multigraph = {};
}
if (!window.multigraph.math) {
    window.multigraph.math = {};
}

(function (ns) {
    "use strict";

    var Insets = new ns.ModelTool.Model( 'Insets', function () {
        
        this.hasA("top").which.validatesWith(function (val) {
            return typeof(val) === 'number';
        });
        this.hasA("left").which.validatesWith(function (val) {
            return typeof(val) === 'number';
        });
        this.hasA("bottom").which.validatesWith(function (val) {
            return typeof(val) === 'number';
        });
        this.hasA("right").which.validatesWith(function (val) {
            return typeof(val) === 'number';
        });
        this.respondsTo("set", function(top,left,bottom,right) {
            this.top(top);
            this.left(left);
            this.bottom(bottom);
            this.right(right);
        });
        this.isBuiltWith('top', 'left', 'bottom', 'right');
    });

    ns.math.Insets = Insets;
    
}(window.multigraph));
