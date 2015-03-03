// This file uses jQuery.  A valid jQuery object must be passed to the
// function returned by requiring this file.
module.exports = function($) {
    var Datatips = require('../core/datatips.js');

    Datatips.parseXML = function (xml) {
        var datatips         = new Datatips(),
            RGBColor         = require('../math/rgb_color.js'),
            DatatipsVariable = require('../core/datatips_variable.js'),
            parsingFunctions = require('../util/parsingFunctions.js'),
            parseRGBColor    = RGBColor.parse,
            parseAttribute   = parsingFunctions.parseAttribute,
            parseInteger     = parsingFunctions.parseInteger,
            parseString      = parsingFunctions.parseString,
            child;
        if (xml) {
            child = xml.find("variable");
            if (child.length > 0) {
                $.each(child, function (i, e) {
                    datatips.variables().add( DatatipsVariable.parseXML($(e)) );
                });
            }
            
            parseAttribute(xml.attr("format"),      datatips.format,      parseString);
            parseAttribute(xml.attr("bgcolor"),     datatips.bgcolor,     parseRGBColor);
            parseAttribute(xml.attr("bgalpha"),     datatips.bgalpha,     parseString);
            parseAttribute(xml.attr("border"),      datatips.border,      parseInteger);
            parseAttribute(xml.attr("bordercolor"), datatips.bordercolor, parseRGBColor);
            parseAttribute(xml.attr("pad"),         datatips.pad,         parseInteger);
        }
        return datatips;
    };

    return Datatips;
};
