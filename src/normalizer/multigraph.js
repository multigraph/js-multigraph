window.multigraph.util.namespace("window.multigraph.normalizer", function (ns) {
    "use strict";

    ns.mixin.add(function (ns) {

        ns.Multigraph.respondsTo("normalize", function () {
            var i;
            for (i = 0; i < this.graphs.size(); ++i) {
                this.graphs.at(i).normalize();
            }
        });

    });

});
