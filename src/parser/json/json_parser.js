// usage:
// 
//   A valid jQuery object must be passed to the function returned by requiring this file.
//
//      require('.../src/parser/json/json_parser.js')($);
//      var Multigraph = require('.../src/core/multigraph.js')($);
//      var m = Multigraph.parseJSON( {...} };
// 
//   where {...} is the JSON object to be parsed.
//
var included = false;
module.exports = function($) {
    if (included) { return; }
    included = true;

    require('./data.js')($);
    require('./graph.js')($);
    require('./multigraph.js')($);

    require('./axis.js');
    require('./axis_title.js');
    require('./background.js');
    require('./datatips.js');
    require('./data_variable.js');
    require('./filter.js');
    require('./filter_option.js');
    require('./grid.js');
    require('./icon.js');
    require('./img.js');
    require('./json_parser.js');
    require('./labeler.js');
    require('./legend.js');
    require('./pan.js');
    require('./plotarea.js');
    require('./plot.js');
    require('./plot_legend.js');
    require('./renderer.js');
    require('./title.js');
    require('./window.js');
    require('./zoom.js');
};
