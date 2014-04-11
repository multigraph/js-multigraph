window.multigraph.util.namespace("window.multigraph.parser", function (ns) {
    "use strict";

    ns.mixin.add(function (ns, parse) {
        
        ns.core.Window[parse] = function (xml) {
            //WARNING: do not declare a local var named "window" here; it masks the global 'window' object,
            //  which screws up the references to window.multigraph.* below!
            var w = new ns.core.Window(),
                utilityFunctions = ns.utilityFunctions,
                parseAttribute   = utilityFunctions.parseAttribute,
                parseInteger     = utilityFunctions.parseInteger,
                attr;
            if (xml) {
                parseAttribute(xml.attr("width"),  w.width,  parseInteger);
                parseAttribute(xml.attr("height"), w.height, parseInteger);
                parseAttribute(xml.attr("border"), w.border, parseInteger);

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

                // removed deprecated color name check from commit #17665e2
                //    jrfrimme Tues Apr 2 11:47 2013
                parseAttribute(xml.attr("bordercolor"), w.bordercolor, ns.math.RGBColor.parse);
            }
            return w;
        };
        
    });

});
