window.multigraph.util.namespace("window.multigraph.normalizer", function (ns) {
    "use strict";

    ns.mixin.add(function (ns) {

        ns.Legend.respondsTo("normalize", function (graph) {
            var i, j,
                flag;

            //
            // stores pointers to plots with legends in the Legend object
            //
            for (i = 0; i < graph.plots().size(); i++) {
                // doesn't add a plot if it doesn't have a visible legend
                if (!graph.plots().at(i).legend() || graph.plots().at(i).legend().visible() !== true) {
                    continue;
                }

                // doesn't add a plot if it has already been added
                flag = false;
                for (j = 0; j < this.plots().size(); j++) {
                    if (graph.plots().at(i) === this.plots().at(j)) {
                        flag = true;
                        break;
                    }
                }
                if (flag === true) {
                    continue;
                }

                this.plots().add(graph.plots().at(i));
            }

            //
            // If there are no plots in the legend default to 1 row and column if they aren't specified
            //
            if (this.plots().size() === 0) {
                if (this.columns() === undefined) {
                    this.columns(1);
                }
                if (this.rows() === undefined) {
                    this.rows(1);
                }
            }

            //
            // if neither rows nor cols is specified, default to 1 col
            //
            if (this.rows() === undefined && this.columns() === undefined) {
                this.columns(1);
            }

            //
            // if only one of rows/cols is specified, compute the other
            //
            if (this.columns() === undefined) {
                this.columns(parseInt(this.plots().size() / this.rows() + ( (this.plots().size() % this.rows()) > 0 ? 1 : 0 ), 10));
            } else if (this.rows() === undefined) {
                this.rows(parseInt(this.plots().size() / this.columns() + ( (this.plots().size() % this.columns()) > 0 ? 1 : 0 ), 10));
            }

            return this;
        });

    });

});
