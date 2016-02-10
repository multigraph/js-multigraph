var AxisTitle = require('../../core/axis_title.js');

// "title" { "base": 23.2, "anchor": [12, 4], "position": [3, 7], "angle": 45, "text" : "temperature", "font" : "Roboto" }
// empty title:
//   "title" {}
//   "title" {"text" : "" }
AxisTitle.parseJSON = function (json, axis) {
    var title = new AxisTitle(axis),
        Text = require('../../core/text.js'),
        Point = require('../../math/point.js'),
        parseAttribute = require('../../util/parsingFunctions.js').parseAttribute,
        nonEmptyTitle = false,
        parseJSONPoint = function(p) { return new Point(p[0], p[1]); },
        text;

    if (json) {
        text = json.text;
        if (text !== "" && text !== undefined) {
            title.content(new Text(text));
            nonEmptyTitle = true;
        }
        parseAttribute(json.anchor,   title.anchor,   parseJSONPoint);
        parseAttribute(json.base,     title.base);
        parseAttribute(json.position, title.position, parseJSONPoint);
        parseAttribute(json.angle,    title.angle);
        parseAttribute(json.font,    title.font);
    }

    if (nonEmptyTitle === true) { 
        return title;
    }
    return undefined;
};

module.exports = AxisTitle;
