var NormalizerMixin = require('./normalizer_mixin.js');

NormalizerMixin.add(function () {
    var Graph = require('../core/graph.js'),
        Axis = require('../core/axis.js'),
        DataPlot = require('../core/data_plot.js'),
        AxisBinding = require('../core/axis_binding.js');

    Graph.respondsTo("normalize", function () {
        var HORIZONTAL = Axis.HORIZONTAL,
            VERTICAL   = Axis.VERTICAL,
            axes  = this.axes(),
            plots = this.plots(),
            i, j,
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
        for (i = 0; i < axes.size(); i++) {
            if (axes.at(i).orientation() === HORIZONTAL) {
                haxisCount++;
            } else if (axes.at(i).orientation() === VERTICAL) {
                vaxisCount++;
            }
        }

        if (haxisCount === 0) {
            axes.add(new Axis(HORIZONTAL));
        }
        if (vaxisCount === 0) {
            axes.add(new Axis(VERTICAL));
        }

        //
        // Handles missing id's for axes
        //
        haxisCount = 0;
        vaxisCount = 0;
        for (i = 0; i < axes.size(); i++) {
            axis = axes.at(i);
            if (axis.orientation() === HORIZONTAL) {
                axisid = "x";
                if (haxisCount > 0) {
                    axisid += haxisCount;
                }
                haxisCount++;
            } else if (axis.orientation() === VERTICAL) {
                axisid = "y";
                if (vaxisCount > 0) {
                    axisid += vaxisCount;
                }
                vaxisCount++;
            }

            if (axis.id() === undefined) {
                axis.id(axisid);
            }
        }

        //
        // normalizes the rest of the axis properties
        //
        for (i = 0; i < axes.size(); i++) {
            axes.at(i).normalize(this);
        }

        //
        // handles missing plot tags
        //
        if (plots.size() === 0) {
            plots.add(new DataPlot());
        }

        //
        // normalizes the plots
        //
        for (i = 0; i < plots.size(); i++) {
            plots.at(i).normalize(this);
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
        AxisBinding.syncAllBindings();

        //
        // arrange to set missing axis min/max values when data is ready, if necessary
        // 
        for (i = 0; i < axes.size(); i++) {
            // for each axis...
            axis = axes.at(i);
            if (!axis.hasDataMin() || !axis.hasDataMax()) {
                // if this axis is mising either a dataMin() or dataMax() value...
                for (j = 0; j < plots.size(); ++j) {
                    // find a DataPlot that references this axis...
                    plot = plots.at(j);
                    if (plot instanceof DataPlot && (plot.horizontalaxis() === axis || plot.verticalaxis() === axis)) {
                        // ... and then register a dataReady listener for this plot's data section which sets the
                        // missing bound(s) on the axis once the data is ready.  Do this inside a closure so that we
                        // can refer to a pointer to our dynamically-defined listener function from inside itself,
                        // so that we can de-register it once it is called; this is done via the the local variable
                        // axisBoundsSetter.  The closure also serves to capture the current values, via arguments,
                        // of the axis pointer, a pointer to the data object, and a boolean (isHorizontal) that
                        // indicates whether the axis is the plot's horizontal or vertical axis.
                        (function (axis, data, isHorizontal) {
                            var axisBoundsSetter = function (event) {
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
