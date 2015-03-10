var Labeler = require('../../core/labeler.js');

// "labels" : {
//   "format: STRING,
//   "start" : DATAVALUE(0),
//   "angle" : DOUBLE(0),
//   "position" : POINT,
//   "anchor" : POINT,
//   "color" : COLOR(black),
//   "spacing" : STRING,
//   "densityfactor" : DOUBLE(1.0),
//   "label" : [
//     { "format": "%Y", "start": STRING, "angle": 45, "position": [2,3],
//       "anchor": [1,1], "spacing": "1Y", "densityfactor": 0.2 },
//     { "format": "%M", "start": STRING, "angle": 45, "position": [2,3],
//       "anchor": [1,1], "spacing": ["1M", "1D"], "densityfactor": 9.0 }
//   ]
// }
Labeler.parseJSON = function (json, axis, defaults, spacing) {
    // This parser takes an optional final argument, spacing, which is a string representing
    // the spacing to be parsed for the labeler.  If that argument is not present, the spacing
    // value is taken from the json object.  If a spacing argument is present, it is parsed
    // and used to set the spacing attribute of the Labeler object, and in this case, any
    // spacing value present in the json is ignored.
    //
    // If the spacing argument has the value null, the resulting labeler will have no spacing
    // attribute set at all.
    var labeler,
        Point = require('../../math/point.js'),
        RGBColor = require('../../math/rgb_color.js'),
        DataMeasure = require('../../core/data_measure.js'),
        DataValue = require('../../core/data_value.js'),
        DataFormatter = require('../../core/data_formatter.js'),
        pF = require('../../util/parsingFunctions.js'),
        parseJSONPoint = function(p) { return new Point(p[0], p[1]); };

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

    if (json) {
        labeler = new Labeler(axis);
        if (spacing !== null) {
            if (spacing === undefined) {
                spacing = json.spacing;
            }
            //NOTE: spacing might still === undefined at this point
            parseLabelerAttribute(spacing, labeler.spacing,
                                  function(v) { return DataMeasure.parse(axis.type(), v); }, //pF.parseDataMeasure(),
                                  "spacing");
        }
        parseLabelerAttribute(json.format,        labeler.formatter,     parseDataFormatter(axis.type()),              "formatter");
        parseLabelerAttribute(json.start,         labeler.start,         parseDataValue(axis.type()),                  "start");
        parseLabelerAttribute(json.angle,         labeler.angle,         undefined,                                    "angle");
        parseLabelerAttribute(json.position,      labeler.position,      parseJSONPoint,                               "position");
        parseLabelerAttribute(json.anchor,        labeler.anchor,        parseJSONPoint,                               "anchor");
        parseLabelerAttribute(json.densityfactor, labeler.densityfactor, undefined,                                    "densityfactor");
        parseLabelerAttribute(json.color,         labeler.color,         RGBColor.parse,                               "color");
        parseLabelerAttribute(json.visible,       labeler.visible,       pF.parseBoolean,                              "visible");

    }
    return labeler;
};

module.exports = Labeler;
