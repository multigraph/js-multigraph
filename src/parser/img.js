window.multigraph.util.namespace("window.multigraph.parser.jquery", function (ns) {
    "use strict";

    ns.mixin.add(function (ns, parse) {
        
        ns.core.Img[parse] = function (xml, multigraph) {
            var img,
                parseAttribute = ns.utilityFunctions.parseAttribute,
                parsePoint    = ns.math.Point.parse;
            if (xml && xml.attr("src") !== undefined) {
                var src = xml.attr("src");
                if (!src) {
                    throw new Error('img elment requires a "src" attribute value');
                }
                if (multigraph) {
                    src = multigraph.rebaseUrl(src);
                }
                img = new ns.core.Img(src);
                parseAttribute(xml.attr("anchor"),   img.anchor,   parsePoint);
                parseAttribute(xml.attr("base"),     img.base,     parsePoint);
                parseAttribute(xml.attr("position"), img.position, parsePoint);
                parseAttribute(xml.attr("frame"),    img.frame,    function (value) { return value.toLowerCase(); });
            }
            return img;
        };
        
    });

});
