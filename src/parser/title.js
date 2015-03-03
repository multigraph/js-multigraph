var Title = require('../core/title.js');

Title.parseXML = function (xml, graph) {
    var Point            = require('../math/point.js'),
        RGBColor         = require('../math/rgb_color.js'),
        Text             = require('../core/text.js'),
        pF               = require('../util/parsingFunctions.js'),
        parsePoint       = Point.parse,
        parseRGBColor    = RGBColor.parse,
        parseAttribute   = pF.parseAttribute,
        parseInteger     = pF.parseInteger,
        title;

    if (xml) {
        var text = xml.text();
        if (text !== "") {
            title = new Title(new Text(text), graph);
        } else {
            return undefined;
        }                
        parseAttribute(pF.getXMLAttr(xml,"frame"),        title.frame,        function (value) { return value.toLowerCase(); });
        parseAttribute(pF.getXMLAttr(xml,"border"),       title.border,       parseInteger);
        parseAttribute(pF.getXMLAttr(xml,"color"),        title.color,        parseRGBColor);
        parseAttribute(pF.getXMLAttr(xml,"bordercolor"),  title.bordercolor,  parseRGBColor);
        parseAttribute(pF.getXMLAttr(xml,"opacity"),      title.opacity,      parseFloat);
        parseAttribute(pF.getXMLAttr(xml,"padding"),      title.padding,      parseInteger);
        parseAttribute(pF.getXMLAttr(xml,"cornerradius"), title.cornerradius, parseInteger);
        parseAttribute(pF.getXMLAttr(xml,"anchor"),       title.anchor,       parsePoint);
        parseAttribute(pF.getXMLAttr(xml,"base"),         title.base,         parsePoint);
        parseAttribute(pF.getXMLAttr(xml,"position"),     title.position,     parsePoint);
    }
    return title;
};

module.exports = Title;
