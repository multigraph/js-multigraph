window.multigraph.util.namespace("window.multigraph.normalizer", function (ns) {
    "use strict";

    ns.mixin.add(function (ns) {

        ns.Multigraph.respondsTo("normalize", function () {
            var i;
            
            for (i = 0; i < this.graphs().size(); ++i) {
                this.graphs().at(i).normalize();
            }

            //TODO: move this code to src/normalizer/graph.js, change implementation to be more jermainish, rename
            //      functions with more meaningful names, register callbacks only when needed to provide missing axis
            //      min/max settings

            //
            // determines axes dataMin and dataMax attributes if neccesary
            //
            var setAxisBoundsIfNeeded,
                callback,
                breakdownCallback,
                minMaxCallback;

            setAxisBoundsIfNeeded = function (axis, data, column) {
                if (axis.hasDataMin() && axis.hasDataMax()) {
                    return;
                }

                var bounds = data.getBounds(column);

                if (!axis.hasDataMin()) {
                    axis.setDataRange(bounds[0], axis.dataMax());
                }
                
                if (!axis.hasDataMax()) {
                    axis.setDataRange(axis.dataMin(), bounds[1]);
                }                
            };

            breakdownCallback = function (data) {
                data.clearReady(callback);
                return;
            };

            minMaxCallback = function (data) {
                var i, j,
                    graph,
                    plot;

                for (i = 0; i < that.graphs().size(); i++) {
                    graph = that.graphs().at(i);
                    for (j = 0; j < graph.plots().size(); j++) {
                        plot = graph.plots().at(j);
                        if (plot instanceof ns.ConstantPlot === false && plot.data() === data) {
                            setAxisBoundsIfNeeded(plot.horizontalaxis(), plot.data(), plot.variable().at(0));
                            setAxisBoundsIfNeeded(plot.verticalaxis(), plot.data(), plot.variable().at(1));
                        }
                    }
                }
            };

            callback = function () {
                if (this instanceof ns.WebServiceData) {
                    breakdownCallback(this);
                } else if (this instanceof ns.CSVData) {
                    if (this.dataIsReady() === true) {
                        minMaxCallback(this);
                        breakdownCallback(this);
                    }
                } else if (this instanceof ns.ArrayData) {
                    minMaxCallback(this);
                    breakdownCallback(this);                    
                }

            };

            this.registerCommonDataCallback(callback);

        });

    });

});
