window.multigraph.util.namespace("window.multigraph.parser.jquery", function (ns) {
    "use strict";

    ns.mixin.add(function (ns, parse) {
        var $ = ns.jQuery;

        /*
         * This function traverses an XML document looking for attributes values involving deprecated
         * color names and issues a warning about each one found.  Remove this function when removing
         * support for these names.  See src/math/rgb_color.js for a list of the deprecated colors.
         */
        var checkDeprecatedColorNames = function (xml, messageHandler) {
            var $xml       = $(xml),
                attributes = $xml[0].attributes,
                children   = $xml.children(),
                colorNameIsDeprecated = ns.math.RGBColor.colorNameIsDeprecated,
                dep;
            if (xml.nodeName === "option") {
                if (/color/.test($xml.attr('name'))) {
                    dep = colorNameIsDeprecated($xml.attr('value'));
                    if (dep) {
                        messageHandler.warning('Warning: color string "' + $xml.attr('value') + '" is deprecated; use "' + dep + '" instead');
                    }
                }
            }
            if (attributes) {
                $.each(attributes, function () {
                    if (/color/.test(this.name)) {
                    dep = colorNameIsDeprecated(this.value);
                        if (dep) {
                            messageHandler.warning('Warning: color string "' + this.value + '" is deprecated; use "' + dep + '" instead');
                        }
                    }
                });

            }
            if (children) {
                children.each(function () {
                    checkDeprecatedColorNames(this, messageHandler);
                });
            }
        };
        

        ns.core.Graph[parse] = function (xml, multigraph, messageHandler) {
            var core  = ns.core,
                graph = new core.Graph(),
                Axis  = core.Axis,
                defaults = ns.utilityFunctions.getDefaultValuesFromXSD(),
                child;

            graph.multigraph(multigraph);
            if (xml) {

                //
                // Delete this try/catch block when removing support for deprecated color names.
                //
                try {
                    checkDeprecatedColorNames(xml, messageHandler);
                } catch (e) {
                    // just ignore any errors here; the worst that will happen is that the user just
                    // won't see the warnings
                }
                //
                // end of block to delete when removing support for deprecated color names
                //

                // NOTE: 'OBJ.find(">TAG")' returns a list of JQuery objects corresponding to the immediate
                // (1st generation) child nodes of OBJ corresponding to xml tag TAG
                child = xml.find(">window");
                if (child.length > 0) {
                    graph.window( core.Window[parse](child) );
                }

                child = xml.find(">legend");
                if (child.length > 0) {
                    graph.legend( core.Legend[parse](child) );
                } else {
                    graph.legend( core.Legend[parse]() );
                }
                child = xml.find(">background");
                if (child.length > 0) {
                    graph.background( core.Background[parse](child, graph.multigraph()) );
                }
                child = xml.find(">plotarea");
                if (child.length > 0) {
                    graph.plotarea( core.Plotarea[parse](child) );
                }
                child = xml.find(">title");
                if (child.length > 0) {
                    graph.title( core.Title[parse](child, graph) );
                }
                $.each(xml.find(">horizontalaxis"), function (i, e) {
                    graph.axes().add( Axis[parse]($(e), Axis.HORIZONTAL, messageHandler, graph.multigraph()) );
                });
                $.each(xml.find(">verticalaxis"), function (i, e) {
                    graph.axes().add( Axis[parse]($(e), Axis.VERTICAL, messageHandler, graph.multigraph()) );
                });
                /*
                if (xml.find(">data").length === 0) {
                    // On second throught, let's not throw an error if no <data> tag
                    // is specified, because conceivably there could be graphs in
                    // which all the plots are constant plots, so no data is needed.
                    // In particular, in our spec/mugl/constant-plot.xml test!
                    // I'm not sure what should be done here --- maybe issue a warning,
                    // or maybe don't do anything.
                    //    mbp Mon Nov 12 16:05:21 2012
                    //throw new Error("Graph Data Error: No data tags specified");
                }
                */
                $.each(xml.find(">throttle"), function (i, e) {
                    var pattern    = $(e).attr('pattern')    ? $(e).attr('pattern')    : defaults.throttle.pattern,
                        requests   = $(e).attr('requests')   ? $(e).attr('requests')   : defaults.throttle.requests,
                        period     = $(e).attr('period')     ? $(e).attr('period')     : defaults.throttle.period,
                        concurrent = $(e).attr('concurrent') ? $(e).attr('concurrent') : defaults.throttle.concurrent;
                    multigraph.addAjaxThrottle(pattern, requests, period, concurrent);
                });
                $.each(xml.find(">data"), function (i, e) {
                    graph.data().add( core.Data[parse]($(e), graph.multigraph(), messageHandler) );
                });
                $.each(xml.find(">plot"), function (i, e) {
                    graph.plots().add( core.Plot[parse]($(e), graph, messageHandler) );
                });
                graph.postParse();
            }
            return graph;
        };

    });

});

