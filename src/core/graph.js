window.multigraph.util.namespace("window.multigraph.core", function (ns) {
    "use strict";

    var Box = window.multigraph.math.Box;

    var defaultValues = window.multigraph.utilityFunctions.getDefaultValuesFromXSD(),
        attributes = window.multigraph.utilityFunctions.getKeys(defaultValues),
        Graph = new window.jermaine.Model( "Graph", function () {
            this.hasA("window").which.validatesWith(function (w) {
                return w instanceof ns.Window;
            });
            this.hasA("plotarea").which.validatesWith(function (plotarea) {
                return plotarea instanceof ns.Plotarea;
            });


            this.hasA("ui").which.validatesWith(function (ui) {
                return ui instanceof ns.UI;
            });
            this.hasA("networkmonitor").which.validatesWith(function (networkmonitor) {
                return networkmonitor instanceof ns.NetworkMonitor;
            });
            this.hasA("Debugger").which.validatesWith(function (debug) {
                return debug instanceof ns.Debugger;
            });
            this.hasA("legend").which.validatesWith(function (legend) {
                return legend instanceof ns.Legend;
            });
            this.hasA("background").which.validatesWith(function (background) {
                return background instanceof ns.Background;
            });

            this.hasA("title").which.validatesWith(function (title) {
                return title instanceof ns.Title;
            });
            this.hasMany("axes").which.validatesWith(function (axis) {
                return axis instanceof ns.Axis;
            });
            this.hasMany("plots").which.validatesWith(function (plot) {
                return plot instanceof ns.Plot;
            });
            this.hasMany("data").which.validatesWith(function (data) {
                return data instanceof ns.Data;
            });

            this.hasA("windowBox").which.validatesWith(function (val) {
                return val instanceof Box;
            });
            this.hasA("paddingBox").which.validatesWith(function (val) {
                return val instanceof Box;
            });
            this.hasA("plotBox").which.validatesWith(function (val) {
                return val instanceof Box;
            });
            
            this.isBuiltWith(function () {
                this.window( new ns.Window() );
                this.plotarea( new ns.Plotarea() );
            });

            this.respondsTo("postParse", function () {
            });

            this.respondsTo("initializeGeometry", function (width, height) {
                var i;
                this.windowBox( new Box(width, height) );
                this.paddingBox( new Box(( width -
                                           ( this.window().margin().left()  + this.window().border() + this.window().padding().left() ) -
                                           ( this.window().margin().right() + this.window().border() + this.window().padding().right() )
                                         ),
                                         ( height -
                                           ( this.window().margin().top()    + this.window().border() + this.window().padding().top() ) -
                                           ( this.window().margin().bottom() + this.window().border() + this.window().padding().bottom() )
                                         )
                                        )
                               );
                this.plotBox( new Box(( this.paddingBox().width() -
                                        ( this.plotarea().margin().left() + this.plotarea().margin().right() + (2 * this.plotarea().border()))
                                      ),
                                      (
                                          this.paddingBox().height() -
                                              ( this.plotarea().margin().top() + this.plotarea().margin().bottom() + (2 * this.plotarea().border()))
                                      )
                                     )
                            );
                for (i = 0; i < this.axes().size(); ++i) {
                    this.axes().at(i).initializeGeometry(this);
                }
                if (this.legend()) {
                    this.legend().initializeGeometry(this);
                }
            });

            window.multigraph.utilityFunctions.insertDefaults(this, defaultValues, attributes);
        });

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
