var jermaine = require('../../lib/jermaine/src/jermaine.js');

var PlotLegend = require('./plot_legend.js'),
    Axis = require('./axis.js'),
    Renderer = require('./renderer.js');

var Plot = new jermaine.Model("Plot", function () {
    this.hasA("legend").which.validatesWith(function (legend) {
        return legend instanceof PlotLegend;
    });
    this.hasA("horizontalaxis").which.validatesWith(function (axis) {
        return axis instanceof Axis;
    });
    this.hasA("verticalaxis").which.validatesWith(function (axis) {
        return axis instanceof Axis;
    });
    this.hasA("renderer").which.validatesWith(function (renderer) {
        return renderer instanceof Renderer;
    });

    this.respondsTo("normalize", function(graph) {
        var graphAxes = graph.axes(),
            rendererType,
            numberOfVariables,
            findNextVariableAtOrAfter,
            i,
            DataPlot = require('../core/data_plot.js');

        //
        // Handles missing variables
        //
        findNextVariableAtOrAfter = function (plot, data, index) {
            var overlapFlag = false,
                variableInPlotFlag,
                i = index,
                j,
                variable;

            while (true) {
                if (i === index && overlapFlag === true) {
                    throw new Error("Plot Normalizer: There does not exist an unused variable");
                }

                if (i === data.columns().size()) {
                    i = 0;
                    overlapFlag = true;
                }

                variableInPlotFlag = false;
                variable = data.columns().at(i);

                for (j = 0; j < plot.variable().size(); j++) {
                    if (plot.variable().at(j) === variable) {
                        variableInPlotFlag = true;
                        break;
                    }
                }

                if (variableInPlotFlag === false) {
                    return variable;
                }

                i++;
            }
            
        };

        //
        // Handles missing horizontalaxis tags
        //
        if (this.horizontalaxis() === undefined) {
            for (i = 0; i < graphAxes.size(); i++) {
                if (graphAxes.at(i).orientation() === Axis.HORIZONTAL) {
                    this.horizontalaxis(graphAxes.at(i));
                    break;
                }
            }
        }

        //
        // Handles missing verticalaxis tags
        //
        if (this.verticalaxis() === undefined) {
            for (i = 0; i < graphAxes.size(); i++) {
                if (graphAxes.at(i).orientation() === Axis.VERTICAL) {
                    this.verticalaxis(graphAxes.at(i));
                    break;
                }
            }
        }

        //
        // Handles missing renderer tags
        //
        if (this.renderer() === undefined) {
            require('./renderers/all_renderers.js');
            rendererType = Renderer.Type.parse("line");
            this.renderer(Renderer.create(rendererType));
            this.renderer().plot(this);
        }

        numberOfVariables = this.renderer().numberOfVariables();

        if (this instanceof DataPlot) {
            var plotData = this.data,
                plotVariables = this.variable();
            
            if (plotData() === undefined) {
                plotData(graph.data().at(0));
            }

            if (plotVariables.size() === 0) {
                plotVariables.add(findNextVariableAtOrAfter(this, plotData(), 0));
            }

            if (plotVariables.at(0) === null) {
                plotVariables.replace(0, findNextVariableAtOrAfter(this, plotData(), 0));
            }

            while (plotVariables.size() < numberOfVariables) {
                plotVariables.add(findNextVariableAtOrAfter(this, plotData(), 1));
            }

            // 1. get variables from a data section, some will be used, others won't be.
            // 2. check if horizontal axis needs a variable
            //       if it does - find first unused variable, starting at position 0
            //                  - if no unused variables exist - throw error
            //                  - CONTINUE
            //       if it does not - CONTINUE
            // 3. check if vertical axis needs variable(s)
            //       if it does - find first unused variable, starting at the position of
            //                    the x variable
            //                  - if no unused variables exist - throw error
            //                  - check if vertical axis needs another variable
            //                        if it does - Repeat step 3

            if (this.datatips()) {
                this.datatips().normalize(this);
            }
        }

    });

});

module.exports = Plot;
