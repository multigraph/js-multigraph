module.exports = function($, window) {
    var Multigraph = require('../../core/multigraph.js')($),
        Point = require('../../math/point.js'),
        vF = require('../../util/validationFunctions.js');

    if (typeof(Multigraph.render)==="function") { return Multigraph; }

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
            $("<canvas width=\""+this.width()*window.devicePixelRatio+"\" height=\""+this.height()*window.devicePixelRatio+"\" style=\"width:"+this.width()+"px; height:"+this.height()+"px;\"/>")
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
        context.scale(window.devicePixelRatio, window.devicePixelRatio);
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
        this.registerResizeEvents(canvas);
    });

    Multigraph.respondsTo("resizeSurface", function (width, height) {
        var canvas = this.context().canvas;
        canvas.width  = width;
        canvas.height = height;
    });

    Multigraph.respondsTo("initializeSurface", function () {
        this.canvas($(this.div()).children("canvas")[0]);
        this.context(this.canvas().getContext("2d"));
    });

    //    var applyMixins = function (options) {
    //        var errorHandler = options.messageHandler.error;
    //        window.multigraph.parser.mixin.apply(window.multigraph, "parseXML");
    //        ns.mixin.apply(window.multigraph.core);
    //        window.multigraph.events.draggable.mixin.apply(window.multigraph, errorHandler);
    //        window.multigraph.events.mouse.mixin.apply(window.multigraph, errorHandler);
    //        window.multigraph.events.touch.mixin.apply(window.multigraph, errorHandler);
    //        window.multigraph.normalizer.mixin.apply(window.multigraph.core);
    //    };

    // Return true iff the string `s` looks like a json object.
    // This simply checks to see if the first non-whitespace char is a '{' or '['.
    function looks_like_json(s) {
        return /^\s*[{\[]/.test(s);
    }

    var generateInitialGraph = function (mugl, options) {
        var JQueryXMLParser = require('../../parser/xml/jquery_xml_parser.js')($);
        require('../../parser/json/json_parser.js')($);
        var multigraph;
        if (vF.typeOf(mugl) === 'string') {
            if (looks_like_json(mugl)) {
                //http://stackoverflow.com/questions/4935632/parse-json-in-javascript
                var obj = JSON && JSON.parse(mugl) || $.parseJSON(mugl);
                multigraph = Multigraph.parseJSON( obj, options.mugl, options.messageHandler );
            } else {
                var xmlObj = JQueryXMLParser.stringToJQueryXMLObj(mugl);
                multigraph = Multigraph.parseXML( xmlObj, options.mugl, options.messageHandler );
            }
        } else {
            multigraph = Multigraph.parseJSON( mugl, options.mugl, options.messageHandler );
        }


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

    Multigraph.createCanvasGraph = function (options) {
        var muglPromise,
            deferred;

        try {
            //applyMixins(options);
            require('../../events/all.js')($, window, options.messageHandler.error);
            muglPromise = $.ajax({
                "url"      : options.mugl,
                "dataType" : "text"
            });

            deferred = $.Deferred();
        } catch (e) {
//console.log('at c 1');
throw e;
//            options.messageHandler.error(e);
        }

        muglPromise.done(function (data) {
            try {
                // TODO: div size IS available here; see below.  What's going on???!!!
                var multigraph = generateInitialGraph(data, options);
                deferred.resolve(multigraph);
            } catch (e) {
//console.log('at c 2');
throw e;
//                options.messageHandler.error(e);
            }
        });

        return deferred.promise();
    };

    Multigraph.createCanvasGraphFromString = function (options) {
        var deferred;

        try {
            //applyMixins(options);
            require('../../events/all.js')($, window, options.messageHandler.error);
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
//console.log('at c 3');
throw e;
//            options.messageHandler.error(e);
        }

        return deferred.promise();
    };

    return Multigraph;
};
