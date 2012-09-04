window.multigraph.util.namespace("window.multigraph.graphics.logger", function (ns) {
    "use strict";

    ns.mixin.add(function (ns) {

        ns.Multigraph.hasA("$div");

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
            this.width(this.$div().width());
            this.height(this.$div().height());
            this.render();
        });

        ns.Multigraph.respondsTo("render", function () {
            var i;
            var mg = {
                "width"  : this.width(),
                "height" : this.height(),
                "graphs" : []
            };
            this.initializeGeometry(this.width(), this.height());
            for (i=0; i<this.graphs().size(); ++i) {
                mg.graphs.push(this.graphs().at(i).render(this.width(), this.height()));
            }
            return mg;
        });

    });

    window.multigraph.core.Multigraph.createLoggerGraph = function (divid, muglurl) {

        window.multigraph.parser.jquery.mixin.apply(window.multigraph, "parseXML", "serialize");
        ns.mixin.apply(window.multigraph.core);

        var muglPromise = $.ajax({
            "url"      : muglurl,
            "dataType" : "text"
        }),

        deferred = $.Deferred();

        muglPromise.done(function (data) {
            var multigraph = window.multigraph.core.Multigraph.parseXML( window.multigraph.parser.jquery.stringToJQueryXMLObj(data) );
            multigraph.divid(divid);
            multigraph.init();
            deferred.resolve(multigraph);
        });

        return deferred.promise();

    };

});