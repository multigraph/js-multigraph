/*global Raphael */

window.multigraph.util.namespace("window.multigraph.graphics.raphael", function (ns) {
    "use strict";

    ns.mixin.add(function (ns) {

        ns.Multigraph.hasA("paper"); // Raphael paper object

        ns.Multigraph.hasA("$div");  // jQuery object for the Raphael paper's div

        ns.Multigraph.hasA("width").which.isA("number");
        ns.Multigraph.hasA("height").which.isA("number");

        ns.Multigraph.hasA("baseX").which.isA("number");
        ns.Multigraph.hasA("baseY").which.isA("number");
        ns.Multigraph.hasA("mouseLastX").which.isA("number");
        ns.Multigraph.hasA("mouseLastY").which.isA("number");

        ns.Multigraph.respondsTo("redraw", function () {
            var that = this;
            window.requestAnimationFrame(function () {
		that.render();
            });
	});

        ns.Multigraph.respondsTo("init", function () {
            this.$div($("#"+this.divid()));
            this.$div().on("mousedown", { "graph": this }, this.setupEvents);
            this.width(this.$div().width());
            this.height(this.$div().height());
            this.render();
        });

        ns.Multigraph.respondsTo("render", function () {
            var i;
            if (this.paper()) {
                this.paper().remove();
            }
            this.paper(new window.Raphael(this.divid(), this.width(), this.height()));
            this.initializeGeometry(this.width(), this.height());
            for (i=0; i<this.graphs().size(); ++i) {
                this.graphs().at(i).render(this.paper(), this.width(), this.height());
            }
        });

        ns.Multigraph.respondsTo("setupEvents", function (mouseDownEvent) {
            var graph = mouseDownEvent.data.graph;

            graph.baseX(mouseDownEvent.offsetX);
            graph.baseY(mouseDownEvent.offsetY);
            graph.mouseLastX(mouseDownEvent.offsetX);
            graph.mouseLastY(mouseDownEvent.offsetY);

            graph.$div().on("mousemove", { "graph": graph }, graph.triggerEvents);
            graph.$div().on("mouseup", { "graph": graph }, graph.unbindEvents);
            graph.$div().on("mouseleave", { "graph": graph }, graph.unbindEvents);
        });

        ns.Multigraph.respondsTo("triggerEvents", function (mouseMoveEvent) {
            var graph = mouseMoveEvent.data.graph,
                dx = mouseMoveEvent.offsetX - graph.mouseLastX(),
                dy = mouseMoveEvent.offsetY - graph.mouseLastY(),
                i;

            graph.mouseLastX(mouseMoveEvent.offsetX);
            graph.mouseLastY(mouseMoveEvent.offsetY);

            for (i = 0; i < graph.graphs().size(); ++i) {
                graph.graphs().at(i).doDrag(graph, graph.baseX(), graph.baseY(), dx, dy, mouseMoveEvent.shiftKey);
            }

        });

        ns.Multigraph.respondsTo("unbindEvents", function (e) {
            var graph = e.data.graph;
            graph.$div().off("mousemove", graph.triggerEvents);
            graph.$div().off("mouseup", graph.unbindEvents);
            graph.$div().off("mouseleave", graph.unbindEvents);
        });

    });

    window.multigraph.core.Multigraph.createRaphaelGraph = function (divid, muglurl) {

        window.multigraph.parser.jquery.mixin.apply(window.multigraph, "parseXML", "serialize");
        ns.mixin.apply(window.multigraph.core);

        var muglPromise = $.ajax({
            "url"      : muglurl,
            "dataType" : "text"
        }),

            deferred = $.Deferred();

        muglPromise.done(function (data) {
            var multigraph = window.multigraph.core.Multigraph.parseXML( $(data) );
            multigraph.divid(divid);
            multigraph.init();
            deferred.resolve(multigraph);
        });

        return deferred.promise();

    };

});
