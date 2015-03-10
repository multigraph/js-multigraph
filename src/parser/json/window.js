var Window = require('../../core/window.js');

// "window" {
//       "width": INTEGER,
//       "height": INTEGER,
//       "border": INTEGER(2),
//       "bordercolor": COLOR(black),
//       "margin": INTEGER(2),
//       "padding": INTEGER(5),
// }
Window.parseJSON = function (json) {
    var w = new Window(),
        RGBColor         = require('../../math/rgb_color.js'),
        pF               = require('../../util/parsingFunctions.js'),
        parseAttribute   = pF.parseAttribute,
        parseInteger     = pF.parseInteger,
        attr;
    if (json) {
        parseAttribute(json.width,  w.width);
        parseAttribute(json.height, w.height);
        parseAttribute(json.border, w.border);

        attr = json.margin;
        if (attr !== undefined) {
            w.margin().set(attr,attr,attr,attr);
        }

        attr = json.padding;
        if (attr !== undefined) {
                w.padding().set(attr,attr,attr,attr);
        }
        parseAttribute(json.bordercolor, w.bordercolor, RGBColor.parse);
    }
    return w;
};

module.exports = Window;
