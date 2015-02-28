var Plotarea = require('../core/plotarea.js');

Plotarea.parseXML = function (xml) {
    var plotarea = new Plotarea(),
        margin = plotarea.margin(),
        parsingFunctions = require('../util/parsingFunctions.js'),
        RGBColor         = require('../math/rgb_color.js'),
        parseRGBColor    = RGBColor.parse,
        parseAttribute   = parsingFunctions.parseAttribute,
        parseInteger     = parsingFunctions.parseInteger;
    if (xml) {
        parseAttribute(xml.attr("marginbottom"), margin.bottom,        parseInteger);
        parseAttribute(xml.attr("marginleft"),   margin.left,          parseInteger);
        parseAttribute(xml.attr("margintop"),    margin.top,           parseInteger);
        parseAttribute(xml.attr("marginright"),  margin.right,         parseInteger);
        parseAttribute(xml.attr("border"),       plotarea.border,      parseInteger);
        parseAttribute(xml.attr("color"),        plotarea.color,       parseRGBColor);
        parseAttribute(xml.attr("bordercolor"),  plotarea.bordercolor, parseRGBColor);
    }
    return plotarea;
};

module.exports = Plotarea;
