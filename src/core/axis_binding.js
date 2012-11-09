window.multigraph.util.namespace("window.multigraph.core", function (ns) {
    "use strict";

    ns.AxisBinding = new window.jermaine.Model( "AxisBinding", function () {
        var AxisBinding = this;

        AxisBinding.instances = [];

        this.hasA("id").which.isA("string");

        this.hasA("axes"); // js array

        this.isBuiltWith("id", function() {
            AxisBinding.instances[this.id()] = this;
            this.axes([]);
        });

        this.respondsTo("addAxis", function(axis, min, max) {
            if (axis.binding()) {
                axis.binding().removeAxis(axis);
            }
            axis.binding(this);
            this.axes().push({
                axis   : axis,
                factor : 1 / (max - min),
                offset : -min / (max - min),
                min    : min,
                max    : max
            });
        });

        this.respondsTo("removeAxis", function(axis) {
            var axes = this.axes(),
                i;
            for (i=0; i<axes.length(); ++i) {
                if (axes[i].axis === axis) {
                    axes.splice(i,1);
                    break;
                }
            }
        });

        this.respondsTo("setDataRange", function(initiatingAxis, min, max, dispatch) {

            // NOTE: min and max may either be plain numbers, or
            // DataValue instances.  If they're DataValue instances,
            // get converted to numbers here before being
            // passed to the individual axes' setDataRangeNoBind()
            // method below.

            var initiatingAxisIndex,
                i, j,
                axes = this.axes(),
                axis,
                minRealValue = initiatingAxis.toRealValue(min),
                maxRealValue = initiatingAxis.toRealValue(max);

            if (dispatch === undefined) {
                dispatch = true; // dispatch defaults to true
            }

            for (i=0; i<axes.length; ++i) {
                if (axes[i].axis === initiatingAxis) {
                    initiatingAxisIndex = i;
                    break;
                }
            }
            for (i=0; i<axes.length; ++i) {
                axis = axes[i];
                if (i === initiatingAxisIndex) {
                    axis.axis.setDataRangeNoBind(minRealValue, maxRealValue, dispatch);
                } else {
                    axis.axis.setDataRangeNoBind(
                        (minRealValue * axes[initiatingAxisIndex].factor + axes[initiatingAxisIndex].offset - axis.offset) / axis.factor,
                        (maxRealValue * axes[initiatingAxisIndex].factor + axes[initiatingAxisIndex].offset - axis.offset) / axis.factor,
                        dispatch
                    );
                }
            }
        });

/*

NOTE: Note sure why/if we need the two functions below; they're here
because I copied/translated them from the Flash version.  If we do end
up needing them, we need to first resolve the issue of converting
to/from number values vs DataValue instances for min/max.

    mbp Fri Nov 9 17:15:26 2012

        this.respondsTo("setDataRangeNoBind", function (min, max, factor, offset) {
            var axes = this.axes(),
                j;
            for (j=0; j<axes.length; ++j) {
                axes[j].axis.setDataRangeNoBind((min * factor + offset - axes[j].offset) / axes[j].factor,
                                                (max * factor + offset - axes[j].offset) / axes[j].factor);
            }
        });

        AxisBinding.setAxisBindingDataRangeNoBind = function(bindingId, min, max, factor, offset) {
            var binding = AxisBinding.getInstanceById(bindingId);
            if (binding) {
                binding.setDataRangeNoBind(min, max, factor, offset);
            }
        };
*/


        AxisBinding.getInstanceById = function(id) {
            return AxisBinding.instances[id];
        };

        AxisBinding.findByIdOrCreateNew = function(id) {
            var binding = AxisBinding.getInstanceById(id);
            if (!binding) {
                binding = new AxisBinding(id);
            }
            return binding;
        };
    });

});
