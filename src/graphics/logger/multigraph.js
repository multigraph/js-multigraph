window.multigraph.util.namespace("window.multigraph.graphics.logger", function (ns) {
    "use strict";

    ns.mixin.add(function (ns) {
        var Multigraph = ns.Multigraph;

        Multigraph.hasA("$div");

        Multigraph.hasA("width").which.isA("number");
        Multigraph.hasA("height").which.isA("number");

        Multigraph.hasA("baseX").which.isA("number");
        Multigraph.hasA("baseY").which.isA("number");
        Multigraph.hasA("mouseLastX").which.isA("number");
        Multigraph.hasA("mouseLastY").which.isA("number");

        Multigraph.hasA("logger");

        Multigraph.respondsTo("redraw", function () {
            var that = this;
            window.requestAnimationFrame(function () {
                that.render();
            });
        });

        Multigraph.respondsTo("init", function () {
            this.$div($("#"+this.divid()));
            this.width(this.$div().width());
            this.height(this.$div().height());
            this.render();
        });

        Multigraph.respondsTo("render", function () {
            var i;
            this.initializeGeometry(this.width(), this.height());
            for (i = 0; i < this.graphs().size(); ++i) {
                this.graphs().at(i).render(this.width(), this.height());
            }
        });

        Multigraph.respondsTo("dumpLog", function () {
            var output = "",
                i;

            for (i = 0; i < this.graphs().size(); ++i) {
                output += this.graphs().at(i).dumpLog();
            }

            return output;
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