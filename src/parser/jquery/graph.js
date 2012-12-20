window.multigraph.util.namespace("window.multigraph.parser.jquery", function (ns) {
    "use strict";

    var $ = window.multigraph.jQuery;

    ns.mixin.add(function (ns, parse) {

        /*
         * This function traverses an XML document looking for attributes values involving deprecated
         * color names and issues a warning about each one found.  Remove this function when removing
         * support for these names.  See src/math/rgb_color.js for a list of the deprecated colors.
         */
        var checkDeprecatedColorNames = function(xml, messageHandler) {
            var $xml = $(xml),
                attributes = $xml[0].attributes,
                children = $xml.children(),
                dep;
            if (xml.nodeName === "option") {
                if (/color/.test($xml.attr('name'))) {
                    dep = ns.math.RGBColor.colorNameIsDeprecated($xml.attr('value'));
                    if (dep) {
                        messageHandler.warning('Warning: color string "' + $xml.attr('value') + '" is deprecated; use "' + dep + '" instead');
                    }
                }
            }
            if (attributes) {
                $.each(attributes, function() {
                    if (/color/.test(this.name)) {
                    dep = ns.math.RGBColor.colorNameIsDeprecated(this.value);
                        if (dep) {
                            messageHandler.warning('Warning: color string "' + this.value + '" is deprecated; use "' + dep + '" instead');
                        }
                    }
                });

            }
            if (children) {
                children.each(function() {
                    checkDeprecatedColorNames(this, messageHandler);
                });
            }
        };
        

        ns.core.Graph[parse] = function (xml, multigraph, messageHandler) {
            var graph = new ns.core.Graph(),
                defaults = window.multigraph.utilityFunctions.getDefaultValuesFromXSD();

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
                if (xml.find(">window").length > 0) {
                    graph.window( ns.core.Window[parse](xml.find(">window")) );
                } else {
                    graph.window( ns.core.Window[parse]() );
                }

                if (xml.find(">legend").length > 0) {
                    graph.legend( ns.core.Legend[parse](xml.find(">legend")) );
                } else {
                    graph.legend( ns.core.Legend[parse]() );
                }
                if (xml.find(">background").length > 0) {
                    graph.background( ns.core.Background[parse](xml.find(">background"), graph.multigraph()) );
                }
                if (xml.find(">plotarea").length > 0) {
                    graph.plotarea( ns.core.Plotarea[parse](xml.find(">plotarea")) );
                }
                if (xml.find(">title").length > 0) {
                    graph.title( ns.core.Title[parse](xml.find(">title"), graph) );
                }
                window.multigraph.jQuery.each(xml.find(">horizontalaxis"), function (i,e) {
                    graph.axes().add( ns.core.Axis[parse](window.multigraph.jQuery(e), ns.core.Axis.HORIZONTAL, messageHandler) );
                });
                window.multigraph.jQuery.each(xml.find(">verticalaxis"), function (i,e) {
                    graph.axes().add( ns.core.Axis[parse](window.multigraph.jQuery(e), ns.core.Axis.VERTICAL, messageHandler) );
                });
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
                window.multigraph.jQuery.each(xml.find(">throttle"), function (i,e) {
                    var pattern    = $(e).attr('pattern')    ? $(e).attr('pattern')    : defaults.throttle.pattern,
                        requests   = $(e).attr('requests')   ? $(e).attr('requests')   : defaults.throttle.requests,
                        period     = $(e).attr('period')     ? $(e).attr('period')     : defaults.throttle.period,
                        concurrent = $(e).attr('concurrent') ? $(e).attr('concurrent') : defaults.throttle.concurrent;
                    multigraph.addAjaxThrottle(pattern, requests, period, concurrent);
                });
                window.multigraph.jQuery.each(xml.find(">data"), function (i,e) {
                    graph.data().add( ns.core.Data[parse](window.multigraph.jQuery(e), graph.multigraph(), messageHandler) );
                });
                window.multigraph.jQuery.each(xml.find(">plot"), function (i,e) {
                    graph.plots().add( ns.core.Plot[parse](window.multigraph.jQuery(e), graph, messageHandler) );
                });
                graph.postParse();
            }
            return graph;
        };

    });

});

