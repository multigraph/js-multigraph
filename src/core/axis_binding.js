var AxisBinding = new window.jermaine.Model("AxisBinding", function () {
    var AxisBinding = this;
    
    AxisBinding.instances = {};

    /**
     * 
     *
     * @property id
     * @type {String}
     * @author jrfrimme
     */
    this.hasA("id").which.isA("string");

    /**
     * 
     *
     * @property axes
     * @type {Array}
     * @author jrfrimme
     */
    this.hasA("axes"); // js array

    this.isBuiltWith("id", function() {
        AxisBinding.instances[this.id()] = this;
        this.axes([]);
    });

    /**
     * 
     *
     * @method addAxis
     * @param {Axis} axis
     * @param {number|DataValue} min
     * @param {number|DataValue} max
     * @author jrfrimme
     */
    this.respondsTo("addAxis", function(axis, min, max, multigraph/*optional*/) {
        // NOTE: min/max can be either numbers, or DataValue
        // instances, but they CANNOT be strings.

        if (axis.binding()) {
            axis.binding().removeAxis(axis);
        }
        axis.binding(this);

        // convert min/max to numbers
        min = axis.toRealValue(min);
        max = axis.toRealValue(max);

        this.axes().push({
            axis       : axis,
            multigraph : multigraph,
            factor     : 1 / (max - min),
            offset     : -min / (max - min),
            min        : min,
            max        : max
        });
    });

    /**
     * 
     *
     * @method removeAxis
     * @param {Axis} axis
     * @author jrfrimme
     */
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

    /**
     * Force all the axes in this binding to sync up with each
     * other, if possible.
     * 
     * This is done by looking for an axis in this binding which
     * has its dataMin and dataMax values set, and then calling
     * its setDataRange() method with those values.  The main
     * purpose of this method is to facilitate the initial setting
     * of dataMin/dataMax values for axes in a binding that do not
     * already have dataMin/dataMax values set; this forces them
     * to be set based on the binding, as determined by another
     * axis in the binding.
     * 
     * Note that this method is NOT the normal way for bound axes
     * to interact with each other once initialization is
     * complete; that is done via the axes' own setDataRange()
     * method.
     * 
     * @method sync
     * 
     * @return {boolean} a value indicating whether the sync was
     *                   done; this will be true if and only if
     *                   there is at least one axis in the binding
     *                   having both its dataMin and dataMax
     *                   values set.
     */
    this.respondsTo("sync", function() {
        var i,
            axes = this.axes(),
            axis;
        for (i=0; i<axes.length; ++i) {
            axis = axes[i].axis;
            if (axis.hasDataMin() && axis.hasDataMax()) {
                axis.setDataRange(axis.dataMin(), axis.dataMax());
                return true;
            }

        }
        return false;
    });

    /**
     * 
     *
     * @method setDataRange
     * @param {Axis} initiatingAxis
     * @param {number|DataValue} min
     * @param {number|DataValue} max
     * @param {Boolean} dispatch
     * @author jrfrimme
     */
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
            maxRealValue = initiatingAxis.toRealValue(max),
            redrawn_multigraphs = [],
            redrawn;

        if (dispatch === undefined) {
            dispatch = true; // dispatch defaults to true
        }

        for (i=0; i<axes.length; ++i) {
            if (axes[i].axis === initiatingAxis) {
                initiatingAxisIndex = i;
                redrawn_multigraphs = [ axes[i].multigraph ];
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
                if (axis.multigraph !== undefined) {
                    // If this axis has a multigraph stored with it, and if that multigraph isn't already in the `redrawn_multigraphs`
                    // array, call its `redraw` method, and add it to the array.
                    redrawn = false;
                    for (j=0; j<redrawn_multigraphs.length; ++j) {
                        if (axis.multigraph === redrawn_multigraphs[j]) {
                            redrawn = true;
                            break;
                        }
                    }
                    if (!redrawn) {
                        axis.multigraph.redraw();
                        redrawn_multigraphs.push(axis.multigraph);
                    }
                }
            }
        }
    });

    /**
     * 
     *
     * @method getInstanceById
     * @static
     * @param id
     * @author jrfrimme
     */
    AxisBinding.getInstanceById = function(id) {
        return AxisBinding.instances[id];
    };

    /**
     * 
     *
     * @method findByIdOrCreateNew
     * @static
     * @param id
     * @author jrfrimme
     */
    AxisBinding.findByIdOrCreateNew = function(id) {
        var binding = AxisBinding.getInstanceById(id);
        if (!binding) {
            binding = new AxisBinding(id);
        }
        return binding;
    };

    /**
     * 
     *
     * @method syncAllBindings
     * @static
     * @author jrfrimme
     */
    AxisBinding.syncAllBindings = function() {
        var id;
        for (id in AxisBinding.instances) {
            AxisBinding.instances[id].sync();
        }
    };

    /**
     * 
     *
     * @method forgetAllBindings
     * @static
     * @author jrfrimme
     */
    AxisBinding.forgetAllBindings = function() {

        // This function is just for use in testing, so we can clear out the global list
        // of bindings to get a fresh start between tests.

        var id,j,binding;

        // loop over all bindings, all axes, setting the axis binding to null
        for (id in AxisBinding.instances) {
            binding = AxisBinding.instances[id];
            for (j=0; j<binding.axes().length; ++j) {
                binding.axes()[j].axis.binding(null);
            }
        }

        // reset the global binding list
        AxisBinding.instances = {};
    };

});

module.exports = AxisBinding;
