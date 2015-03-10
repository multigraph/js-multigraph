/*global describe, it, beforeEach, expect, xit, jasmine */
/*jshint laxbreak:true */

describe("PlotLegend XML parsing", function () {
    "use strict";

    var PlotLegend = require('../../../src/core/plot_legend.js'),
        DataPlot = require('../../../src/core/data_plot.js'),
        Text = require('../../../src/core/text.js'),
        xmlString,
        $xml,
        legend,
        visibleBool = true,
        labelString = "curly";

    var $, jqw = require('../../node_jquery_helper.js').createJQuery();
    beforeEach(function() { $ = jqw.$; });

    var JQueryXMLParser;
    beforeEach(function () {
        JQueryXMLParser = require('../../../src/parser/xml/jquery_xml_parser.js')($);
    });

    beforeEach(function () {
        xmlString = ''
            + '<legend'
            +     ' visible="' + visibleBool + '"'
            +     ' label="' + labelString + '"'
            +     '/>';
        $xml = JQueryXMLParser.stringToJQueryXMLObj(xmlString);
        legend = PlotLegend.parseXML($xml, new DataPlot());
    });

    it("should be able to parse a legend from XML", function () {
        expect(legend).not.toBeUndefined();
        expect(legend instanceof PlotLegend).toBe(true);
    });

    it("should be able to parse a legend from XML and read its 'visible' attribute", function () {
        expect(legend.visible()).toEqual(visibleBool);
    });

    it("should be able to parse a legend from XML and read its 'label' attribute", function () {
        expect(legend.label().string()).toEqual((new Text(labelString)).string());
    });

});
