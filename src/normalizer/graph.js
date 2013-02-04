window.multigraph.util.namespace("window.multigraph.normalizer", function (ns) {
    "use strict";

    ns.mixin.add(function (ns) {

        ns.Graph.respondsTo("normalize", function () {
            var i, j,
                haxisCount = 0,
                vaxisCount = 0,
                axis,
                axisid,
                plot;

            //
            // normalizes the data sections
            //
            for (i = 0; i < this.data().size(); i++) {
                this.data().at(i).normalize();
            }

            //
            // Handles missing horizontalaxis and vertical axis tags
            //
            for (i = 0; i < this.axes().size(); i++) {
                if (this.axes().at(i).orientation() === ns.Axis.HORIZONTAL) {
                    haxisCount++;
                } else if (this.axes().at(i).orientation() === ns.Axis.VERTICAL) {
                    vaxisCount++;
                }
            }

            if (haxisCount === 0) {
                this.axes().add(new ns.Axis(ns.Axis.HORIZONTAL));
            }
            if (vaxisCount === 0) {
                this.axes().add(new ns.Axis(ns.Axis.VERTICAL));
            }

            //
            // Handles missing id's for axes
            //
            haxisCount = 0;
            vaxisCount = 0;
            for (i = 0; i < this.axes().size(); i++) {
                if (this.axes().at(i).orientation() === ns.Axis.HORIZONTAL) {
                    axisid = "x";
                    if (haxisCount > 0) {
                        axisid += haxisCount;
                    }
                    haxisCount++;
                } else if (this.axes().at(i).orientation() === ns.Axis.VERTICAL) {
                    axisid = "y";
                    if (vaxisCount > 0) {
                        axisid += vaxisCount;
                    }
                    vaxisCount++;
                }

                if (this.axes().at(i).id() === undefined) {
                    this.axes().at(i).id(axisid);
                }
            }

            //
            // normalizes the rest of the axis properties
            //
            for (i = 0; i < this.axes().size(); i++) {
                this.axes().at(i).normalize(this);
            }

            //
            // handles missing plot tags
            //
            if (this.plots().size() === 0) {
                this.plots().add(new ns.DataPlot());
            }

            //
            // normalizes the plots
            //
            for (i = 0; i < this.plots().size(); i++) {
                var p = this.plots().at(i);
                this.plots().at(i).normalize(this);
            }

            //
            // normalizes the legend
            //
            if (this.legend()) {
                this.legend().normalize(this);
            }

            //
            // execute the setDataRange method for each axis binding, to sync up all axes
            // that participate in the binding (this takes care of setting dataMin/dataMax
            // for any axes that don't have them already but which are bound to axes that
            // do have them)
            // 
            ns.AxisBinding.syncAllBindings();

            //
            // arrange to set missing axis min/max values when data is ready, if necessary
            // 
            for (i = 0; i < this.axes().size(); i++) {
                // for each axis...
                axis = this.axes().at(i);
                if (!axis.hasDataMin() || !axis.hasDataMax()) {
                    // if this axis is mising either a dataMin() or dataMax() value...
                    for (j=0; j < this.plots().size(); ++j) {
                        // find a DataPlot that references this axis...
                        plot = this.plots().at(j);
                        if (plot instanceof ns.DataPlot && (plot.horizontalaxis() === axis || plot.verticalaxis() === axis)) {
                            // ... and then register a dataReady listener for this plot's data section which sets the
                            // missing bound(s) on the axis once the data is ready.  Do this inside a closure so that we
                            // can refer to a pointer to our dynamically-defined listener function from inside itself,
                            // so that we can de-register it once it is called; this is done via the the local variable
                            // axisBoundsSetter.  The closure also serves to capture the current values, via arguments,
                            // of the axis pointer, a pointer to the data object, and a boolean (isHorizontal) that
                            // indicates whether the axis is the plot's horizontal or vertical axis.
                            (function(axis, data, isHorizontal) {
                                var axisBoundsSetter = function(event) {
                                    var columnNumber = isHorizontal ? 0 : 1,
                                        bounds = data.getBounds(columnNumber),
                                        min = axis.dataMin(),
                                        max = axis.dataMax();
                                    if (!axis.hasDataMin()) {
                                        min = bounds[0];
                                    }
                                    if (!axis.hasDataMax()) {
                                        max = bounds[1];
                                    }
                                    if (!axis.hasDataMin() || !axis.hasDataMax()) {
                                        axis.setDataRange(min, max);
                                    }
                                    data.removeListener('dataReady', axisBoundsSetter);
                                };
                                data.addListener('dataReady', axisBoundsSetter);
                            }(axis,                             // axis
                              plot.data(),                      // data
                              plot.horizontalaxis() === axis    // isHorizontal
                             ));
                            break; // for (j=0; j < this.plots().size(); ++j)...
                        }
                    }
                }
            }



        });

    });

});
