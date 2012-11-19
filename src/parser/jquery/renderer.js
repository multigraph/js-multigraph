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

                    //
                    // The following provides support for deprecatd the "missingvalue" and
                    // "missingop" renderer options.  Remove this block of code once we completely
                    // remove support for this.
                    //
                    (function(renderer, xml, plot, messageHandler) {
                        var i,
                            missingValueOption = xml.find("option[name=missingvalue]"),
                            missingOpOption = xml.find("option[name=missingop]");
                        if (missingValueOption.length > 0 || missingOpOption.length > 0) {
                            var columns = plot.data().columns();
                            for (i=0; i<columns.size();  ++i) {
                                if (columns.at(i).type() == ns.core.DataValue.NUMBER) {
                                    if (missingValueOption.length > 0 && (columns.at(i).missingvalue() === undefined)) {
                                        columns.at(i).missingvalue(ns.core.NumberValue.parse(missingValueOption.attr("value")));
                                    }
                                    if (missingOpOption.length > 0 && (columns.at(i).missingop() === undefined)) {
                                        columns.at(i).missingop(ns.core.DataValue.parseComparator(missingOpOption.attr("value")));
                                    }
                                }
                            }
                        }
                        if (missingValueOption.length > 0) {
                            messageHandler.warning(new ns.core.Warning("Renderer option 'missingvalue' is deprecated; " +
                                                                       "use 'missingvalue' attribute of <data><variable> instead"));
                            // remove the element from the xml so that the option-processing code below doesn't see it
                            missingValueOption.remove();
                        }
                        if (missingOpOption.length > 0) {
                            messageHandler.warning(new ns.core.Warning("Renderer option 'missingop' is deprecated; " +
                                                                       "use 'missingop' attribute of <data><variable> instead"));
                            // remove the element from the xml so that the option-processing code below doesn't see it
                            missingOpOption.remove();
                        }
                    }(renderer, xml, plot, messageHandler));
                    //
                    // End of code to delete when removing support for deprecated
                    // missingvalue/missingop renderer options.
                    //

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
