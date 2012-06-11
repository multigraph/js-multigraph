if (!window.multigraph) {
    window.multigraph = {};
}

(function (ns) {
    "use strict";

    var defaultValues = ns.utilityFunctions.getDefaultValuesFromXSD(),
        attributes = ns.utilityFunctions.getKeys(defaultValues),
        Graph = new ns.ModelTool.Model( 'Graph', function () {
            this.hasA("window").which.validatesWith(function (w) {
                return w instanceof window.multigraph.Window;
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
            this.hasA("plotarea").which.validatesWith(function (plotarea) {
                return plotarea instanceof window.multigraph.Plotarea;
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
