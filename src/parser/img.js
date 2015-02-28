var Img = require('../core/img.js');

Img.parseXML = function (xml, multigraph) {
    var img,
        parsingFunctions = require('../util/parsingFunctions.js'),
        Point            = require('../math/point.js'),
        parseAttribute   = parsingFunctions.parseAttribute,
        parsePoint       = Point.parse;
    if (xml && xml.attr("src") !== undefined) {
        var src = xml.attr("src");
        if (!src) {
            throw new Error('img elment requires a "src" attribute value');
        }
        if (multigraph) {
            src = multigraph.rebaseUrl(src);
        }
        img = new Img(src);
        parseAttribute(xml.attr("anchor"),   img.anchor,   parsePoint);
        parseAttribute(xml.attr("base"),     img.base,     parsePoint);
        parseAttribute(xml.attr("position"), img.position, parsePoint);
        parseAttribute(xml.attr("frame"),    img.frame,    function (value) { return value.toLowerCase(); });
    }
    return img;
};

module.exports = Img;
