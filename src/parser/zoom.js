var Zoom = require('../core/zoom.js');

Zoom.parseXML = function (xml, type) {
    var zoom             = new Zoom(),
        DataValue        = require('../core/data_value.js'),
        parsingFunctions = require('../util/parsingFunctions.js'),
        parseAttribute   = parsingFunctions.parseAttribute,
        parseDataMeasure = parsingFunctions.parseDataMeasure,
        attr;
    if (xml) {
        parseAttribute(xml.attr("allowed"), zoom.allowed, parsingFunctions.parseBoolean);
        parseAttribute(xml.attr("min"),     zoom.min,     parseDataMeasure(type));
        parseAttribute(xml.attr("max"),     zoom.max,     parseDataMeasure(type));
        attr = xml.attr("anchor");
        if (attr !== undefined) {
            if (attr.toLowerCase() === "none") {
                zoom.anchor(null);
            } else {
                zoom.anchor( DataValue.parse(type, attr) );
            }
        }
    }
    return zoom;
};

module.exports = Zoom;
