var Plotarea = require('../../core/plotarea.js');

Plotarea.parseXML = function (xml) {
    var plotarea = new Plotarea(),
        margin = plotarea.margin(),
        pF               = require('../../util/parsingFunctions.js'),
        RGBColor         = require('../../math/rgb_color.js'),
        parseRGBColor    = RGBColor.parse,
        parseAttribute   = pF.parseAttribute,
        parseInteger     = pF.parseInteger;
    if (xml) {
        parseAttribute(pF.getXMLAttr(xml,"marginbottom"), margin.bottom,        parseInteger);
        parseAttribute(pF.getXMLAttr(xml,"marginleft"),   margin.left,          parseInteger);
        parseAttribute(pF.getXMLAttr(xml,"margintop"),    margin.top,           parseInteger);
        parseAttribute(pF.getXMLAttr(xml,"marginright"),  margin.right,         parseInteger);
        parseAttribute(pF.getXMLAttr(xml,"border"),       plotarea.border,      parseInteger);
        parseAttribute(pF.getXMLAttr(xml,"color"),        plotarea.color,       parseRGBColor);
        parseAttribute(pF.getXMLAttr(xml,"bordercolor"),  plotarea.bordercolor, parseRGBColor);
    }
    return plotarea;
};

module.exports = Plotarea;
