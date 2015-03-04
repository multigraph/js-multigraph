var _INCLUDED = false;
module.exports = function($, window) {
    if (_INCLUDED) { return; }
    _INCLUDED = true;

    require('./multigraph.js')($, window);

    require('./axis.js')();
    require('./axis_title.js')();
    require('./background.js')();
    require('./graph.js')();
    require('./graph_title.js')();
    require('./icon.js')();
    require('./img.js')();
    require('./labeler.js')();
    require('./legend.js')();
    require('./plotarea.js')();
    require('./renderers/band_renderer.js')();
    require('./renderers/bar_renderer.js')();
    require('./renderers/fill_renderer.js')();
    require('./renderers/pointline_renderer.js')();
    require('./renderers/rangebar_renderer.js')();
    require('./text.js')();
    require('./window.js')();
};
