window.multigraph.util.namespace("window.multigraph.parser.jquery", function (ns) {
    "use strict";

    ns.mixin.add(function (ns, parse) {
        
        ns.core.Img[parse] = function (xml, multigraph) {
            var img,
                attr,
                Point = ns.math.Point;
            if (xml && xml.attr("src") !== undefined) {
                var src = xml.attr("src");
                if (!src) {
                    throw new Error('img elment requires a "src" attribute value');
                }
                if (multigraph) {
                    src = multigraph.rebaseUrl(src);
                }
                img = new ns.core.Img(src);
                attr = xml.attr("anchor");
                if (attr !== undefined) {
                    img.anchor(Point.parse(attr));
                }
                attr = xml.attr("base");
                if (attr !== undefined) {
                    img.base(Point.parse(attr));
                }
                attr = xml.attr("position");
                if (attr !== undefined) {
                    img.position(Point.parse(attr));
                }
                attr = xml.attr("frame");
                if (attr !== undefined) {
                    img.frame(attr.toLowerCase());
                }
            }
            return img;
        };
        
    });

});
