if (!window.multigraph) {
    window.multigraph = {};
}

(function (ns) {
    "use strict";

    var Box = window.multigraph.math.Box;

    var defaultValues = ns.utilityFunctions.getDefaultValuesFromXSD(),
        attributes = ns.utilityFunctions.getKeys(defaultValues),
        Graph = new ns.ModelTool.Model( "Graph", function () {
            this.hasA("window").which.validatesWith(function (w) {
                return w instanceof window.multigraph.Window;
            });
            this.hasA("plotarea").which.validatesWith(function (plotarea) {
                return plotarea instanceof window.multigraph.Plotarea;
            });


            this.hasA("ui").which.validatesWith(function (ui) {
                return ui instanceof window.multigraph.UI;
            });
            this.hasA("networkmonitor").which.validatesWith(function (networkmonitor) {
                return networkmonitor instanceof window.multigraph.NetworkMonitor;
            });
            this.hasA("Debugger").which.validatesWith(function (debug) {
                return debug instanceof window.multigraph.Debugger;
            });
            this.hasA("legend").which.validatesWith(function (legend) {
                return legend instanceof window.multigraph.Legend;
            });
            this.hasA("background").which.validatesWith(function (background) {
                return background instanceof window.multigraph.Background;
            });

            this.hasA("title").which.validatesWith(function (title) {
                return title instanceof window.multigraph.Title;
            });
            this.hasMany("axes").which.validatesWith(function (axis) {
                return axis instanceof window.multigraph.Axis;
            });
            this.hasMany("plots").which.validatesWith(function (plot) {
                return plot instanceof window.multigraph.Plot;
            });
            this.hasMany("data").which.validatesWith(function (data) {
                return data instanceof window.multigraph.Data;
            });

            this.hasA("windowBox").which.validatesWith(function(val) {
                return val instanceof Box;
            });
            this.hasA("paddingBox").which.validatesWith(function(val) {
                return val instanceof Box;
            });
            this.hasA("plotBox").which.validatesWith(function(val) {
                return val instanceof Box;
            });
            
            this.isBuiltWith(function() {
                this.window( new window.multigraph.Window() );
                this.plotarea( new window.multigraph.Plotarea() );
            });

            this.respondsTo("postParse", function() {
            });

            this.respondsTo("initializeGeometry", function(width, height) {
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
                                        ( this.plotarea().margin().left() + this.plotarea().margin().right())
                                      ),
                                      (
                                          this.paddingBox().height() -
                                              ( this.plotarea().margin().top() + this.plotarea().margin().bottom())
                                      )
                                     )
                            );
            });

            ns.utilityFunctions.insertDefaults(this, defaultValues, attributes);
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
            for (j = 0; j < data.at(i).variables().variable().size(); ++j) {
                if (data.at(i).variables().variable().at(j).id() === id) {
                    return data.at(i).variables().variable().at(j);
                }
            }
        }
        return undefined;
    };

    ns.Graph = Graph;

}(window.multigraph));
