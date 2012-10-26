window.multigraph.util.namespace("window.multigraph.normalizer", function (ns) {
    "use strict";

    ns.mixin.add(function (ns) {

        var normalizePlot = function (graph) {
            var i,
                rendererType,
                numberOfVariables,
                findNextVariableAtOrAfter,
                columnNum;

            //
            // Handles missing horizontalaxis tags
            //
            if (this.horizontalaxis() === undefined) {
                for (i = 0; i < graph.axes().size(); i++) {
                    if (graph.axes().at(i).orientation() === ns.Axis.HORIZONTAL) {
                        this.horizontalaxis(graph.axes().at(i));
                        break;
                    }
                }
            }

            //
            // Handles missing verticalaxis tags
            //
            if (this.verticalaxis() === undefined) {
                for (i = 0; i < graph.axes().size(); i++) {
                    if (graph.axes().at(i).orientation() === ns.Axis.VERTICAL) {
                        this.verticalaxis(graph.axes().at(i));
                        break;
                    }
                }
            }

            //
            // Handles missing renderer tags
            //
            if (this.renderer() === undefined) {
                rendererType = ns.Renderer.Type.parse("line");
                this.renderer(ns.Renderer.create(rendererType));
            }

            //
            // Handles missing variables
            //
            findNextVariableAtOrAfter = function (plot, data, index) {
                var flag = true,
                    overlapFlag = false,
                    variableInPlotFlag,
                    i = index,
                    j,
                    variable;

                while (flag) {
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

            numberOfVariables = this.renderer().numberOfVariables();

            if (this instanceof ns.DataPlot) {
                if (this.data() === undefined) {
                    this.data(graph.data().at(0));
                }

                if (this.variable().size() === 0) {
                    this.variable().add(findNextVariableAtOrAfter(this, this.data(), 0));
                }

                if (this.variable().at(0) === null) {
                    this.variable().replace(0, findNextVariableAtOrAfter(this, this.data(), 0));
                }

                while (this.variable().size() < numberOfVariables) {
                    this.variable().add(findNextVariableAtOrAfter(this, this.data(), 1));
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
            }

        };

        ns.DataPlot.respondsTo("normalize", normalizePlot);
        ns.ConstantPlot.respondsTo("normalize", normalizePlot);

    });

});
