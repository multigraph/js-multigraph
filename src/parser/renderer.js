window.multigraph.util.namespace("window.multigraph.parser", function (ns) {
    "use strict";

    ns.mixin.add(function (ns, parse) {

        ns.core.Renderer[parse] = function (xml, plot, messageHandler) {
            var rendererType,
                renderer,
                opt,
                $        = ns.jQuery,
                core     = ns.core,
                Renderer = core.Renderer;

            if (xml && xml.attr("type") !== undefined) {
                rendererType = Renderer.Type.parse(xml.attr("type"));
                if (!Renderer.Type.isInstance(rendererType)) {
                    throw new Error("unknown renderer type '" + xml.attr("type") + "'");
                }
                renderer = Renderer.create(rendererType);
                renderer.plot(plot);
                if (xml.find("option").length > 0) {

                    //
                    // The following provides support for deprecatd the "missingvalue" and
                    // "missingop" renderer options.  Those options are not officially supported
                    // any more; MUGL files should use the  missingvalue/missingop attributes
                    // of <data><variable> or <data><variables> instead.  When we're ready to
                    // remove this support, delete the block of code:
                    //
                    (function (renderer, xml, plot, messageHandler) {
                        var i,
                            missingValueOption = xml.find("option[name=missingvalue]"),
                            missingOpOption    = xml.find("option[name=missingop]");
                        if (missingValueOption.length > 0 || missingOpOption.length > 0) {
                            var columns = plot.data().columns(),
                                column;
                            for (i = 0; i < columns.size();  ++i) {
                                column = columns.at(i);
                                if (column.type() === core.DataValue.NUMBER) {
                                    if (missingValueOption.length > 0 && (column.missingvalue() === undefined)) {
                                        column.missingvalue(core.NumberValue.parse(missingValueOption.attr("value")));
                                    }
                                    if (missingOpOption.length > 0 && (column.missingop() === undefined)) {
                                        column.missingop(core.DataValue.parseComparator(missingOpOption.attr("value")));
                                    }
                                }
                            }
                        }
                        if (missingValueOption.length > 0) {
                            messageHandler.warning("Renderer option 'missingvalue' is deprecated; " +
                                                   "use 'missingvalue' attribute of 'data'/'variable'; instead");
                            // remove the element from the xml so that the option-processing code below doesn't see it
                            missingValueOption.remove();
                        }
                        if (missingOpOption.length > 0) {
                            messageHandler.warning("Renderer option 'missingop' is deprecated; " +
                                                   "use 'missingvalue' attribute of 'data'/'variable'; instead");
                            // remove the element from the xml so that the option-processing code below doesn't see it
                            missingOpOption.remove();
                        }
                    }(renderer, xml, plot, messageHandler));
                    //
                    // End of code to delete when removing support for deprecated
                    // missingvalue/missingop renderer options.
                    //

                    $.each(xml.find(">option"), function (i, e) {
                        try {
                            renderer.setOptionFromString($(e).attr("name"),
                                                         $(e).attr("value"),
                                                         $(e).attr("min"),
                                                         $(e).attr("max"));
                        } catch (e) {
                            if (e instanceof core.Warning) {
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
