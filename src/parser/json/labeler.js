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
//
// Feature added 2015-12-16:
//   The "format" attribute (for an axis of type number only) can be an
//   array of strings to be displayed for the values 0..L-1 where L is the
//   number of strings in the array.  For example:
//        "format": ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov"]
//   would cause "Jan" to be rendered as the label for value 0, "Feb" for value 1,
//   and so on.  There is currently no way to customize the association between numerical
//   values and strings -- it's hardcoded to be the integers starting with 0.

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
        CategoryFormatter = require('../../core/category_formatter.js'),
        pF = require('../../util/parsingFunctions.js'),
        vF = require('../../util/validationFunctions.js'),
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

        if (vF.typeOf(json.format) === "array") {
            parseLabelerAttribute(json.format,    labeler.formatter,     function(format) {
                return new CategoryFormatter(json.format);
            }, undefined);
        } else {
            parseLabelerAttribute(json.format,        labeler.formatter,     parseDataFormatter(axis.type()),          "formatter");
        }

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
