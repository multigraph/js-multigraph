var Grid = require('../../core/grid.js');

// "grid": { "color": "#ff00ff", visible: true }
Grid.parseJSON = function (json) {
    var grid             = new Grid(),
        RGBColor         = require('../../math/rgb_color.js'),
        parseAttribute   = require('../../util/parsingFunctions.js').parseAttribute,
        attr;
    if (json) {
        parseAttribute(json.color, grid.color, RGBColor.parse);
        //NOTE: visible attribute should default to true when parsing, so that
        //      the presence of a "grid" property at all will turn on a grid.  In
        //      the Grid object itself, though, the default for the visible
        //      attribute is false, so that when we create a default grid object
        //      in code (as opposed to parsing), it defaults to not visible.
        attr = json.visible;
        if (attr !== undefined) {
            grid.visible(attr);
        } else {
            grid.visible(true);
        }
    }
    return grid;
};

module.exports = Grid;
