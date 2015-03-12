var Legend = require('../../core/legend.js');

// "legend" : {
//     "visible"      : "BOOLEAN",
//     "base"         : "POINT(1,1)",
//     "anchor"       : "POINT(1,1)",
//     "position"     : "POINT(0,0)",
//     "frame"        : "FRAME(padding)",
//     "color"        : "COLOR(white)",
//     "opacity"      : "DOUBLE(1.0)",
//     "border"       : "INTEGER(1)",
//     "bordercolor"  : "COLOR(black)",
//     "rows"         : "INTEGER",
//     "columns"      : "INTEGER",
//     "cornerradius" : "INTEGER(0)",
//     "padding"      : "INTEGER(0)",
//     "icon" : {
//       "width"  : "INTEGER(40)",
//       "height" : "INTEGER(30)",
//       "border" : "INTEGER(1)"
//     }
// }
Legend.parseJSON = function (json) {
    var legend           = new Legend(),
        pF               = require('../../util/parsingFunctions.js'),
        Point            = require('../../math/point.js'),
        RGBColor         = require('../../math/rgb_color.js'),
        Point            = require('../../math/point.js'),
        Icon             = require('../../core/icon.js'),
        parseAttribute   = pF.parseAttribute,
        parseJSONPoint   = function(p) { return new Point(p[0], p[1]); };

    require('./icon.js'); // for Icon.parseJSON below

    if (json) {
        parseAttribute(json.visible,      legend.visible,      pF.parseBoolean);
        parseAttribute(json.base,         legend.base,         parseJSONPoint);
        parseAttribute(json.anchor,       legend.anchor,       parseJSONPoint);
        parseAttribute(json.position,     legend.position,     parseJSONPoint);
        parseAttribute(json.frame,        legend.frame);
        parseAttribute(json.color,        legend.color,        RGBColor.parse);
        parseAttribute(json.bordercolor,  legend.bordercolor,  RGBColor.parse);
        parseAttribute(json.opacity,      legend.opacity);
        parseAttribute(json.border,       legend.border);
        parseAttribute(json.rows,         legend.rows);
        parseAttribute(json.columns,      legend.columns);
        parseAttribute(json.cornerradius, legend.cornerradius);
        parseAttribute(json.padding,      legend.padding);

        if (json.icon) {
            legend.icon(Icon.parseJSON(json.icon));
        }
    }
    return legend;
};

module.exports = Legend;
