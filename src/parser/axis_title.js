var AxisTitle = require('../core/axis_title.js');

AxisTitle.parseXML = function (xml, axis) {
    var title = new AxisTitle(axis),
        Text = require('../core/text.js'),
        Point = require('../math/point.js'),
        pF = require('../util/parsingFunctions.js'),
        nonEmptyTitle = false,
        parsePoint = Point.parse,
        text,
        parseTitleAttribute = function (value, attribute, preprocessor) {
            if (pF.parseAttribute(value, attribute, preprocessor)) {
                // No.  Don't count the title as nonEmpty just because of attributes.
                // If a <title> tag has only attributes, and no content, this
                // function should return `undefined` so that the normalizer won't
                // come along later and populate the title content with the axis id.
                // Empty <title> content means don't draw a title at all, in which
                // case it's OK to just forget about any attributes that were set.
                //nonEmptyTitle = true;
            }
        };

    if (xml) {
        text = xml.text();
        if (text !== "") {
            title.content(new Text(text));
            nonEmptyTitle = true;
        }
        parseTitleAttribute(pF.getXMLAttr(xml,"anchor"),   title.anchor,   parsePoint);
        parseTitleAttribute(pF.getXMLAttr(xml,"base"),     title.base,     parseFloat);
        parseTitleAttribute(pF.getXMLAttr(xml,"position"), title.position, parsePoint);
        parseTitleAttribute(pF.getXMLAttr(xml,"angle"),    title.angle,    parseFloat);
    }

    if (nonEmptyTitle === true) { 
        return title;
    }
    return undefined;
};

module.exports = AxisTitle;
