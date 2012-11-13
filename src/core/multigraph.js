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
            var i;
            for (i=0; i < this.graphs().size(); ++i) {
                this.graphs().at(i).registerCommonDataCallback(callback);
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
            div = window.multigraph.jQuery("#" + div)[0];
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
/*
    Multigraph.createDefaultErrorHandler = function (div) {
        return function (e) {
            var errorMessages,
                flag = true,
                i;

            window.multigraph.jQuery(div).css("overflow", "auto");

            window.multigraph.jQuery(div).children("div").each(function (i) {
                if (window.multigraph.jQuery(this).text() === "An error has occured. Please scroll down in this region to see the error messages.") {
                    flag = false;
                }
            });

            if (flag) {
                window.multigraph.jQuery(div).prepend(window.multigraph.jQuery("<br>"));
                window.multigraph.jQuery(div).prepend(window.multigraph.jQuery("<div>", {"text" : "An error has occured. Please scroll down in this region to see the error messages.", "style" : "z-index:100; border:1px solid black; background-color : #E00; white-space: pre-wrap; text-align: left;"}));
            }

            window.multigraph.jQuery(div).append(window.multigraph.jQuery("<ol>", {"text" : e.message, "style" : "z-index:100; border:1px solid black; background-color : #CCC; white-space: pre-wrap; text-align: left;"}));

            if (e.stack && typeof(e.stack) === "string") {
                errorMessages = e.stack.split(/\n/);
                for (i = 1; i < errorMessages.length; i++) {
                    window.multigraph.jQuery(window.multigraph.jQuery(div).find("ol")).append(window.multigraph.jQuery("<li>", {"text" : errorMessages[i].trim().replace(" (file", "\n(file"), "style" : "margin-bottom: 3px;"}));
                }
            }
        };
    };
*/

    Multigraph.createDefaultErrorHandler = function (div) {
        return function (e) {
            throw e;
            //console.log(e.message);
            //console.log(e.stack);
        };
    };

    ns.Multigraph = Multigraph;

});
