var _INCLUDED = false;

module.exports = function($, window, errorHandler) {
    if (!_INCLUDED) {
        require('./draggable/graph.js')($, window, errorHandler);
        require('./touch/graph.js')($, window, errorHandler);
        require('./touch/multigraph.js')($, window, errorHandler);
        require('./mouse/graph.js')($, window, errorHandler);
        require('./mouse/multigraph.js')($, window, errorHandler);
        require('./multigraph.js')($, window, errorHandler);
        _INCLUDED = true;
    }
};
