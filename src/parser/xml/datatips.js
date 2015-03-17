
// This file uses jQuery.  A valid jQuery object must be passed to the
// function returned by requiring this file.
module.exports = function($) {
    var Datatips = require('../../core/datatips.js');

    // if parseXML method already has been defined, which would be the case if this
    // function was previously called, just return immediately
    if (typeof(Datatips.parseXML)==="function") { return Datatips; };

    // <datatips
    //   format="STRING!"
    //   bgcolor="COLOR"
    //   bgalpha="DOUBLE"
    //   border="INTEGER"
    //   bordercolor="COLOR"
    //   pad="INTEGER">
    //   <variable
    //     format="STRING!">
    //   </variable>
    // </datatips>
    Datatips.parseXML = function (xml) {
        var datatips         = new Datatips(),
            RGBColor         = require('../../math/rgb_color.js'),
            DatatipsVariable = require('../../core/datatips_variable.js'),
            pF = require('../../util/parsingFunctions.js'),
            parseRGBColor    = RGBColor.parse,
            parseAttribute   = pF.parseAttribute,
            parseInteger     = pF.parseInteger,
            child;
        if (xml) {
            child = xml.find("variable");
            if (child.length > 0) {
                $.each(child, function (i, e) {
                    datatips.variables().add( DatatipsVariable.parseXML($(e)) );
                });
            }
            
            parseAttribute(pF.getXMLAttr(xml,"format"),      datatips.formatString);
            parseAttribute(pF.getXMLAttr(xml,"bgcolor"),     datatips.bgcolor,     parseRGBColor);
            parseAttribute(pF.getXMLAttr(xml,"bgalpha"),     datatips.bgalpha,     parseFloat);
            parseAttribute(pF.getXMLAttr(xml,"border"),      datatips.border,      parseInteger);
            parseAttribute(pF.getXMLAttr(xml,"bordercolor"), datatips.bordercolor, parseRGBColor);
            parseAttribute(pF.getXMLAttr(xml,"pad"),         datatips.pad,         parseInteger);
        }
        return datatips;
    };

    return Datatips;
};
