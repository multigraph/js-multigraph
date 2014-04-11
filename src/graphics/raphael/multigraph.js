/*global Raphael */

window.multigraph.util.namespace("window.multigraph.graphics.raphael", function (ns) {
    "use strict";

    var $ = window.multigraph.jQuery;

    ns.mixin.add(function (ns) {

        var Multigraph = ns.Multigraph;

        Multigraph.hasA("paper"); // Raphael paper object

        Multigraph.hasA("$div");  // jQuery object for the Raphael paper's div

        Multigraph.hasA("width").which.isA("number");
        Multigraph.hasA("height").which.isA("number");

        Multigraph.hasA("baseX").which.isA("number");
        Multigraph.hasA("baseY").which.isA("number");
        Multigraph.hasA("mouseLastX").which.isA("number");
        Multigraph.hasA("mouseLastY").which.isA("number");

        ns.Multigraph.respondsTo("redraw", function () {
            var that = this;
            window.requestAnimationFrame(function () {
                var text   = that.paper().text(-8000, -8000, "foo"),
                    graphs = that.graphs(),
                    i, j;
                //                that.initializeGeometry(that.width(), that.height(), { "elem" : text });
                for (i = 0; i < graphs.size(); i++) {
                    for (j = 0; j < graphs.at(i).axes().size(); j++) {
                        graphs.at(i).axes().at(j).computeAxisToDataRatio();
                    }
                }
                for (i = 0; i < graphs.size(); i++) {
                    graphs.at(i).redraw(that.paper(), that.width(), that.height());
                }
                text.remove();
            });
        });

        ns.Multigraph.respondsTo("init", function () {
            this.$div($(this.div()));
            this.registerEvents();
            this.width(this.$div().width());
            this.height(this.$div().height());
            this.initializeSurface();
            this.busySpinner($('<div style="position: absolute; left:5px; top:5px;"></div>') .
                             appendTo(this.$div()) .
                             busy_spinner());
            this.render();
        });

        ns.Multigraph.respondsTo("render", function () {
            this.paper().clear();

            var text = this.paper().text(-8000, -8000, "foo"),
                i;

            this.initializeGeometry(this.width(), this.height(), { "elem" : text });
            for (i = 0; i < this.graphs().size(); ++i) {
                this.graphs().at(i).render(this.paper(), this.width(), this.height());
            }
            text.remove();
        });

        ns.Multigraph.respondsTo("registerEvents", function () {
            this.$div().on("mousedown", { "mg": this }, this.setupEvents);
            this.registerTouchEvents(this.$div());
        });

        ns.Multigraph.respondsTo("setupEvents", function (mouseDownEvent) {
            mouseDownEvent.preventDefault();
            var mg   = mouseDownEvent.data.mg,
                $div = mg.$div();
            
            mg.baseX(mouseDownEvent.pageX - $div.offset().left);
            mg.baseY($div.height() - (mouseDownEvent.pageY - $div.offset().top));
            mg.mouseLastX(mouseDownEvent.pageX - $div.offset().left);
            mg.mouseLastY($div.height() - (mouseDownEvent.pageY - $div.offset().top));

            mg.graphs().at(0).doDragReset();

            mg.$div().on("mousemove", { "mg": mg }, mg.triggerEvents);
            mg.$div().on("mouseup", { "mg": mg }, mg.unbindEvents);
            mg.$div().on("mouseleave", { "mg": mg }, mg.unbindEvents);
        });

        ns.Multigraph.respondsTo("triggerEvents", function (mouseMoveEvent) {
            var mg = mouseMoveEvent.data.mg,
                $div = mg.$div(),
                eventX = mouseMoveEvent.pageX - $div.offset().left,
                eventY = $div.height() - (mouseMoveEvent.pageY - $div.offset().top),
                dx = eventX - mg.mouseLastX(),
                dy = eventY - mg.mouseLastY(),
                i;

            mg.mouseLastX(eventX);
            mg.mouseLastY(eventY);

            for (i = 0; i < mg.graphs().size(); ++i) {
                mg.graphs().at(i).doDrag(mg, mg.baseX(), mg.baseY(), dx, dy, mouseMoveEvent.shiftKey);
            }

        });

        ns.Multigraph.respondsTo("unbindEvents", function (e) {
            var mg = e.data.mg,
                $div = mg.$div(),
                i;
            $div.off("mousemove", mg.triggerEvents);
            $div.off("mouseup", mg.unbindEvents);
            $div.off("mouseleave", mg.unbindEvents);
            for (i = 0; i < mg.graphs().size(); ++i) {
                mg.graphs().at(i).doDragDone();
            }

        });

        ns.Multigraph.respondsTo("resizeSurface", function (width, height) {
            this.paper().setSize(width, height);
        });

        ns.Multigraph.respondsTo("initializeSurface", function () {
            if (this.paper()) {
                this.paper().remove();
            }
            this.paper(new window.Raphael(this.div(), this.width(), this.height()));
        });

    });

    var applyMixins = function (options) {
        window.multigraph.parser.mixin.apply(window.multigraph, "parseXML");
        ns.mixin.apply(window.multigraph.core);
        window.multigraph.normalizer.mixin.apply(window.multigraph.core);
        window.multigraph.events.draggable.mixin.apply(window.multigraph);
        window.multigraph.events.mouse.mixin.apply(window.multigraph);
        window.multigraph.events.touch.mixin.apply(window.multigraph);
    };

    var generateInitialGraph = function (mugl, options) {
        var multigraph = window.multigraph.core.Multigraph.parseXML( window.multigraph.parser.stringToJQueryXMLObj(mugl), options.mugl, options.messageHandler );
        multigraph.normalize();
        multigraph.div(options.div);
        window.multigraph.jQuery(options.div).css({
            "cursor"                : "pointer",
            "-webkit-touch-callout" : "none",
            "-webkit-user-select"   : "none",
            "-khtml-user-select"    : "none",
            "-moz-user-select"      : "none",
            "-ms-user-select"       : "none",
            "-o-user-select"        : "none",
            "user-select"           : "none"
        });
        multigraph.init();
        multigraph.registerCommonDataCallback(function () {
            multigraph.redraw();
        });
        return multigraph;
    };

    window.multigraph.core.Multigraph.createRaphaelGraph = function (options) {
        var muglPromise,
            deferred;
        
        try {
            applyMixins(options);
            muglPromise = $.ajax({
                "url"      : options.mugl,
                "dataType" : "text"
            }),

            deferred = $.Deferred();
        } catch (e) {
            options.messageHandler.error(e);
        }

        muglPromise.done(function (data) {
            try {
                var multigraph = generateInitialGraph(data, options);
                deferred.resolve(multigraph);
            }
            catch (e) {
                options.messageHandler.error(e);
            }
        });

        return deferred.promise();
    };

    window.multigraph.core.Multigraph.createRaphaelGraphFromString = function (options) {
        var deferred;
        
        try {
            applyMixins(options);
            deferred = window.multigraph.jQuery.Deferred();
            var multigraph = generateInitialGraph(options.muglString, options);
            deferred.resolve(multigraph);
        } catch (e) {
            options.messageHandler.error(e);
        }

        return deferred.promise();
    };

});
