var Zoom = require('../../core/zoom.js');

Zoom.parseXML = function (xml, type) {
    var zoom             = new Zoom(),
        DataValue        = require('../../core/data_value.js'),
        DataMeasure      = require('../../core/data_measure.js'),
        pF               = require('../../util/parsingFunctions.js'),
        parseAttribute   = pF.parseAttribute,
        parseDataMeasure = function(v) { return DataMeasure.parse(type, v); }, //pF.parseDataMeasure
        attr;
    if (xml) {
        parseAttribute(pF.getXMLAttr(xml,"allowed"), zoom.allowed, pF.parseBoolean);
        parseAttribute(pF.getXMLAttr(xml,"min"),     zoom.min,     parseDataMeasure);
        parseAttribute(pF.getXMLAttr(xml,"max"),     zoom.max,     parseDataMeasure);
        attr = pF.getXMLAttr(xml,"anchor");
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
