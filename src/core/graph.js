var jermaine = require('../../lib/jermaine/src/jermaine.js');

var Axis = require('./axis.js'),
    Background = require('./background.js'),
    Data = require('./data.js'),
    Legend = require('./legend.js'),
    Plot = require('./plot.js'),
    Plotarea = require('./plotarea.js'),
    Title = require('./title.js'),
    Window = require('./window.js'),
    Box = require('../math/box.js'),
    DataPlot = require('../core/data_plot.js'),
    AxisBinding = require('../core/axis_binding.js');


/**
 * The Graph Jermaine model controls the properties for an individual Graph.
 *
 * @class Graph
 * @for Graph
 * @constructor
 */
var utilityFunctions = require('../util/utilityFunctions.js'),
    defaultValues = utilityFunctions.getDefaultValuesFromXSD(),
    attributes = utilityFunctions.getKeys(defaultValues);

var Graph = new jermaine.Model("Graph", function () {
    /**
     * Child model which controls the properties of the Graph's Window.
     *
     * @property window
     * @type {Window}
     * @author jrfrimme
     */
    this.hasA("window").which.validatesWith(function (w) {
        return w instanceof Window;
    });
    /**
     * Child model which controls the properties of the Graph's Plotarea.
     *
     * @property plotarea
     * @type {Plotarea}
     * @author jrfrimme
     */
    this.hasA("plotarea").which.validatesWith(function (plotarea) {
        return plotarea instanceof Plotarea;
    });


    /**
     * Child model which controls the properties of the Graph's Legend.
     *
     * @property legend
     * @type {Legend}
     * @author jrfrimme
     */
    this.hasA("legend").which.validatesWith(function (legend) {
        return legend instanceof Legend;
    });
    /**
     * Child model which controls the properties of the Graph's Background.
     *
     * @property background
     * @type {Background}
     * @author jrfrimme
     */
    this.hasA("background").which.validatesWith(function (background) {
        return background instanceof Background;
    });

    /**
     * Child model which controls the properties of the Graph's Title.
     *
     * @property title
     * @type {Title}
     * @author jrfrimme
     */
    this.hasA("title").which.validatesWith(function (title) {
        return title instanceof Title;
    });
    /**
     * Jermaine Attr_List of the Graph's Axes.
     *
     * @property axes
     * @type {Axis}
     * @author jrfrimme
     */
    this.hasMany("axes").eachOfWhich.validateWith(function (axis) {
        return axis instanceof Axis;
    });
    /**
     * Jermiane Attr_List of the Graph's Plots.
     *
     * @property plots
     * @type {Plot}
     * @author jrfrimme
     */
    this.hasMany("plots").eachOfWhich.validateWith(function (plot) {
        return plot instanceof Plot;
    });
    /**
     * Jermiane Attr_List of the Graph's Data sets.
     *
     * @property data
     * @type {Data}
     * @author jrfrimme
     */
    this.hasMany("data").eachOfWhich.validateWith(function (data) {
        return data instanceof Data;
    });

    /**
     * Stores the computed width and height of the Graph's windowBox.
     *
     * @property windowBox
     * @type {}
     * @author jrfrimme
     */
    this.hasA("windowBox").which.validatesWith(function (val) {
        return val instanceof Box;
    });
    /**
     * Stores the computed width and height of the Graph's paddingBox.
     *
     * @property paddingBox
     * @type {}
     * @author jrfrimme
     */
    this.hasA("paddingBox").which.validatesWith(function (val) {
        return val instanceof Box;
    });
    /**
     * Stores the computed width and height of the Graph's plotBox.
     *
     * @property plotBox
     * @type {}
     * @author jrfrimme
     */
    this.hasA("plotBox").which.validatesWith(function (val) {
        return val instanceof Box;
    });

    /**
     * The containing Multigraph object
     *
     * @property multigraph
     * @type {}
     * @author mbp
     */
    this.hasA("multigraph").which.validatesWith(function (val) {
        //avoid using instanceof, so we don't have to require('multigraph.js') above!!!
        //return val instanceof Multigraph;
        //Just check for busySpinnerLevel function, since that's the part of the
        //multigraph that we use (duck typing).
        return (typeof(val.busySpinnerLevel) == "function");
    });

    this.hasA("x0").which.isA("number");
    this.hasA("y0").which.isA("number");

    this.isBuiltWith(function () {
        this.window( new Window() );
        this.plotarea( new Plotarea() );
        this.background( new Background() );
    });

    this.respondsTo("postParse", function () {
        var i,
            that = this,
            handleAjaxEvent = function(event) {
                if (event.action === 'start') {
                    if (that.multigraph()) {
                        that.multigraph().busySpinnerLevel(1);
                    }
                } else if (event.action === 'complete') {
                    if (that.multigraph()) {
                        that.multigraph().busySpinnerLevel(-1);
                    }
                }
            };

        for (i=0; i<this.data().size(); ++i) {
            this.data().at(i).addListener("ajaxEvent", handleAjaxEvent);
        }
    });

    /**
     * Initializes the Graph's geometry. Determines the width and height of the Graph's `windowBox`,
     * `paddingBox` and `plotBox`; calls its Axes' and Legend's implementations of
     * `initializeGeometry`.
     *
     * @method initializeGeometry
     * @param {Integer} width Width of the multigraph's div
     * @param {Integer} height Height of the multigraph's div
     * @param {Object} graphicsContext
     * @author jrfrimme
     */
    this.respondsTo("initializeGeometry", function (width, height, graphicsContext) {
        var w              = this.window(),
            windowBorder   = w.border(),
            windowMargin   = w.margin(),
            windowPadding  = w.padding(),
            plotarea       = this.plotarea(),
            plotareaBorder = plotarea.border(),
            plotareaMargin = plotarea.margin(),
            i;

        this.windowBox( new Box(width, height) );
        this.paddingBox( new Box(
            ( width -
              ( windowMargin.left()  + windowBorder + windowPadding.left() ) -
              ( windowMargin.right() + windowBorder + windowPadding.right() )
            ),
            ( height -
              ( windowMargin.top()    + windowBorder + windowPadding.top() ) -
              ( windowMargin.bottom() + windowBorder + windowPadding.bottom() )
            )
        )
                       );
        this.plotBox( new Box(
            (
                this.paddingBox().width() -
                    ( plotareaMargin.left() + plotareaMargin.right() + (2 * plotareaBorder))
            ),
            (
                this.paddingBox().height() -
                    ( plotareaMargin.top() + plotareaMargin.bottom() + (2 * plotareaBorder))
            )
        )
                    );
        for (i = 0; i < this.axes().size(); ++i) {
            this.axes().at(i).initializeGeometry(this, graphicsContext);
        }
        if (this.legend()) {
            this.legend().initializeGeometry(this, graphicsContext);
        }
        if (this.title()) {
            this.title().initializeGeometry(graphicsContext);
        }

        this.x0( windowMargin.left()   + windowBorder + windowPadding.left()   + plotareaMargin.left()   + plotareaBorder );
        this.y0( windowMargin.bottom() + windowBorder + windowPadding.bottom() + plotareaMargin.bottom() + plotareaBorder );
    });

    /**
     * Convience function for registering callback functions on the Graph's `Data` models. Adds
     * `dataReady` event listeners to each of the Graph's `Data` models.
     *
     * @method registerCommonDataCallback
     * @param {Function} callback
     * @author jrfrimme
     */
    this.respondsTo("registerCommonDataCallback", function (callback) {
        var i;
        for (i = 0; i < this.data().size(); ++i) {
            this.data().at(i).addListener("dataReady", callback);
        }
    });

    /**
     * 
     *
     * @method pauseAllData
     * @author jrfrimme
     */
    this.respondsTo("pauseAllData", function () {
        var i;
        // pause all this graph's data sources:
        for (i = 0; i < this.data().size(); ++i) {
            this.data().at(i).pause();
        }
    });

    /**
     * 
     *
     * @method resumeAllData
     * @author jrfrimme
     */
    this.respondsTo("resumeAllData", function () {
        var i;
        // resume all this graph's data sources:
        for (i = 0; i < this.data().size(); ++i) {
            this.data().at(i).resume();
        }
    });

    /**
     * 
     *
     * @method findNearestAxis
     * @param {} x
     * @param {} y
     * @param {} orientation
     * @author jrfrimme
     */
    this.respondsTo("findNearestAxis", function (x, y, orientation) {
        var foundAxis = null,
            mindist = 9999,
            axes = this.axes(),
            naxes = this.axes().size(),
            axis,
            i,
            d;
        for (i = 0; i < naxes; ++i) {
            axis = axes.at(i);
            if ((orientation === undefined) ||
                (orientation === null) ||
                (axis.orientation() === orientation)) {
                d = axis.distanceToPoint(x, y);
                if (foundAxis === null || d < mindist) {
                    foundAxis = axis;
                    mindist = d;
                }
            }
        }
        return foundAxis;
    });

    this.respondsTo("axisById", function (id) {
        // return a pointer to the axis for this graph that has the given id, if any
        var axes = this.axes(),
            i;
        for (i = 0; i < axes.size(); ++i) {
            if (axes.at(i).id() === id) {
                return axes.at(i);
            }
        }
        return undefined;
    });

    this.respondsTo("variableById", function (id) {
        // return a pointer to the variable for this graph that has the given id, if any
        var data = this.data(),
            columns,
            i,
            j;
        for (i = 0; i < data.size(); ++i) {
            columns = data.at(i).columns();
            for (j = 0; j < columns.size(); ++j) {
                if (columns.at(j).id() === id) {
                    return columns.at(j);
                }
            }
        }
        return undefined;
    });

    this.respondsTo("normalize", function () {
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

    utilityFunctions.insertDefaults(this, defaultValues, attributes);
});

module.exports = Graph;
