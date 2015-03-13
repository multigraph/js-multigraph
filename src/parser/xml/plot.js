// This file uses jQuery.  A valid jQuery object must be passed to the
// function returned by requiring this file.
module.exports = function($) {
    var Plot = require('../../core/plot.js');

    // if parseXML method already has been defined, which would be the case if this
    // function was previously called, just return immediately
    if (typeof(Plot.parseXML)==="function") { return Plot; };

    // <plot>
    //   <legend
    //       visible="BOOLEAN"
    //       label="STRING">
    //   </legend>
    //   <horizontalaxis ref="STRING!">
    //     <variable ref="STRING!" />
    //   </horizontalaxis>
    //   <verticalaxis ref="STRING!">
    //     <variable ref="STRING" />
    //     <constant value="DATAVALUE"/>
    //   </verticalaxis>
    //   <renderer type="RENDERERTYPE(line)">
    //     <option name="STRING!" value="STRING!" min="DATAVALUE" max="DATAVALUE"/>
    //     <option name="STRING!" value="STRING!" min="DATAVALUE" max="DATAVALUE"/>
    //     ...
    //   </renderer>
    //   <datatips format="STRING!" bgcolor="COLOR" bgalpha="DOUBLE" border="INTEGER" bordercolor="COLOR" pad="INTEGER">
    //     <variable format="STRING!" />
    //     <variable format="STRING!" />
    //     ...
    //   </datatips>
    // </plot>
    Plot.parseXML = function (xml, graph, messageHandler) {
        var DataPlot     = require('../../core/data_plot.js'),
            PlotLegend   = require('../../core/plot_legend.js'),
            ConstantPlot = require('../../core/constant_plot.js'),
            DataValue    = require('../../core/data_value.js'),
            Renderer     = require('../../core/renderer.js'),
            Filter       = require('../../core/filter.js'),
            Datatips     = require('../../core/datatips.js'),
            pF           = require('../../util/parsingFunctions.js'),
            plot,
            haxis,
            vaxis,
            variable,
            attr, child;
        if (xml) {

            // populate verticalaxis from xml
            child = xml.find(">verticalaxis");
            if (child.length === 1 && pF.getXMLAttr(child,"ref") !== undefined) {
                if (graph) {
                    vaxis = graph.axisById(pF.getXMLAttr(child,"ref"));
                    if (vaxis === undefined) {
                        throw new Error("Plot Vertical Axis Error: The graph does not contain an axis with an id of '" + pF.getXMLAttr(child,"ref") + "'");
                    }
                }
            }

            child = xml.find("verticalaxis constant");
            if (child.length > 0) {
                var constantValueString = pF.getXMLAttr(child,"value");
                if (constantValueString === undefined) {
                    throw new Error("Constant Plot Error: A 'value' attribute is needed to define a Constant Plot");
                }
                plot = new ConstantPlot(DataValue.parse(vaxis.type(), constantValueString));
            } else {
                plot = new DataPlot();
            }

            plot.verticalaxis(vaxis);

            // populate horizontalaxis from xml
            child = xml.find(">horizontalaxis");
            if (child.length === 1 && pF.getXMLAttr(child,"ref") !== undefined) {
                if (graph) {
                    haxis = graph.axisById(pF.getXMLAttr(child,"ref"));
                    if (haxis !== undefined) {
                        plot.horizontalaxis(haxis);
                    } else {
                        throw new Error("Plot Horizontal Axis Error: The graph does not contain an axis with an id of '" + pF.getXMLAttr(child,"ref") + "'");
                    }
                }
            }

            // if this is a DataPlot, parse variables
            if (plot instanceof DataPlot) {

                // provide default horizontalaxis variable if not present in xml
                if (xml.find("horizontalaxis variable").length === 0) {
                    plot.variable().add(null);
                }
                //TODO: defer population of variables until normalizer has executed
                // populate axis variables from xml
                child = xml.find("horizontalaxis variable, verticalaxis variable");
                if (child.length > 0) {
                    if (graph) {
                        $.each(child, function (i, e) {
                            attr = pF.getXMLAttr($(e),"ref");
                            variable = graph.variableById( attr );
                            if (variable !== undefined) {
                                plot.data( variable.data() );
                                plot.variable().add(variable);
                            } else {
                                throw new Error("Plot Variable Error: No Data tag contains a variable with an id of '" + attr + "'");
                            }
                        });
                    }
                }
                }

            // populate legend from xml
            child = xml.find("legend");
            if (child.length > 0) {
                plot.legend(PlotLegend.parseXML(child, plot));
            } else {
                plot.legend(PlotLegend.parseXML(undefined, plot));
            }

            // populate renderer from xml
            child = xml.find("renderer");
            if (child.length > 0) {
                plot.renderer(Renderer.parseXML(child, plot, messageHandler));
            }

            // populate filter from xml
            child = xml.find("filter");
            if (child.length > 0) {
                plot.filter(Filter.parseXML(child));
            }

            // populate datatips from xml
            child = xml.find("datatips");
            if (child.length > 0) {
                plot.datatips(Datatips.parseXML(child));
            }

        }
        return plot;
    };

    return Plot;
};
