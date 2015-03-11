var Title = require('../../core/title.js');

//  "title" : {
//      "base" : POINT(0,1),
//      "anchor" : POINT(0,1),
//      "position" : POINT(0,0),
//      "frame" : FRAME(padding),
//      "color" : COLOR(white),
//      "opacity" : DOUBLE(1.0),
//      "border" : INTEGER(0),
//      "bordercolor" : COLOR(black),
//      "padding" : INTEGER(0),
//      "cornerradius" : INTEGER(15),
//      "fontsize" : INTEGER,
//      "text" : STRING
//  }
Title.parseJSON = function (json, graph) {
    var Point            = require('../../math/point.js'),
        RGBColor         = require('../../math/rgb_color.js'),
        Text             = require('../../core/text.js'),
        pF               = require('../../util/parsingFunctions.js'),
        parseJSONPoint   = function(p) { return new Point(p[0], p[1]); },
        parseRGBColor    = RGBColor.parse,
        parseAttribute   = pF.parseAttribute,
        title;

    if (json) {
        var text = json.text;
        if (text !== "") {
            title = new Title(new Text(text), graph);
        } else {
            return undefined;
        }                
        parseAttribute(json.frame,        title.frame,        function (value) { return value.toLowerCase(); });
        parseAttribute(json.border,       title.border);
        parseAttribute(json.color,        title.color,        parseRGBColor);
        parseAttribute(json.bordercolor,  title.bordercolor,  parseRGBColor);
        parseAttribute(json.opacity,      title.opacity);
        parseAttribute(json.padding,      title.padding);
        parseAttribute(json.cornerradius, title.cornerradius);
        parseAttribute(json.anchor,       title.anchor,       parseJSONPoint);
        parseAttribute(json.base,         title.base,         parseJSONPoint);
        parseAttribute(json.position,     title.position,     parseJSONPoint);
    }
    return title;
};

module.exports = Title;
