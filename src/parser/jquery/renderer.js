window.multigraph.util.namespace("window.multigraph.parser.jquery", function (ns) {
    "use strict";

    ns.mixin.add(function (ns, parse) {

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
                }
            }
            return renderer;
        };

    });

});
