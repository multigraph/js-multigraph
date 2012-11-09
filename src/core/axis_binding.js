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
            this.axes().add({
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
            var initiatingAxisIndex,
                i, j,
                axes = this.axes(),
                axis;

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
                    axis.axis.setDataRangeNoBind(min, max, dispatch);
                } else {
                    axis.axis.setDataRangeNoBind(
                        (min * axes[initiatingAxisIndex].factor + axes[initiatingAxisIndex].offset - axis.offset) / axis.factor,
                        (max * axes[initiatingAxisIndex].factor + axes[initiatingAxisIndex].offset - axis.offset) / axis.factor,
                        dispatch
                    );
                }
            }
        });

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
