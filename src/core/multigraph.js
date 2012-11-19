window.multigraph.util.namespace("window.multigraph.core", function (ns) {
    "use strict";

    /**
     * Core functionality for the javascript implementation of multigraph.
     *
     * @module multigraph
     * @submodule core
     * @main core
     */

    var $ = window.multigraph.jQuery;

    /**
     * The Multigraph Jermaine model is the root class for the js-multigraph project.
     *
     * @class Multigraph
     * @for Multigraph
     * @constructor
     */
    var Multigraph = new window.jermaine.Model( "Multigraph", function () {

        /**
         * Jermiane Attr_List of all the graphs in a Multigraph.
         *
         * @property graphs
         * @type {Graph}
         * @author jrfrimme
         * @modified Mon Nov 19 14:37:04 2012
         */
        this.hasMany("graphs").which.validatesWith(function (graph) {
            return graph instanceof ns.Graph;
        });

        /**
         * The div the multigraph is rendered in.
         *
         * @property div
         * @type {HTML Element}
         * @author jrfrimme
         * @modified Mon Nov 19 14:38:41 2012
         */
        this.hasA("div"); // the actual div element

        /**
         * Initializes the Multigraph's geometry by calling the `initializeGeometry` function of
         * each of its graph children.
         *
         * @method initializeGeometry
         * @param {Integer} width Width of the multigraph's div.
         * @param {Integer} height Height of the multigraph's div.
         * @param {Object} graphicsContext
         * @author jrfrimme
         * @modified Mon Nov 19 14:39:27 2012
         */
        this.respondsTo("initializeGeometry", function (width, height, graphicsContext) {
            var i;
            for (i=0; i < this.graphs().size(); ++i) {
                this.graphs().at(i).initializeGeometry(width, height, graphicsContext);
            }
        });

        /**
         * Convience function for registering callback functions for data becoming ready.
         *
         * @method registerCommonDataCallback
         * @param {Function} callback Callback function to be registered.
         * @author jrfrimme
         * @modified Mon Nov 19 14:43:44 2012
         */
        this.respondsTo("registerCommonDataCallback", function (callback) {
            var i;
            for (i=0; i < this.graphs().size(); ++i) {
                this.graphs().at(i).registerCommonDataCallback(callback);
            }
        });

    });

    /**
     * Determines if the browser supports canvas elements.
     *
     * @function browserHasCanvasSupport
     * @private
     * @static
     * @author jrfrimme
     * @modified Mon Nov 19 14:44:00 2012
     */
    var browserHasCanvasSupport = function () {
        return (
                (!!window.HTMLCanvasElement)
                &&
                (!!window.CanvasRenderingContext2D)
                &&
                (function (elem) {
                    return !!(elem.getContext && elem.getContext('2d'));
                }(document.createElement('canvas')))
            );
    };

    /**
     * Creates a Multigraph according to specified options. Returns a
     * jQuery `promise` which interacts with the multigraph through its
     * `done` function.
     *
     * @function createGraph
     * @param {Object} options
     *
     * @param {String|HTML Element|jQuery Object} options.div (REQUIRED)
     *      The DOM element div into which the multigraph should be
     *      placed; this value may be either (a) a string which is taken
     *      to be the id attribute of a div in the page, (b) a reference
     *      to the div DOM element itself, or (c) a jQuery object
     *      corresponding to the div DOM element.
     * 
     * @param {URI} options.mugl (REQUIRED) the URL from which the MUGL
     *       file for the Multigraph can be loaded
     * 
     * @param {String} options.driver (OPTIONAL) Indicates which
     *       graphics driver to use; should be one of the strings
     *       "canvas", "raphael", "logger", or "auto".  The default
     *       (which is used if the 'driver' tag is absent) is "auto",
     *       which causes Multigraph to check the features of the
     *       browser it is running in and choose the most appropriate
     *       driver.
     * 
     * @param {Function} options.error (OPTIONAL) A function for
     *       displaying error messages to the user.  Multigraph will
     *       call this function if and when it encounters an error.  The
     *       function should receive a single argument which is an
     *       instance of the JavaScrip Error object.  The default is to
     *       use Multigraph's own internal mechanism for displaying user
     *       messages.
     *
     * @param {Function} options.warning (OPTIONAL) A function for
     *       displaying warning messages to the user.  Multigraph will
     *       call this function if and when it needs to display a
     *       warning message. The function should receive a single
     *       argument which is an instance of the JavaScript Error
     *       object.  The default is to use Multigraph's own internal
     *       mechanism for displaying user messages.
     * @return {Promise} jQuery promise which provides interaction with
     *     the graph through its `done` function.
     * @author mbp
     * @modified Fri Nov 16 00:34:21 2012
     */
    Multigraph.createGraph = function (options) {
        var div = options.div,
            messageHandler,
            defaultMessageHandler;

        // if driver wasn't specified, choose the best based on browser capability
        if (!options.driver) {
            if (browserHasCanvasSupport()) {
                options.driver = "canvas";
            } else {
                options.driver = "raphael";
            }
        }

        // if div is a string, assume it's an id, and convert it to the div element itself
        if (typeof(div) === "string") {
            div = window.multigraph.jQuery("#" + div)[0];
        }

        //
        // NOTE: each of the Multigraph.create{DRIVER}Graph functions below takes an
        // "options" object argument just like Multigraph.createGraph does.  In general this
        // "options" object is the same as the one passed to this Multigraph.createGraph
        // function, but it differs in one way: Instead of containing separate "error" and
        // "warning" properties which are optional, the "options" object passed to the
        // Multigraph.create{DRIVER}Graph functions requires a single (non-optional!)
        // "messageHandler" property, which in turn contains "error" and "warning" properties
        // which are functions for handling errors and warnings, respectively.  Both the
        // "error" and a "warning" properties must be present in the "messageHandler" object
        // and must point to valid functions.
        // 
        // The rationale behind this is to allow convenience for callers of the more "public"
        // Multigraph.createGraph function, so that they don't have to specify an error or
        // warning handler function unless they want to use custom ones.  The internal
        // Multigraph.create{DRIVER}Graph functions, however, always need access to error and
        // warning functions, and often need to pass both of them on to other functions, so
        // they're encapsulated together into a single messageHandler object to make this
        // easier.
        //
        // Build the messageHandler object:
        messageHandler = {};
        if (typeof(options.error) === "function") {
            messageHandler.error = options.error;
        }
        if (typeof(options.warning) === "function") {
            messageHandler.warning = options.warning;
        }

        if (! messageHandler.error  || ! messageHandler.warning) {
            defaultMessageHandler = Multigraph.createDefaultMessageHandlers(div);
            if (! messageHandler.error) {
                messageHandler.error = defaultMessageHandler.error;
            }
            if (! messageHandler.warning) {
                messageHandler.warning = defaultMessageHandler.warning;
            }
        }
        options.messageHandler = messageHandler;

        // delegate to the driver-specific create function
        if (options.driver === "canvas") {
            return Multigraph.createCanvasGraph(options);
        } else if (options.driver === "raphael") {
            return Multigraph.createRaphaelGraph(options);
        } else if (options.driver === "logger") {
            return Multigraph.createLoggerGraph(options);
        } else {
            options.messageHanlder.error(new Error("invalid graphic driver '" + options.driver + "' specified to Multigraph.createGraph"));
            return undefined;
        }
    };

    /**
     * `window.multigraph.create` is an alias for `window.multigraph.core.Multigraph.createGraph`.
     *
     * @function window.multigraph.create
     * @param {Object} options
     *
     * @param {String|HTML Element|jQuery Object} options.div (REQUIRED)
     *      The DOM element div into which the multigraph should be
     *      placed; this value may be either (a) a string which is taken
     *      to be the id attribute of a div in the page, (b) a reference
     *      to the div DOM element itself, or (c) a jQuery object
     *      corresponding to the div DOM element.
     * 
     * @param {URI} options.mugl (REQUIRED) the URL from which the MUGL
     *       file for the Multigraph can be loaded
     * 
     * @param {String} options.driver (OPTIONAL) Indicates which
     *       graphics driver to use; should be one of the strings
     *       "canvas", "raphael", "logger", or "auto".  The default
     *       (which is used if the 'driver' tag is absent) is "auto",
     *       which causes Multigraph to check the features of the
     *       browser it is running in and choose the most appropriate
     *       driver.
     * 
     * @param {Function} options.error (OPTIONAL) A function for
     *       displaying error messages to the user.  Multigraph will
     *       call this function if and when it encounters an error.  The
     *       function should receive a single argument which is an
     *       instance of the JavaScrip Error object.  The default is to
     *       use Multigraph's own internal mechanism for displaying user
     *       messages.
     *
     * @param {Function} options.warning (OPTIONAL) A function for
     *       displaying warning messages to the user.  Multigraph will
     *       call this function if and when it needs to display a
     *       warning message. The function should receive a single
     *       argument which is an instance of the JavaScript Error
     *       object.  The default is to use Multigraph's own internal
     *       mechanism for displaying user messages.
     * @return {Promise} jQuery promise which provides interaction with
     *     the graph through its `done` function.
     * @static
     * @author jrfrimme
     * @modified Mon Nov 19 15:12:15 2012
     */
    window.multigraph.create = Multigraph.createGraph;

    /**
     * Creates default error and warning functions for multigraph.
     *
     * @function createDefaultMessageHandlers
     * @param {HTML Element} div
     * @static
     * @return {Object} Object keyed by `error` and `warning` which respectively point to
     *     the generated default error and warning functions.
     * @author jrfrimme
     * @modified Mon Nov 19 15:08:11 2012
     */
    Multigraph.createDefaultMessageHandlers = function (div) {

        $(div).css('position', 'relative');
        $(div).errorDisplay({});

        return {
            error : function(e) {
                $(div).errorDisplay("displayError", e.message, e.message, {
                    fontColor       : '#000000',
                    backgroundColor : '#ff0000',
                    indicatorColor  : '#ff0000'
                });
            },

            warning : function (w) {
                // w can be either a string, or a Warning instance
                var message = "Warning: " + ((typeof(w) === "string") ? w : w.message);
                $(div).errorDisplay("displayError", message, message, {
                    fontColor       : '#000000',
                    backgroundColor : '#e06a1b',
                    indicatorColor  : '#e06a1b'
                });
            }
        };
    };

    ns.Multigraph = Multigraph;

});
