// This file uses jQuery.  A valid jQuery object must be passed to the
// function returned by requiring this file.
module.exports = function($) {
    var Multigraph = require('../../core/multigraph.js')($);

    // if parseJSON method already has been defined, which would be the case if this
    // function was previously called, just return immediately
    if (typeof(Multigraph.parseJSON)==="function") { return Multigraph; };

    Multigraph.parseJSON = function (json, mugl, messageHandler) {
        var multigraph = new Multigraph(),
            graphs     = multigraph.graphs(),
            Graph      = require('../../core/graph.js'),
            vF         = require('../../util/validationFunctions.js');

        require('./graph.js')($); // for Graph.parseJSON below

        multigraph.mugl(mugl); // set the mugl url
        if (json) {
            if (vF.typeOf(json) === 'array') {
                json.forEach(function(graph) {
                    graphs.add( Graph.parseJSON(graph, multigraph, messageHandler) );
                });
            } else {
                graphs.add( Graph.parseJSON(json, multigraph, messageHandler) );
            }
        }
        return multigraph;
    };

    return Multigraph;
};
