var Zoom = require('../../core/zoom.js');

Zoom.parseJSON = function (json, type) {
    var zoom             = new Zoom(),
        DataValue        = require('../../core/data_value.js'),
        DataMeasure      = require('../../core/data_measure.js'),
        pF               = require('../../util/parsingFunctions.js'),
        parseAttribute   = pF.parseAttribute,
        parseBoolean     = pF.parseBoolean,
        parseDataMeasure = function(v) { return DataMeasure.parse(type, v); }, //pF.parseDataMeasure
        attr;
    if (json) {
        parseAttribute(json.allowed, zoom.allowed, parseBoolean);
        parseAttribute(json.min,     zoom.min,     parseDataMeasure);
        parseAttribute(json.max,     zoom.max,     parseDataMeasure);
        attr = json.anchor;
        if (attr !== undefined) {
            if (typeof(attr) === "string" && attr.toLowerCase() === "none") {
                zoom.anchor(null);
            } else {
                zoom.anchor( DataValue.parse(type, attr) );
            }
        }
    }
    return zoom;
};

module.exports = Zoom;
