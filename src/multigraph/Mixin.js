if (!window.multigraph) {
    window.multigraph = {};
}

(function (ns) {
    "use strict";

    var Mixin = new ns.ModelTool.Model( "Mixin", function () {
        var mixinfuncs = [];
        
        this.respondsTo("add", function(func) {
            mixinfuncs.push(func);
        });

        this.respondsTo("apply", function() {
            var i;
            for (i=0; i<mixinfuncs.length; ++i) {
                mixinfuncs[i].apply(this, arguments);
            }
        });
   });

    ns.Mixin = Mixin;

}(window.multigraph));
