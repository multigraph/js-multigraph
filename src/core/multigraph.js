window.multigraph.util.namespace("window.multigraph.core", function (ns) {
    "use strict";

    var Multigraph = new window.jermaine.Model( "Multigraph", function () {

        this.hasMany("graphs").which.validatesWith(function (graph) {
            return graph instanceof ns.Graph;
        });

        this.hasA("div"); // the actual div element

        this.respondsTo("initializeGeometry", function (width, height, graphicsContext) {
            var i;
            for (i=0; i < this.graphs().size(); ++i) {
                this.graphs().at(i).initializeGeometry(width, height, graphicsContext);
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
        var div = obj.div;
        if (!obj.driver) {
            obj.driver = "canvas";
        }
        if (typeof(div) === "string") {
            // if div is a string, assume it's an id, and convert
            // it to the div element itself
            div = $("#" + div)[0];
        }
        if (!obj.errorHandler || typeof(obj.errorHandler) !== "function") {
            obj.errorHandler = Multigraph.createDefaultErrorHandler(div);
        }
        if (obj.driver === "canvas") {
            return Multigraph.createCanvasGraph(div, obj.mugl, obj.errorHandler);
        } else if (obj.driver === "raphael") {
            return Multigraph.createRaphaelGraph(div, obj.mugl, obj.errorHandler);
        } else if (obj.driver === "logger") {
            return Multigraph.createLoggerGraph(div, obj.mugl);
        }
        throw new Error("invalid graphic driver '" + obj.driver + "' specified to Multigraph.createGraph");
    };

    Multigraph.createDefaultErrorHandler = function (div) {
        return function (e) {
            var errorMessages,
                flag = true,
                i;

            $(div).css("overflow", "auto");

            $(div).children("div").each(function (i) {
                if ($(this).text() === "An error has occured. Please scroll down in this region to see the error messages.") {
                    flag = false;
                }
            });

            if (flag) {
                $(div).prepend($("<br>"));
                $(div).prepend($("<div>", {"text" : "An error has occured. Please scroll down in this region to see the error messages.", "style" : "z-index:100; border:1px solid black; background-color : #E00; white-space: pre-wrap; text-align: left;"}));
            }

            $(div).append($("<ol>", {"text" : e.message, "style" : "z-index:100; border:1px solid black; background-color : #CCC; white-space: pre-wrap; text-align: left;"}));

            if (e.stack && typeof(e.stack) === "string") {
                errorMessages = e.stack.split(/\n/);
                for (i = 1; i < errorMessages.length; i++) {
                    $($(div).find("ol")).append($("<li>", {"text" : errorMessages[i].trim().replace(" (file", "\n(file"), "style" : "margin-bottom: 3px;"}));
                }
            }
        };
    };

    ns.Multigraph = Multigraph;

});
