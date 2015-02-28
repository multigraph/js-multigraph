var Legend = require('../core/legend.js');

Legend.parseXML = function (xml) {
    var legend           = new Legend(),
        parsingFunctions = require('../util/parsingFunctions.js'),
        Point            = require('../math/point.js'),
        RGBColor         = require('../math/rgb_color.js'),
        Icon             = require('../core/icon.js'),
        parseAttribute   = parsingFuctions.parseAttribute,
        parseInteger     = parsingFuctions.parseInteger,
        parsePoint       = Point.parse,
        parseRGBColor    = RGBColor.parse,
        child;
    if (xml) {
        parseAttribute(xml.attr("visible"),      legend.visible,      parsingFuctions.parseBoolean);
        parseAttribute(xml.attr("base"),         legend.base,         parsePoint);
        parseAttribute(xml.attr("anchor"),       legend.anchor,       parsePoint);
        parseAttribute(xml.attr("position"),     legend.position,     parsePoint);
        parseAttribute(xml.attr("frame"),        legend.frame,        parsingFuctions.parseString);
        parseAttribute(xml.attr("color"),        legend.color,        parseRGBColor);
        parseAttribute(xml.attr("bordercolor"),  legend.bordercolor,  parseRGBColor);
        parseAttribute(xml.attr("opacity"),      legend.opacity,      parseFloat);
        parseAttribute(xml.attr("border"),       legend.border,       parseInteger);
        parseAttribute(xml.attr("rows"),         legend.rows,         parseInteger);
        parseAttribute(xml.attr("columns"),      legend.columns,      parseInteger);
        parseAttribute(xml.attr("cornerradius"), legend.cornerradius, parseInteger);
        parseAttribute(xml.attr("padding"),      legend.padding,      parseInteger);

        child = xml.find("icon");
        if (child.length > 0) {
            legend.icon(Icon.parseXML(child));
        }
    }
    return legend;
};

module.exports = Legend;
