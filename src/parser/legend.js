var Legend = require('../core/legend.js');

Legend.parseXML = function (xml) {
    var legend           = new Legend(),
        pF               = require('../util/parsingFunctions.js'),
        Point            = require('../math/point.js'),
        RGBColor         = require('../math/rgb_color.js'),
        Icon             = require('../core/icon.js'),
        parseAttribute   = parsingFuctions.parseAttribute,
        parseInteger     = parsingFuctions.parseInteger,
        parsePoint       = Point.parse,
        parseRGBColor    = RGBColor.parse,
        child;
    if (xml) {
        parseAttribute(pF.getXMLAttr(xml,"visible"),      legend.visible,      parsingFuctions.parseBoolean);
        parseAttribute(pF.getXMLAttr(xml,"base"),         legend.base,         parsePoint);
        parseAttribute(pF.getXMLAttr(xml,"anchor"),       legend.anchor,       parsePoint);
        parseAttribute(pF.getXMLAttr(xml,"position"),     legend.position,     parsePoint);
        parseAttribute(pF.getXMLAttr(xml,"frame"),        legend.frame,        parsingFuctions.parseString);
        parseAttribute(pF.getXMLAttr(xml,"color"),        legend.color,        parseRGBColor);
        parseAttribute(pF.getXMLAttr(xml,"bordercolor"),  legend.bordercolor,  parseRGBColor);
        parseAttribute(pF.getXMLAttr(xml,"opacity"),      legend.opacity,      parseFloat);
        parseAttribute(pF.getXMLAttr(xml,"border"),       legend.border,       parseInteger);
        parseAttribute(pF.getXMLAttr(xml,"rows"),         legend.rows,         parseInteger);
        parseAttribute(pF.getXMLAttr(xml,"columns"),      legend.columns,      parseInteger);
        parseAttribute(pF.getXMLAttr(xml,"cornerradius"), legend.cornerradius, parseInteger);
        parseAttribute(pF.getXMLAttr(xml,"padding"),      legend.padding,      parseInteger);

        child = xml.find("icon");
        if (child.length > 0) {
            legend.icon(Icon.parseXML(child));
        }
    }
    return legend;
};

module.exports = Legend;
