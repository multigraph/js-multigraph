var Title = require('../core/title.js');

Title.parseXML = function (xml, graph) {
    var Point            = require('../math/point.js'),
        RGBColor         = require('../math/rgb_color.js'),
        Text             = require('../core/text.js'),
        parsingFunctions = require('../util/parsingFunctions.js'),
        parsePoint       = Point.parse,
        parseRGBColor    = RGBColor.parse,
        parseAttribute   = parsingFunctions.parseAttribute,
        parseInteger     = parsingFunctions.parseInteger,
        title;

    if (xml) {
        var text = xml.text();
        if (text !== "") {
            title = new Title(new Text(text), graph);
        } else {
            return undefined;
        }                
        parseAttribute(xml.attr("frame"),        title.frame,        function (value) { return value.toLowerCase(); });
        parseAttribute(xml.attr("border"),       title.border,       parseInteger);
        parseAttribute(xml.attr("color"),        title.color,        parseRGBColor);
        parseAttribute(xml.attr("bordercolor"),  title.bordercolor,  parseRGBColor);
        parseAttribute(xml.attr("opacity"),      title.opacity,      parseFloat);
        parseAttribute(xml.attr("padding"),      title.padding,      parseInteger);
        parseAttribute(xml.attr("cornerradius"), title.cornerradius, parseInteger);
        parseAttribute(xml.attr("anchor"),       title.anchor,       parsePoint);
        parseAttribute(xml.attr("base"),         title.base,         parsePoint);
        parseAttribute(xml.attr("position"),     title.position,     parsePoint);
    }
    return title;
};

module.exports = Title;
