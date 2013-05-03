window.multigraph.util.namespace("window.multigraph.graphics.canvas", function (ns) {
    "use strict";

    var $ = window.multigraph.jQuery;

    ns.mixin.add(function (ns) {
        var Multigraph = ns.Multigraph;

        Multigraph.hasA("canvas");  // canvas object itself (the '<canvas>' tag itself)
        Multigraph.hasA("context"); // canvas context object
        Multigraph.hasA("width").which.isA("number");
        Multigraph.hasA("height").which.isA("number");

        Multigraph.respondsTo("redraw", function () {
            var that = this;
            window.requestAnimationFrame(function () {
                that.render();
            });
        });

        Multigraph.respondsTo("init", function () {
            var $div = $(this.div());
            this.width($div.width());
            this.height($div.height());
            if (this.width() > 0 && this.height() > 0) {
                // create the canvas
                $("<canvas width=\""+this.width()+"\" height=\""+this.height()+"\"/>")
                    .appendTo($div);

                this.initializeSurface();

                this.busySpinner($('<div style="position:absolute;top:50%;left:50%;margin-top:-16px;margin-left:-16px"></div>') .
                                  appendTo($div) .
                                  busy_spinner());
            }
            this.render();
        });

        Multigraph.respondsTo("render", function () {
            var context = this.context(),
                width   = this.width(),
                height  = this.height(),
                i;
            context.setTransform(1, 0, 0, 1, 0, 0);
            context.transform(1, 0, 0, -1, 0, height);
            context.clearRect(0, 0, width, height);
            this.initializeGeometry(width, height, {"context" : context});
            for (i = 0; i < this.graphs().size(); ++i) {
                this.graphs().at(i).render(context, width, height);
            }
        });

        Multigraph.respondsTo("registerEvents", function () {
            var canvas = this.canvas();
            this.registerMouseEvents(canvas);
            this.registerTouchEvents(canvas);
        });

        Multigraph.respondsTo("resizeSurface", function (width, height) {
            var canvas = this.context().canvas;
            canvas.width  = width;
            canvas.height = height;
        });

        Multigraph.respondsTo("initializeSurface", function () {
            this.canvas(window.multigraph.jQuery(this.div()).children("canvas")[0]);
            this.context(this.canvas().getContext("2d"));
        });

    });

    var applyMixins = function (options) {
        var errorHandler = options.messageHandler.error;
        window.multigraph.parser.jquery.mixin.apply(window.multigraph, "parseXML");
        ns.mixin.apply(window.multigraph.core);
        window.multigraph.events.jquery.draggable.mixin.apply(window.multigraph, errorHandler);
        window.multigraph.events.jquery.mouse.mixin.apply(window.multigraph, errorHandler);
        window.multigraph.events.jquery.touch.mixin.apply(window.multigraph, errorHandler);
        window.multigraph.normalizer.mixin.apply(window.multigraph.core);
    };

    var generateInitialGraph = function (mugl, options) {
        var multigraph = window.multigraph.core.Multigraph.parseXML( window.multigraph.parser.jquery.stringToJQueryXMLObj(mugl), options.mugl, options.messageHandler );
        multigraph.normalize();
        multigraph.div(options.div);
        $(options.div).css("cursor" , "pointer");
        multigraph.init();
        multigraph.registerEvents();
        multigraph.registerCommonDataCallback(function (event) {
            multigraph.redraw();
        });
        return multigraph;
    };

    window.multigraph.core.Multigraph.createCanvasGraph = function (options) {
        var muglPromise,
            deferred;

        try {
            applyMixins(options);
            muglPromise = $.ajax({
                "url"      : options.mugl,
                "dataType" : "text"
            });

            deferred = $.Deferred();
        } catch (e) {
            options.messageHandler.error(e);
        }

        muglPromise.done(function (data) {
            try {
                // TODO: div size IS available here; see below.  What's going on???!!!
                var multigraph = generateInitialGraph(data, options);
                deferred.resolve(multigraph);
            } catch (e) {
                options.messageHandler.error(e);
            }
        });

        return deferred.promise();
    };

    window.multigraph.core.Multigraph.createCanvasGraphFromString = function (options) {
        var deferred;
        
        try {
            applyMixins(options);
            deferred = $.Deferred();
            // TODO: figure this out!  div size is not available here?  Apparently, at this point in
            // code execution, the browser hasn't laid things out enough for the div to have been
            // assigned a size, at least sometimes???  But it IS available at the corresponding place in
            // createCanvasGraph above?  This is worked around by the code in
            // src/core/multigraph.js:createGraph() that forces the div to have the size specified in
            // the options --- so we can work around the problem by passing an explicit size in the
            // options.  But we need to really figure out what's going on and resolve it.
            var multigraph = generateInitialGraph(options.muglString, options);
            deferred.resolve(multigraph);
        } catch (e) {
            options.messageHandler.error(e);
        }

        return deferred.promise();
    };

});
