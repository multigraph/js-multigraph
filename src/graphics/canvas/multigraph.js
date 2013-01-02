window.multigraph.util.namespace("window.multigraph.graphics.canvas", function (ns) {
    "use strict";

    var $ = window.multigraph.jQuery;

    ns.mixin.add(function (ns) {

        ns.Multigraph.hasA("canvas");  // canvas object itself (the '<canvas>' tag itself)
        ns.Multigraph.hasA("context"); // canvas context object
        ns.Multigraph.hasA("width").which.isA("number");
        ns.Multigraph.hasA("height").which.isA("number");

        ns.Multigraph.respondsTo("redraw", function () {
            var that = this;
            window.requestAnimationFrame(function () {
                that.render();
            });
        });

        ns.Multigraph.respondsTo("init", function () {
            this.width($(this.div()).width());
            this.height($(this.div()).height());
            if (this.width() > 0 && this.height() > 0) {
                // create the canvas; store ref to the canvas object in this.canvas()

                this.canvas(
                    $("<canvas width=\""+this.width()+"\" height=\""+this.height()+"\"/>")
                        .appendTo($(this.div()))[0]
                );

                this.busySpinner($('<div style="position: absolute; left:5px; top:5px;"></div>') .
                                  appendTo($(this.div())) .
                                  busy_spinner());

                // get the canvas context; store ref to it in this.context()
                this.context(this.canvas().getContext("2d"));
            }
            this.render();
        });

        ns.Multigraph.respondsTo("render", function () {
            var i;
            this.context().setTransform(1, 0, 0, 1, 0, 0);
            this.context().transform(1,0,0,-1,0,this.height());
            this.context().clearRect(0, 0, this.width(), this.height());
            this.initializeGeometry(this.width(), this.height(), {"context" : this.context()});
            for (i=0; i<this.graphs().size(); ++i) {
                this.graphs().at(i).render(this.context(), this.width(), this.height());
            }
        });

    });

    var applyMixins = function (options) {
        window.multigraph.parser.jquery.mixin.apply(window.multigraph, "parseXML");
        ns.mixin.apply(window.multigraph.core);
        window.multigraph.events.jquery.draggable.mixin.apply(window.multigraph, options.messageHandler.error);
        window.multigraph.events.jquery.mouse.mixin.apply(window.multigraph, options.messageHandler.error);
        window.multigraph.events.jquery.touch.mixin.apply(window.multigraph, options.messageHandler.error);
        window.multigraph.normalizer.mixin.apply(window.multigraph.core);
    };

    var generateInitialGraph = function (mugl, options) {
        var multigraph = window.multigraph.core.Multigraph.parseXML( window.multigraph.parser.jquery.stringToJQueryXMLObj(mugl), options.mugl, options.messageHandler );
        multigraph.normalize();
        multigraph.div(options.div);
        $(options.div).css("cursor" , "pointer");
        multigraph.init();
        multigraph.registerMouseEvents(multigraph.canvas());
        multigraph.registerTouchEvents(multigraph.canvas());
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
            var multigraph = generateInitialGraph(options.muglString, options);
            deferred.resolve(multigraph);
        } catch (e) {
            options.messageHandler.error(e);
        }

        return deferred.promise();

    };

});
