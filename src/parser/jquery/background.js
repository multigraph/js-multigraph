window.multigraph.util.namespace("window.multigraph.parser.jquery", function (ns) {
    "use strict";

    ns.mixin.add(function (ns, parse) {

        ns.core.Background[parse] = function (xml, multigraph) {
            var background = new ns.core.Background();
            if (xml) {
                background.color(ns.math.RGBColor.parse(xml.attr("color")));
                if (xml.find("img").length > 0) {
                    background.img(ns.core.Img[parse](xml.find("img"), multigraph));
                }
            }
            return background;
        };

    });

});
