var Img = require('../../core/img.js');

//   <img src="foo.png" anchor="-1 5" base="3 12" position="-2 3" frame="padding"/>
Img.parseXML = function (xml, multigraph) {
    var img,
        pF = require('../../util/parsingFunctions.js'),
        Point            = require('../../math/point.js'),
        parseAttribute   = pF.parseAttribute,
        parsePoint       = Point.parse;
    if (xml && pF.getXMLAttr(xml,"src") !== undefined) {
        var src = pF.getXMLAttr(xml,"src");
        if (!src) {
            throw new Error('img elment requires a "src" attribute value');
        }
        if (multigraph) {
            src = multigraph.rebaseUrl(src);
        }
        img = new Img(src);
        parseAttribute(pF.getXMLAttr(xml,"anchor"),   img.anchor,   parsePoint);
        parseAttribute(pF.getXMLAttr(xml,"base"),     img.base,     parsePoint);
        parseAttribute(pF.getXMLAttr(xml,"position"), img.position, parsePoint);
        parseAttribute(pF.getXMLAttr(xml,"frame"),    img.frame,    function (value) { return value.toLowerCase(); });
    }
    return img;
};

module.exports = Img;
