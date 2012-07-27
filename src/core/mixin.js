window.multigraph.util.namespace("window.multigraph.core", function (ns) {
    "use strict";

    var Mixin = new window.jermaine.Model( "Mixin", function () {
        //var mixinfuncs = [];

        this.hasMany("mixinfuncs");

        this.respondsTo("add", function(func) {
            this.mixinfuncs().add(func);
        });

        this.respondsTo("apply", function() {
            var i;
            for (i=0; i<this.mixinfuncs().size(); ++i) {
                this.mixinfuncs().at(i).apply(this, arguments);
            }
        });

   });

    ns.Mixin = Mixin;

});
