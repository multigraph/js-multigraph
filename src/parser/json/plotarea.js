var Plotarea = require('../../core/plotarea.js');

//  "plotarea" : {
//     "marginbottom": INTEGER(35),
//     "marginleft": INTEGER(38),
//     "margintop": INTEGER(10),
//     "marginright": INTEGER(35),
//     "border": INTEGER(0),
//     "bordercolor": COLOR(0xeeeeee),
//     "color": COLOR,
//  }
Plotarea.parseJSON = function (json) {
    var plotarea = new Plotarea(),
        margin = plotarea.margin(),
        pF               = require('../../util/parsingFunctions.js'),
        RGBColor         = require('../../math/rgb_color.js'),
        parseRGBColor    = RGBColor.parse,
        parseAttribute   = pF.parseAttribute,
        parseInteger     = pF.parseInteger;
    if (json) {
        parseAttribute(json.marginbottom, margin.bottom);
        parseAttribute(json.marginleft,   margin.left);
        parseAttribute(json.margintop,    margin.top);
        parseAttribute(json.marginright,  margin.right);
        parseAttribute(json.border,       plotarea.border);
        parseAttribute(json.color,        plotarea.color,       parseRGBColor);
        parseAttribute(json.bordercolor,  plotarea.bordercolor, parseRGBColor);
    }
    return plotarea;
};

module.exports = Plotarea;
