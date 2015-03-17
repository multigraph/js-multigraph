var Datatips = require('../../core/datatips.js');

// "datatips" : {
//   "format"           : "STRING!",
//   "bgcolor"          : "COLOR",
//   "bgalpha"          : "DOUBLE",
//   "border"           : "INTEGER",
//   "bordercolor"      : "COLOR",
//   "pad"              : "INTEGER",
//   "variable-formats" : [ "STRING!", ... ]
// }
Datatips.parseJSON = function (json) {
    var datatips         = new Datatips(),
        RGBColor         = require('../../math/rgb_color.js'),
        DatatipsVariable = require('../../core/datatips_variable.js'),
        pF               = require('../../util/parsingFunctions.js'),
        uF               = require('../../util/utilityFunctions.js'),
        parseRGBColor    = RGBColor.parse,
        parseAttribute   = pF.parseAttribute,
        parseInteger     = pF.parseInteger,
        child;
    if (json) {
        if (json["variable-formats"]) {
            json["variable-formats"].forEach(function(fmt) {
                var dtv = new DatatipsVariable();
                dtv.formatString(fmt);
                datatips.variables().add(dtv);
            });
        }
        
        parseAttribute(json.format,      datatips.formatString);
        parseAttribute(json.bgcolor,     datatips.bgcolor,     parseRGBColor);
        parseAttribute(json.bgalpha,     datatips.bgalpha);
        parseAttribute(json.border,      datatips.border);
        parseAttribute(json.bordercolor, datatips.bordercolor, parseRGBColor);
        parseAttribute(json.pad,         datatips.pad);
    }
    return datatips;
};

module.exports = Datatips;
