window.multigraph.util.namespace("window.multigraph.parser.jquery", function (ns) {
    "use strict";

    ns.mixin.add(function (ns, parse) {

        ns.core.Background[parse] = function (xml, multigraph) {
            var background = new ns.core.Background(),
                attr;
            if (xml) {
                attr = xml.attr("color");
                if (attr !== undefined) {
                    background.color(ns.math.RGBColor.parse(attr));
                }
                attr = xml.find("img");
                if (attr.length > 0) {
                    background.img(ns.core.Img[parse](attr, multigraph));
                }
            }
            return background;
        };

    });

});
