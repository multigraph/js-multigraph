window.multigraph.util.namespace("window.multigraph.parser.jquery", function (ns) {
    "use strict";

    ns.mixin.add(function (ns, parse) {
        
        ns.core.Window[parse] = function (xml, messageHandler) {
            //WARNING: do not declare a local var named "window" here; it masks the global 'window' object,
            //  which screws up the references to window.multigraph.* below!
            var w = new ns.core.Window(),
                RGBColor = ns.math.RGBColor,
                attr;
            if (xml) {
                attr = xml.attr("width");
                if (attr !== undefined) {
                    w.width(parseInt(attr, 10));
                }
                attr = xml.attr("height");
                if (attr !== undefined) {
                    w.height(parseInt(attr, 10));
                }
                attr = xml.attr("border");
                if (attr !== undefined) {
                    w.border(parseInt(attr, 10));
                }

                attr = xml.attr("margin");
                if (attr !== undefined) {
                    (function (m) {
                        w.margin().set(m,m,m,m);
                    }(parseInt(attr, 10)));
                }

                attr = xml.attr("padding");
                if (attr !== undefined) {
                    (function (m) {
                        w.padding().set(m,m,m,m);
                    }(parseInt(attr, 10)));
                }

                attr = xml.attr("bordercolor");
                if (attr !== undefined) {
                    w.bordercolor(RGBColor.parse(attr));

                    // remove this block when removing support for deprecated color names
                    if (RGBColor.colorNameIsDeprecated(attr)) {
                        if (messageHandler && messageHandler.warning) {
                            messageHandler.warning("Color name '"+attr+"; is deprecated; use the RGB hex notation instead");
                        }
                    }
                // end of block to remove when removing support for deprecated color names
                }

            }
            return w;
        };
        
    });

});
