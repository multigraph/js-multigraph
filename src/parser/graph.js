// This file uses jQuery.  A valid jQuery object must be passed to the
// function returned by requiring this file.
module.exports = function($) {
    var Graph = require('../core/graph.js');

    /*
     * This function traverses an XML document looking for attributes values involving deprecated
     * color names and issues a warning about each one found.  Remove this function when removing
     * support for these names.  See src/math/rgb_color.js for a list of the deprecated colors.
     */
    var checkDeprecatedColorNames = function (xml, messageHandler) {
        var RGBColor   = require('../math/rgb_color.js'),
            $xml       = $(xml),
            attributes = $xml[0].attributes,
            children   = $xml.children(),
            colorNameIsDeprecated = RGBColor.colorNameIsDeprecated,
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


    Graph.parseXML = function (xml, multigraph, messageHandler) {
        var core  = ns.core,
            graph = new Graph(),
            Axis  = require('../core/axis.js'),
            Window = require('../core/window.js'),
            Legend = require('../core/legend.js'),
            Background = require('../core/background.js'),
            Plotarea = require('../core/plotarea.js'),
            Title = require('../core/title.js'),
            Data = require('../core/data.js'),
            Plot = require('../core/plot.js'),
            utilityFunctions = require('../util/utiltityFunctions.js'),
            defaults = utilityFunctions.getDefaultValuesFromXSD(),
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
                graph.window( Window.parseXML(child) );
            }

            child = xml.find(">legend");
            if (child.length > 0) {
                graph.legend( Legend.parseXML(child) );
            } else {
                graph.legend( Legend.parseXML() );
            }
            child = xml.find(">background");
            if (child.length > 0) {
                graph.background( Background.parseXML(child, graph.multigraph()) );
            }
            child = xml.find(">plotarea");
            if (child.length > 0) {
                graph.plotarea( Plotarea.parseXML(child) );
            }
            child = xml.find(">title");
            if (child.length > 0) {
                graph.title( Title.parseXML(child, graph) );
            }
            $.each(xml.find(">horizontalaxis"), function (i, e) {
                graph.axes().add( Axis.parseXML($(e), Axis.HORIZONTAL, messageHandler, graph.multigraph()) );
            });
            $.each(xml.find(">verticalaxis"), function (i, e) {
                graph.axes().add( Axis.parseXML($(e), Axis.VERTICAL, messageHandler, graph.multigraph()) );
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
                graph.data().add( Data.parseXML($(e), graph.multigraph(), messageHandler) );
            });
            $.each(xml.find(">plot"), function (i, e) {
                graph.plots().add( Plot.parseXML($(e), graph, messageHandler) );
            });
            graph.postParse();
        }
        return graph;
    };

    return Graph;
};
