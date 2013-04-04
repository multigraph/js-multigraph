window.multigraph.util.namespace("window.multigraph.normalizer", function (ns) {
    "use strict";

    ns.mixin.add(function (ns) {

        ns.Legend.respondsTo("normalize", function (graph) {
            var legendPlots = this.plots(),
                graphPlots  = graph.plots(),
                columns = this.columns,
                rows    = this.rows,
                i, j,
                flag;

            //
            // stores pointers to plots with legends in the Legend object
            //
            for (i = 0; i < graphPlots.size(); i++) {
                // doesn't add a plot if it doesn't have a visible legend
                if (!graphPlots.at(i).legend() || graphPlots.at(i).legend().visible() !== true) {
                    continue;
                }

                // doesn't add a plot if it has already been added
                flag = false;
                for (j = 0; j < legendPlots.size(); j++) {
                    if (graphPlots.at(i) === legendPlots.at(j)) {
                        flag = true;
                        break;
                    }
                }
                if (flag === true) {
                    continue;
                }

                legendPlots.add(graphPlots.at(i));
            }

            //
            // If there are no plots in the legend default to 1 row and column if they aren't specified
            //
            if (legendPlots.size() === 0) {
                if (columns() === undefined) {
                    columns(1);
                }
                if (rows() === undefined) {
                    rows(1);
                }
            }

            //
            // if neither rows nor cols is specified, default to 1 col
            //
            if (rows() === undefined && columns() === undefined) {
                columns(1);
            }

            //
            // if only one of rows/cols is specified, compute the other
            //
            if (columns() === undefined) {
                columns(parseInt(legendPlots.size() / rows() + ( (legendPlots.size() % rows()) > 0 ? 1 : 0 ), 10));
            } else if (rows() === undefined) {
                rows(parseInt(legendPlots.size() / columns() + ( (legendPlots.size() % columns()) > 0 ? 1 : 0 ), 10));
            }

            return this;
        });

    });

});
