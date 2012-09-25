window.multigraph.util.namespace("window.multigraph.core", function (ns) {
    "use strict";

    var Multigraph = new window.jermaine.Model( "Multigraph", function () {

        this.hasMany("graphs").which.validatesWith(function (graph) {
            return graph instanceof ns.Graph;
        });

        this.hasA("divid").which.isA("string");

        this.respondsTo("initializeGeometry", function (width, height) {
            var i;
            for (i=0; i < this.graphs().size(); ++i) {
                this.graphs().at(i).initializeGeometry(width, height);
            }
        });

        this.respondsTo("registerCommonDataCallback", function (callback) {
            var i, j,
                graphs = this.graphs(),
                data;
            for (i=0; i < graphs.size(); ++i) {
                data = graphs.at(i).data();
                for (j=0; j<data.size(); ++j) {
                    data.at(j).onReady(callback);
                }
            }
        });

    });

    Multigraph.createGraph = function (obj) {
        if (!obj.driver) {
            obj.driver = "canvas";
        }
        if (!obj.errorHandler || typeof(obj.errorHandler) !== "function") {
            obj.errorHandler = Multigraph.createDefaultErrorHandler(obj.div);
        }
        if (obj.driver === "canvas") {
            return Multigraph.createCanvasGraph(obj.div, obj.mugl, obj.errorHandler);
        } else if (obj.driver === "raphael") {
            return Multigraph.createRaphaelGraph(obj.div, obj.mugl, obj.errorHandler);
        } else if (obj.driver === "logger") {
            return Multigraph.createLoggerGraph(obj.div, obj.mugl);
        }
        throw new Error("invalid graphic driver '" + obj.driver + "' specified to Multigraph.createGraph");
    };

    Multigraph.createDefaultErrorHandler = function (divid) {
        return function (e) {
            $("#" + divid).append($("<div>", {"text" : e.message, "style" : "z-index:100; border:1px solid black; background-color : #CCC;"}));
        };
    };

    ns.Multigraph = Multigraph;

});
