window.multigraph.util.namespace("window.multigraph.parser.jquery", function (ns) {
    "use strict";

    ns.mixin.add(function (ns, parse) {
        
        ns.core.Window[parse] = function (xml, messageHandler) {
            //WARNING: do not declare a local var named "window" here; it masks the global 'window' object,
            //  which screws up the references to window.multigraph.* below!
            var w = new ns.core.Window();
            if (xml) {
                if (xml.attr("width") !== undefined) {
                    w.width(parseInt(xml.attr("width"), 10));
                }
                if (xml.attr("height") !== undefined) {
                    w.height(parseInt(xml.attr("height"), 10));
                }
                if (xml.attr("border") !== undefined) {
                    w.border(parseInt(xml.attr("border"), 10));
                }

                if (xml.attr("margin") !== undefined) {
                    (function (m) {
                        w.margin().set(m,m,m,m);
                    }(parseInt(xml.attr("margin"), 10)));
                }

                if (xml.attr("padding") !== undefined) {
                    (function (m) {
                        w.padding().set(m,m,m,m);
                    }(parseInt(xml.attr("padding"), 10)));
                }

                w.bordercolor(ns.math.RGBColor.parse(xml.attr("bordercolor")));

                // remove this block when removing support for deprecated color names
                if (ns.math.RGBColor.colorNameIsDeprecated(xml.attr("bordercolor"))) {
                    if (messageHandler && messageHandler.warning) {
                        messageHandler.warning("Color name '"+xml.attr("bordercolor")+"; is deprecated; use the RGB hex notation instead");
                    }
                }
                // end of block to remove when removing support for deprecated color names

            }
            return w;
        };
        
    });

});
