var Plotarea = require('../../core/plotarea.js');

//  <plotarea
//     marginbottom="INTEGER(35)"
//     marginleft="INTEGER(38)"
//     margintop="INTEGER(10)"
//     marginright="INTEGER(35)"
//     border="INTEGER(0)"
//     bordercolor="COLOR(0xeeeeee)"
//     color="COLOR">
//  </plotarea>
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
