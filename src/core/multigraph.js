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

    // define empty object for holding data adpaters
    window.multigraph.adapters = {};

    /**
     * The Multigraph Jermaine model is the root class for the js-multigraph project.
     *
     * @class Multigraph
     * @for Multigraph
     * @constructor
     */
    var Multigraph = new window.jermaine.Model("Multigraph", function () {

        /**
         * Jermiane Attr_List of all the graphs in a Multigraph.
         *
         * @property graphs
         * @type {Graph}
         * @author jrfrimme
         */
        this.hasMany("graphs").eachOfWhich.validateWith(function (graph) {
            return graph instanceof ns.Graph;
        });

        /**
         * The div the multigraph is rendered in.
         *
         * @property div
         * @type {HTML Element}
         * @author jrfrimme
         */
        this.hasA("div"); // the actual div element

        /**
         * The url for the mugl file this graph was created from, if any
         *
         * @property mugl
         * @type {string}
         * @author mbp
         */
        this.hasA("mugl");

        /**
         * JavaScript array of ajax throttles; each entry in this array is an
         * object with the following properties:
         *    regex        : regular expression for matching URLs
         *    ajaxthrottle : instance of $.ajaxthrottle
         * 
         * @property ajaxthrottles
         * @type {Array}
         * @author mbp
         */
        this.hasA("ajaxthrottles");

        this.isBuiltWith(function() {
            this.ajaxthrottles([]);
        });

        this.respondsTo("addAjaxThrottle", function (pattern, requests, period, concurrent) {
            this.ajaxthrottles().push({
                regex        : pattern ? new RegExp(pattern) : undefined,
                ajaxthrottle : window.multigraph.jQuery.ajaxthrottle({
                    numRequestsPerTimePeriod : parseInt(requests,10),
                    timePeriod               : parseInt(period, 10),
                    maxConcurrent            : parseInt(concurrent, 10)
                })
            });
        });

        this.respondsTo("getAjaxThrottle", function (url) {
            var throttle = undefined;
            window.multigraph.jQuery.each(this.ajaxthrottles(), function() {
                if (!this.regex || this.regex.test(url)) {
                    throttle = this.ajaxthrottle;
                    return false;
                }
                return true;
            });
            return throttle;
        });

        /*
         * This function transforms a given URL so that it
         * is relative to the same base as the URL from which the MUGL
         * file was loaded.  If this graph was not created from a MUGL
         * file (either it came from a MUGL string, or was created programmatically),
         * the URL is returned unchanged.
         * 
         * If the URL to be rebased is absolute (contains '://')
         * or root-relative (starts with a '/'), it is returned unchanged.
         * 
         * Otherise, the given URL is relative, and whhat is returned is a
         * new URL obtained by interpreting it relative to the URL
         * from which the MUGL was loaded. 
         */
        this.respondsTo("rebaseUrl", function(url) {
            var baseurl = this.mugl();
            if (! baseurl) {
                return url;
            }
            if (/^\//.test(url)) {
                // url is root-relative (starts with a '/'); return it unmodified
                return url;
            }
            if (/:\/\//.test(url)) {
                // url contains '://', so assume it's a full url, return it unmodified
                return url;
            }
            // convert baseurl to a real base path, by eliminating any url args and
            // everything after the final '/'
            baseurl = baseurl.replace(/\?.*$/, ''); // remove everything after the first '?'
            baseurl = baseurl.replace(/\/[^\/]*$/, '/'); // remove everything after the last '/'
            return baseurl + url;
        });

        /**
         * The busy spinner
         *
         * @property busySpinner
         * @type {HTML Element}
         * @author mbp
         */
        this.hasA("busySpinner"); // the busy_spinner div

        this.respondsTo("busySpinnerLevel", function (delta) {
            if (this.busySpinner()) {
                $(this.busySpinner()).busy_spinner('level', delta);
            }
        });


        /**
         * Initializes the Multigraph's geometry by calling the `initializeGeometry` function of
         * each of its graph children.
         *
         * @method initializeGeometry
         * @param {Integer} width Width of the multigraph's div.
         * @param {Integer} height Height of the multigraph's div.
         * @param {Object} graphicsContext
         * @author jrfrimme
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
     * @method browserHasCanvasSupport
     * @private
     * @static
     * @author jrfrimme
     */
    ns.browserHasCanvasSupport = function () {
        return (
                (!!window.HTMLCanvasElement) &&
                (!!window.CanvasRenderingContext2D) &&
                (function (elem) {
                    return !!(elem.getContext && elem.getContext('2d'));
                }(document.createElement('canvas')))
            );
    };

    ns.browserHasSVGSupport = function () {
        return !!document.createElementNS &&
            !!document.createElementNS('http://www.w3.org/2000/svg', "svg").createSVGRect;
    };

    /**
     * Creates a Multigraph according to specified options. Returns a
     * jQuery `promise` which interacts with the multigraph through its
     * `done` function.
     *
     * @method createGraph
     * @param {Object} options
     *
     * @param {String|HTML Element|jQuery Object} options.div (REQUIRED)
     *      The DOM element div into which the multigraph should be
     *      placed; this value may be either (a) a string which is taken
     *      to be the id attribute of a div in the page, (b) a reference
     *      to the div DOM element itself, or (c) a jQuery object
     *      corresponding to the div DOM element.
     * 
     * @param {URI} options.mugl (REQUIRED, unless muglString is present)
     *       the URL from which the MUGL
     *       file for the Multigraph can be loaded
     * 
     * @param {String} options.muglString (REQUIRED, unless mugl is present)
     *       a string containing the MUGL XML for the graph
     * 
     * @param {String} options.driver (OPTIONAL) Indicates which
     *       graphics driver to use; should be one of the strings
     *       "canvas", "raphael", or "auto".  The default (which is
     *       used if the 'driver' tag is absent) is "auto", which
     *       causes Multigraph to check the features of the browser
     *       it is running in and choose the most appropriate driver.
     * 
     * @param {Function} options.error (OPTIONAL) A function for
     *       displaying error messages to the user.  Multigraph will
     *       call this function if and when it encounters an error.  The
     *       function should receive a single argument which is an
     *       instance of the JavaScript Error object.  The default is to
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
     */
    Multigraph.createGraph = function (options) {
        var div = options.div,
            messageHandler,
            defaultMessageHandler;

        // if driver wasn't specified, choose the best based on browser capability
        if (!options.driver) {
            if (ns.browserHasCanvasSupport()) {
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

        if (options.muglString !== undefined) {
            // delegate to the driver-specific create function
            if (options.driver === "canvas") {
                return Multigraph.createCanvasGraphFromString(options);
            } else if (options.driver === "raphael") {
                return Multigraph.createRaphaelGraphFromString(options);
            } else {
                options.messageHanlder.error(new Error("invalid graphic driver '" + options.driver + "' specified to Multigraph.createGraph"));
                return undefined;
            }
        }

        // delegate to the driver-specific create function
        if (options.driver === "canvas") {
            return Multigraph.createCanvasGraph(options);
        } else if (options.driver === "raphael") {
            return Multigraph.createRaphaelGraph(options);
        } else {
            options.messageHanlder.error(new Error("invalid graphic driver '" + options.driver + "' specified to Multigraph.createGraph"));
            return undefined;
        }
    };

    /**
     * `window.multigraph.create` is an alias for `window.multigraph.core.Multigraph.createGraph`.
     *
     * @method window.multigraph.create
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
     *       "canvas", "raphael", or "auto".  The default (which is
     *       used if the 'driver' tag is absent) is "auto", which
     *       causes Multigraph to check the features of the browser
     *       it is running in and choose the most appropriate driver.
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
     */
    window.multigraph.create = Multigraph.createGraph;

    /**
     * Creates default error and warning functions for multigraph.
     *
     * @method createDefaultMessageHandlers
     * @param {HTML Element} div
     * @static
     * @return {Object} Object keyed by `error` and `warning` which respectively point to
     *     the generated default error and warning functions.
     * @author jrfrimme
     */
    Multigraph.createDefaultMessageHandlers = function (div) {

        $(div).css('position', 'relative');
        $(div).errorDisplay({});

        return {
            error : function(e) {
                var stackTrace = (e.stack && typeof(e.stack) === "string") ? e.stack.replace(/\n/g, "</li><li>") : e.message;
                $(div).errorDisplay("displayError", stackTrace, e.message, {
                    fontColor       : '#000000',
                    backgroundColor : '#ff0000',
                    indicatorColor  : '#ff0000'
                });
            },

            warning : function (w) {
                // w can be either a string, or a Warning instance
                var message    = "Warning: " + ((typeof(w) === "string") ? w : w.message),
                    stackTrace = (typeof(w) !== "string" && w.stack && typeof(w.stack) === "string") ? w.stack.replace(/\n/g, "</li><li>") : message;
                $(div).errorDisplay("displayError", stackTrace, message, {
                    fontColor       : '#000000',
                    backgroundColor : '#e06a1b',
                    indicatorColor  : '#e06a1b'
                });
            }
        };
    };

    ns.Multigraph = Multigraph;

});
