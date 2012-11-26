window.multigraph.util.namespace("window.multigraph.core", function (ns) {
    "use strict";

    /**
     * @module multigraph
     * @submodule core
     */
    var Box = window.multigraph.math.Box;

    /**
     * The Graph Jermaine model controls the properties for an individual Graph.
     *
     * @class Graph
     * @for Graph
     * @constructor
     */
    var defaultValues = window.multigraph.utilityFunctions.getDefaultValuesFromXSD(),
        attributes = window.multigraph.utilityFunctions.getKeys(defaultValues),
        Graph = new window.jermaine.Model( "Graph", function () {
            /**
             * Child model which controls the properties of the Graph's Window.
             *
             * @property window
             * @type {Window}
             * @author jrfrimme
             */
            this.hasA("window").which.validatesWith(function (w) {
                return w instanceof ns.Window;
            });
            /**
             * Child model which controls the properties of the Graph's Plotarea.
             *
             * @property plotarea
             * @type {Plotarea}
             * @author jrfrimme
             */
            this.hasA("plotarea").which.validatesWith(function (plotarea) {
                return plotarea instanceof ns.Plotarea;
            });


            /**
             * Child model which controls the properties of the Graph's Legend.
             *
             * @property legend
             * @type {Legend}
             * @author jrfrimme
             */
            this.hasA("legend").which.validatesWith(function (legend) {
                return legend instanceof ns.Legend;
            });
            /**
             * Child model which controls the properties of the Graph's Background.
             *
             * @property background
             * @type {Background}
             * @author jrfrimme
             */
            this.hasA("background").which.validatesWith(function (background) {
                return background instanceof ns.Background;
            });

            /**
             * Child model which controls the properties of the Graph's Title.
             *
             * @property title
             * @type {Title}
             * @author jrfrimme
             */
            this.hasA("title").which.validatesWith(function (title) {
                return title instanceof ns.Title;
            });
            /**
             * Jermaine Attr_List of the Graph's Axes.
             *
             * @property axes
             * @type {Axis}
             * @author jrfrimme
             */
            this.hasMany("axes").which.validatesWith(function (axis) {
                return axis instanceof ns.Axis;
            });
            /**
             * Jermiane Attr_List of the Graph's Plots.
             *
             * @property plots
             * @type {Plot}
             * @author jrfrimme
             */
            this.hasMany("plots").which.validatesWith(function (plot) {
                return plot instanceof ns.Plot;
            });
            /**
             * Jermiane Attr_List of the Graph's Data sets.
             *
             * @property data
             * @type {Data}
             * @author jrfrimme
             */
            this.hasMany("data").which.validatesWith(function (data) {
                return data instanceof ns.Data;
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
             * Stroes the computed width and height of the Graph's plotBox.
             *
             * @property plotBox
             * @type {}
             * @author jrfrimme
             */
            this.hasA("plotBox").which.validatesWith(function (val) {
                return val instanceof Box;
            });
            
            this.isBuiltWith(function () {
                this.window( new ns.Window() );
                this.plotarea( new ns.Plotarea() );
                this.background( new ns.Background() );
            });

            this.respondsTo("postParse", function () {
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
                var i;
                this.windowBox( new Box(width, height) );
                this.paddingBox( new Box(
                    ( width -
                      ( this.window().margin().left()  + this.window().border() + this.window().padding().left() ) -
                      ( this.window().margin().right() + this.window().border() + this.window().padding().right() )
                    ),
                    ( height -
                      ( this.window().margin().top()    + this.window().border() + this.window().padding().top() ) -
                      ( this.window().margin().bottom() + this.window().border() + this.window().padding().bottom() )
                    )
                )
                               );
                this.plotBox( new Box(
                    ( this.paddingBox().width() -
                      ( this.plotarea().margin().left() + this.plotarea().margin().right() + (2 * this.plotarea().border()))
                    ),
                    (
                        this.paddingBox().height() -
                            ( this.plotarea().margin().top() + this.plotarea().margin().bottom() + (2 * this.plotarea().border()))
                    )
                )
                            );
                for (i = 0; i < this.axes().size(); ++i) {
                    this.axes().at(i).initializeGeometry(this, graphicsContext);
                }
                if (this.legend()) {
                    this.legend().initializeGeometry(this, graphicsContext);
                }
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
                for (i=0; i<this.data().size(); ++i) {
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
                for (i=0; i<this.data().size(); ++i) {
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
                for (i=0; i<this.data().size(); ++i) {
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
                    i,
                    axes = this.axes(),
                    naxes = this.axes().size(),
                    axis,
                    d;
                for (i = 0; i < naxes; ++i) {
                    axis = axes.at(i);
                    if ((orientation === undefined) ||
                        (orientation === null) ||
                        (axis.orientation() === orientation)) {
                        d = axis.distanceToPoint(x, y);
                        if (foundAxis===null || d < mindist) {
                            foundAxis = axis;
                            mindist = d;
                        }
                    }
                }
                return foundAxis;
            });

            window.multigraph.utilityFunctions.insertDefaults(this, defaultValues, attributes);
        });

    //TODO: convert to "respondsTo" ???
    Graph.prototype.axisById = function (id) {
      // return a pointer to the axis for this graph that has the given id, if any
        var axes = this.axes(),
            i;
        for (i = 0; i < axes.size(); ++i) {
            if (axes.at(i).id() === id) {
                return axes.at(i);
            }
        }
        return undefined;
    };

    //TODO: convert to "respondsTo" ???
    Graph.prototype.variableById = function (id) {
      // return a pointer to the variable for this graph that has the given id, if any
        var data = this.data(),
            i,
            j;
        for (i = 0; i < data.size(); ++i) {
            for (j = 0; j < data.at(i).columns().size(); ++j) {
                if (data.at(i).columns().at(j).id() === id) {
                    return data.at(i).columns().at(j);
                }
            }
        }
        return undefined;
    };

    ns.Graph = Graph;

});
