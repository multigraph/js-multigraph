window.multigraph.util.namespace("window.multigraph.parser.jquery", function (ns) {
    "use strict";

    ns.mixin.add(function (ns, parse) {
        
        ns.core.Img[parse] = function (xml, multigraph) {
            var img;
            if (xml && xml.attr("src") !== undefined) {
                var src = xml.attr("src");
                if (!src) {
                    throw new Error('img elment requires a "src" attribute value');
                }
                if (multigraph) {
                    src = multigraph.rebaseUrl(src);
                }
                img = new ns.core.Img(src);
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
