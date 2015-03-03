var Labeler = require('../core/labeler.js');

Labeler.parseXML = function (xml, axis, defaults, spacing) {
    // This parser takes an optional final argument, spacing, which is a string representing
    // the spacing to be parsed for the labeler.  If that argument is not present, the spacing
    // value is taken from the xml object.  If a spacing argument is present, it is parsed
    // and used to set the spacing attribute of the Labeler object, and in this case, any
    // spacing value present in the xml is ignored.
    //
    // If the spacing argument has the value null, the resulting labeler will have no spacing
    // attribute set at all.
    var labeler,
        Point = require('../math/point.js'),
        RGBColor = require('../math/rgb_color.js'),
        DataMeasure = require('../core/data_measure.js'),
        DataValue = require('../core/data_value.js'),
        DataFormatter = require('../core/data_formatter.js'),
        pF = require('../util/parsingFunctions.js'),
        parsePoint = Point.parse;

    // `parseAttribute` returns true or false depending on whether or not it set the attribute.
    // If it did not and if the `defaults` object exists then the attribute is set to the
    // appropriate default value.
    var parseLabelerAttribute = function (value, attribute, preprocessor, defaultName) {
        if (!pF.parseAttribute(value, attribute, preprocessor) && defaults !== undefined) {
            attribute(defaults[defaultName]());
        }
    };
    var parseDataFormatter = function (type) {
        return function (value) {
            return DataFormatter.create(type, value);
        };
    };
    var parseDataValue = function (type) {
        return function (value) {
            return DataValue.parse(type, value);
        };
    };

    if (xml) {
        labeler = new Labeler(axis);
        if (spacing !== null) {
            if (spacing === undefined) {
                spacing = pF.getXMLAttr(xml,"spacing");
            }
            //NOTE: spacing might still === undefined at this point
            parseLabelerAttribute(spacing, labeler.spacing,
                                  function(v) { return DataMeasure.parse(axis.type(), v); }, //pF.parseDataMeasure(),
                                  "spacing");
        }
        parseLabelerAttribute(pF.getXMLAttr(xml,"format"),        labeler.formatter,     parseDataFormatter(axis.type()),              "formatter");
        parseLabelerAttribute(pF.getXMLAttr(xml,"start"),         labeler.start,         parseDataValue(axis.type()),                  "start");
        parseLabelerAttribute(pF.getXMLAttr(xml,"angle"),         labeler.angle,         parseFloat,                                   "angle");
        parseLabelerAttribute(pF.getXMLAttr(xml,"position"),      labeler.position,      parsePoint,                                   "position");
        parseLabelerAttribute(pF.getXMLAttr(xml,"anchor"),        labeler.anchor,        parsePoint,                                   "anchor");
        parseLabelerAttribute(pF.getXMLAttr(xml,"densityfactor"), labeler.densityfactor, parseFloat,                                   "densityfactor");
        parseLabelerAttribute(pF.getXMLAttr(xml,"color"),         labeler.color,         RGBColor.parse,                               "color");
        parseLabelerAttribute(pF.getXMLAttr(xml,"visible"),       labeler.visible,       pF.parseBoolean,                "visible");

    }
    return labeler;
};

module.exports = Labeler;
