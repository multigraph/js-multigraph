window.multigraph.util.namespace("window.multigraph.parser.jquery", function (ns) {
    "use strict";

    ns.mixin.add(function (ns, parse) {

        ns.core.Background[parse] = function (xml, multigraph) {
            var background = new ns.core.Background(),
                child;
            if (xml) {
                ns.utilityFunctions.parseAttribute(xml.attr("color"), background.color, ns.math.RGBColor.parse);
                child = xml.find("img");
                if (child.length > 0) {
                    background.img(ns.core.Img[parse](child, multigraph));
                }
            }
            return background;
        };

    });

});
