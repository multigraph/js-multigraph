if (!window.multigraph) {
    window.multigraph = {};
}
if (!window.multigraph.math) {
    window.multigraph.math = {};
}

(function (ns) {
    "use strict";

    var Point = new ns.ModelTool.Model( "Point", function () {
        this.hasA("x").which.isA("number");
        this.hasA("y").which.isA("number");
        this.isBuiltWith("x", "y");
        this.respondsTo("serialize", function() {
            return this.x() + "," + this.y();
        });
    });

    Point.regExp = /^\s*([0-9\-\+\.eE]+)(,|\s+|\s*,\s+|\s+,\s*)([0-9\-\+\.eE]+)\s*$/

    Point.parse = function(string) {
        var ar = Point.regExp.exec(string),
            p;
        // ar[1] is x value
        // ar[2] is separator between x and y
        // ar[3] is y value
        
        if (!ar || ar.length != 4) {
            throw new Error("cannot parse string '"+string+"' as a Point");
        }
        return new Point(parseFloat(ar[1]), parseFloat(ar[3]));
    };

    ns.math.Point = Point;
    
}(window.multigraph));
