window.multigraph.util.namespace("window.multigraph.normalizer", function (ns) {
    "use strict";

    ns.mixin.add(function (ns) {

        ns.Plot.respondsTo("normalize", function (graph) {
            var i,
                rendererType,
                numberOfVariables,
                findNextVariable,
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
//            findNextVariable = function (plot, data, index) {};

            switch (this.renderer) {
                case ns.Renderer.POINTLINE:
                case ns.Renderer.POINT:
                case ns.Renderer.LINE:
                case ns.Renderer.BAR:
                case ns.Renderer.FILL:
                    numberOfVariables = 2;
                    break;
                case ns.Renderer.BAND:
                case ns.Renderer.RANGEERROR:
                case ns.Renderer.LINEERROR:
                case ns.Renderer.BARERROR:
                    numberOfVariables = 3;
                    break;
            }

        });

    });

});
