window.multigraph.util.namespace("window.multigraph.parser.jquery", function (ns) {
    "use strict";

    ns.mixin.add(function (ns, parse) {


        // Remove this function once we completely remove support for legacy "missingvalue" and
        // "missingop" renderer options.
        var legacyMissingValueMissingOpSupport = function(renderer, xml, plot, messageHandler) {
            // this function should check the options specified in the xml, and if 
            // "missingvalue" and/or "missingop" are present, should use them to populate
            // the corresponding attributes of the plot's data variables, if they have not already
            // been specified.  It provides backwards compatiblity...
        };

        ns.core.Renderer[parse] = function (xml, plot, messageHandler) {
            var rendererType,
                renderer,
                opt;

            if (xml && xml.attr("type") !== undefined) {
                rendererType = ns.core.Renderer.Type.parse(xml.attr("type"));
                if (!ns.core.Renderer.Type.isInstance(rendererType)) {
                    throw new Error("unknown renderer type '" + xml.attr("type") + "'");
                }
                renderer = ns.core.Renderer.create(rendererType);
                renderer.plot(plot);
                if (xml.find("option").length > 0) {
                    window.multigraph.jQuery.each(xml.find(">option"), function (i, e) {
                        try {
                            renderer.setOptionFromString(window.multigraph.jQuery(e).attr("name"),
                                                         window.multigraph.jQuery(e).attr("value"),
                                                         window.multigraph.jQuery(e).attr("min"),
                                                         window.multigraph.jQuery(e).attr("max"));
                        } catch (e) {
                            if (e instanceof window.multigraph.core.Warning) {
                                messageHandler.warning(e);
                            } else {
                                throw e;
                            }
                        }
                    });
                    // remove this call once we completely remove support for legacy "missingvalue" and
                    // "missingop" renderer options
                    legacyMissingValueMissingOpSupport(renderer, xml, plot, messageHandler);
                }
            }
            return renderer;
        };

    });

});
