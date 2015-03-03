// usage:
// 
//   A valid jQuery object must be passed to the function returned by requiring this file.
//   That function returns a ParseXML object that can be used as follows:
//
//      var ParseXML = require('parse_xml.js')($);
//      ParseXML.stringToJQueryXMLObj(...);
//
module.exports = function($) {

    require('./axis.js')($);
    require('./data.js')($);
    require('./datatips.js')($);
    require('./filter.js')($);
    require('./graph.js')($);
    require('./multigraph.js')($);
    require('./plot.js')($);
    require('./renderer.js')($);

    require('./axis_title.js');
    require('./background.js');
    require('./datatips_variable.js');
    require('./data_variable.js');
    require('./filter_option.js');
    require('./grid.js');
    require('./icon.js');
    require('./img.js');
    require('./labeler.js');
    require('./legend.js');
    require('./pan.js');
    require('./plotarea.js');
    require('./plot_legend.js');
    require('./title.js');
    require('./window.js');
    require('./zoom.js');

    var JQueryXMLParser = {};

    JQueryXMLParser.stringToJQueryXMLObj = function (thingy) {
        if (typeof(thingy) !== "string") {
            return $(thingy);
        }
        var xml = $.parseXML(thingy);
        return $($(xml).children()[0]);
    };

    return JQueryXMLParser;
};
