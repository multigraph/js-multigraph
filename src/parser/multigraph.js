var Multigraph = require('../core/multigraph.js');

Multigraph.parseXML = function (xml, mugl, messageHandler) {
    var multigraph = new Multigraph(),
        graphs     = multigraph.graphs(),
        Graph      = require('../core/graph.js'),
        $          = require('jquery'),
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

module.exports = Multigraph;
