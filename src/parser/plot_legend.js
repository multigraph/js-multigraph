var PlotLegend = require('../core/plot_legend.js');

PlotLegend.parseXML = function (xml, plot) {
    var legend           = new PlotLegend(),
        parsingFunctions = require('../util/parsingFunctions.js'),
        Text             = require('../core/text.js'),
        parseAttribute   = parsingFunctions.parseAttribute,
        child;
    if (xml) {
        parseAttribute(xml.attr("visible"), legend.visible, parsingFunctions.parseBoolean);
        parseAttribute(xml.attr("label"),   legend.label,   function (value) { return new Text(value); });
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
