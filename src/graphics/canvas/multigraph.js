window.multigraph.util.namespace("window.multigraph.graphics.canvas", function (ns) {
    "use strict";

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
            this.width(window.multigraph.jQuery(this.div()).width());
            this.height(window.multigraph.jQuery(this.div()).height());
            if (this.width() > 0 && this.height() > 0) {
                // create the canvas; store ref to the canvas object in this.canvas()
                this.canvas(window.multigraph.jQuery("<canvas width=\""+this.width()+"\" height=\""+this.height()+"\"/>").appendTo(window.multigraph.jQuery(this.div()).empty())[0]);
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

    window.multigraph.core.Multigraph.createCanvasGraph = function (div, muglurl, errorHandler) {
        var muglPromise,
            deferred;
        
        try {
            window.multigraph.parser.jquery.mixin.apply(window.multigraph, "parseXML", "serialize");
            ns.mixin.apply(window.multigraph.core);
            window.multigraph.events.jquery.mouse.mixin.apply(window.multigraph, errorHandler);
            window.multigraph.normalizer.mixin.apply(window.multigraph.core);

            muglPromise = window.multigraph.jQuery.ajax({
                "url"      : muglurl,
                "dataType" : "text"
            });

            deferred = window.multigraph.jQuery.Deferred();
        }
        catch (e) {
            errorHandler(e);
        }

        muglPromise.done(function (data) {
            try {
                var multigraph = window.multigraph.core.Multigraph.parseXML( window.multigraph.parser.jquery.stringToJQueryXMLObj(data) );
                multigraph.normalize();
                multigraph.div(div);
                window.multigraph.jQuery(div).css('cursor' , 'pointer');
                multigraph.init();
                multigraph.registerMouseEvents(multigraph.canvas());
                multigraph.registerCommonDataCallback(function () {
                    multigraph.redraw();
                });
                deferred.resolve(multigraph);
            }
            catch (e) {
                errorHandler(e);
            }
        });

        return deferred.promise();

    };



});
