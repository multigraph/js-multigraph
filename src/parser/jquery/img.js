window.multigraph.util.namespace("window.multigraph.parser.jquery", function (ns) {
    "use strict";

    ns.mixin.add(function (ns, parse) {
        
        ns.core.Img[parse] = function (xml) {
            var img;
            if (xml && xml.attr("src") !== undefined) {
                img = new ns.core.Img(xml.attr("src"));
                if (xml.attr("anchor") !== undefined) {
                    img.anchor(window.multigraph.math.Point.parse(xml.attr("anchor")));
                }
                if (xml.attr("base") !== undefined) {
                    img.base(window.multigraph.math.Point.parse(xml.attr("base")));
                }
                if (xml.attr("position") !== undefined) {
                    img.position(window.multigraph.math.Point.parse(xml.attr("position")));
                }
                if (xml.attr("frame") !== undefined) {
                    img.frame(xml.attr("frame").toLowerCase());
                }
            }
            return img;
        };
        
    });

});
