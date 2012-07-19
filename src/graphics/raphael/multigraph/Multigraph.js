if (!window.multigraph) {
    window.multigraph = {};
}

(function (ns) {
    "use strict";

    ns.raphaelMixin.add(function(ns) {

        ns.Multigraph.hasA("paper");

        ns.Multigraph.hasA("$div");  // jQuery object for the Raphael paper's div

        ns.Multigraph.respondsTo("init", function() {
            var width,
                height;
            this.$div($('#'+this.divid()));
            width = this.$div().width();
            height = this.$div().height();
            this.paper(new Raphael(this.divid(), width, height));
            this.render();
        });

        ns.Multigraph.respondsTo("render", function() {
            var i;
            for (i=0; i<this.graphs().size(); ++i) {
                this.graphs().at(i).render(this.paper());
            }
        });

    });

}(window.multigraph));
