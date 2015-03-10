var PlotLegend = require('../../core/plot_legend.js');

PlotLegend.parseXML = function (xml, plot) {
    var legend           = new PlotLegend(),
        pF               = require('../../util/parsingFunctions.js'),
        Text             = require('../../core/text.js'),
        parseAttribute   = pF.parseAttribute,
        child;
    if (xml) {
        parseAttribute(pF.getXMLAttr(xml,"visible"), legend.visible, pF.parseBoolean);
        parseAttribute(pF.getXMLAttr(xml,"label"),   legend.label,   function (value) { return new Text(value); });
    }

    if (legend.label() === undefined) {
        // TODO: remove this ugly patch with something that works properly
        if (typeof(plot.variable)==="function" && plot.variable().size() >= 2) { 
            legend.label(new Text(plot.variable().at(1).id()));
        } else {
            legend.label(new Text("plot"));
        }
    }
    return legend;
};

module.exports = PlotLegend;
