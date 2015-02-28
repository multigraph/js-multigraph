var Grid = require('../core/grid.js');

Grid.parseXML = function (xml) {
    var grid             = new Grid(),
        RGBColor         = require('../math/rgb_color.js'),
        parsingFunctions = require('../util/parsingFunctions.js'),
        parseAttribute   = utilityFunctions.parseAttribute,
        attr;
    if (xml) {
        parseAttribute(xml.attr("color"), grid.color, RGBColor.parse);
        //NOTE: visible attribute should default to true when parsing, so that
        //      the presence of a <grid> tag at all will turn on a grid.  In
        //      the Grid object itself, though, the default for the visible
        //      attribute is false, so that when we create a default grid object
        //      in code (as opposed to parsing), it defaults to not visible.
        attr = xml.attr("visible");
        if (attr !== undefined) {
            grid.visible(parsingFunctions.parseBoolean(attr));
        } else {
            grid.visible(true);
        }
    }
    return grid;
};

module.exports = Grid;
