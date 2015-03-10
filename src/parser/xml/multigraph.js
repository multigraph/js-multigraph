// This file uses jQuery.  A valid jQuery object must be passed to the
// function returned by requiring this file.
module.exports = function($) {
    var Multigraph = require('../../core/multigraph.js')($);

    // if parseXML method already has been defined, which would be the case if this
    // function was previously called, just return immediately
    if (typeof(Multigraph.parseXML)==="function") { return Multigraph; };

    Multigraph.parseXML = function (xml, mugl, messageHandler) {
        var multigraph = new Multigraph(),
            graphs     = multigraph.graphs(),
            Graph      = require('../../core/graph.js'),
            child;
        multigraph.mugl(mugl); // set the mugl url
        if (xml) {
            child = xml.find(">graph");
            if (child.length > 0) {
                $.each(child, function (i, e) {
                    graphs.add( Graph.parseXML($(e), multigraph, messageHandler) );
                });
            } else if (child.length === 0 && xml.children().length > 0) {
                graphs.add( Graph.parseXML(xml, multigraph, messageHandler) );
            }
        }
        return multigraph;
    };

    return Multigraph;
};
