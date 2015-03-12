/*global describe, it, beforeEach, expect, xit, jasmine */
/*jshint  laxbreak:true */

describe("Graph JSON parsing", function () {
    "use strict";

    var ArrayData = require('../../../src/core/array_data.js'),
        Axis = require('../../../src/core/axis.js'),
        Background = require('../../../src/core/background.js'),
        DataPlot = require('../../../src/core/data_plot.js'),
        Graph = require('../../../src/core/graph.js'),
        Legend = require('../../../src/core/legend.js'),
        Plotarea = require('../../../src/core/plotarea.js'),
        Title = require('../../../src/core/title.js'),
        Window = require('../../../src/core/window.js'),
        graph,
        json = {
            "window" : {
                "margin" : 1,
                "padding" : 10,
                "bordercolor" : "0x111223",
                "width" : 2,
                "height" : 97,
                "border" : 0 
            },
            "legend" : {
                "color" : "0x56839c",
                "bordercolor" : "0x941394",
                "base" : [-1,-1],
                "anchor" : [0,0],
                "position" : [0,0],
                "visible" : true,
                "frame" : "padding",
                "opacity" : 1,
                "border" : 10,
                "rows" : 4,
                "columns" : 3,
                "cornerradius" : 5,
                "padding" : 4,
                "icon" : {
                    "height" : 30,
                    "width" : 40,
                    "border" : 1 
                }
            },
            "background" : {
                "color" : "0x123456"
            },
            "plotarea" : {
                "margintop" : 5,
                "marginleft" : 10,
                "marginbottom" : 19,
                "marginright" : 5,
                "bordercolor" : "0x111223",
                "border" : 0 
            },
            "title" : {
                "color" : "0xfffaab",
                "bordercolor" : "0x127752",
                "border" : 2,
                "opacity" : 0,
                "padding" : 4,
                "cornerradius" : 10,
                "anchor" : [1,1],
                "base" : [0,0],
                "position" : [-1,1],
                "text" : 'Example title'
            },
            "horizontalaxis" : [
                {
                    "id" : "x",
                    "color" : "0x123456",
                    "type" : "number",
                    "pregap" : 2,
                    "postgap" : 4,
                    "anchor" : 1,
                    "min" : 0,
                    "minoffset" : 19,
                    "max" : 10,
                    "maxoffset" : 2,
                    "tickmin" : -3,
                    "tickmax" : 3,
                    "highlightstyle" : "bold",
                    "linewidth" : 1,
                    "length" : 1,
                    "position" : [1,1],
                    "base" : [1,-1],
                    "minposition" : 0,
                    "maxposition" : 1,
                    "labels" : {
                        "start" : 0,
                        "angle" : 0,
                        "format" : "%1d",
                        "anchor" : [0,0],
                        "position" : [0,0],
                        "spacing" : [10000,5000,2000,1000,500,200,100,50,20,10,5,2,1,0.1,0.01,0.001]
                    },
                    "grid" : {
                        "color": "0xeeeeee", "visible" : false
                    }
                },
                {
                    "id" : "x2",
                    "color" : "0x000000",
                    "type" : "number",
                    "pregap" : 2,
                    "postgap" : 4,
                    "anchor" : 1,
                    "min" : 0,
                    "minoffset" : 19,
                    "max" : 10,
                    "maxoffset" : 2,
                    "tickmin" : -3,
                    "tickmax" : 3,
                    "highlightstyle" : "bold",
                    "linewidth" : 1,
                    "length" : 1,
                    "position" : [1,1],
                    "base" : [1,-1],
                    "minposition" : -1,
                    "maxposition" : 1 
                }
            ],
            "verticalaxis" : [
                {
                    "id" : "y",
                    "color" : "0x123456",
                    "type" : "number",
                    "pregap" : 2,
                    "postgap" : 4,
                    "anchor" : 1,
                    "min" : 0,
                    "minoffset" : 19,
                    "max" : 10,
                    "maxoffset" : 2,
                    "tickmin" : -3,
                    "tickmax" : 3,
                    "highlightstyle" : "bold",
                    "linewidth" : 1,
                    "length" : "0.5-2",
                    "position" : [1,1],
                    "base" : [1,-1],
                    "minposition" : 1,
                    "maxposition" : 1,
                    "labels" : {
                        "start" : 0,
                        "angle" : 0,
                        "format" : "%1d",
                        "anchor" : [0,0],
                        "position" : [0,0],
                        "spacing" : [10000,5000,2000,1000,500,200,100,50,20,10,5,2,1,0.1,0.01,0.001]
                    },
                    "grid" : { 
                        "color" : "0xeeeeee", "visible" : false
                    }
                },
                {
                    "id" : "y2",
                    "color" : "0x123456",
                    "type" : "number",
                    "pregap" : 2,
                    "postgap" : 4,
                    "anchor" : 1,
                    "min" : 0,
                    "minoffset" : 19,
                    "max" : 10,
                    "maxoffset" : 2,
                    "tickmin" : -3,
                    "tickmax" : 3,
                    "highlightstyle" : "bold",
                    "linewidth" : 1,
                    "length" : "0.9+20",
                    "position" : [1,1],
                    "base" : [1,-1],
                    "minposition" : 1,
                    "maxposition" : 1 
                }
            ],
            "plot" : [
                {
                    "horizontalaxis" : {
                        "ref" : "x",
                        "variables" : [ "x" ]
                    },
                    "verticalaxis" : {
                        "ref" : "y",
                        "variables" : [ "y" ]
                    },
                    "legend" : {
                        "visible" : true,
                        "label" : "y"
                    }
                },
                {
                    "horizontalaxis" : {
                        "ref" : "x2",
                        "variables" : [ "x" ]
                    },
                    "verticalaxis" : {
                        "ref" : "y2",
                        "variables" : [ "y" ]
                    },
                    "legend" : {
                        "visible" : true,
                        "label" : "y"
                    }
                }
            ],
            "data" : {
                "variables" : [
                    { "id" : "x", "column": 0, "type": "number", "missingop": "eq" },
                    { "id" : "y", "column": 1, "type": "number", "missingop": "eq" }
                ],
                "values" : [
                    [3,4],
                    [5,6]
                ]
            }
        };

    var $, jqw = require('../../node_jquery_helper.js').createJQuery();
    beforeEach(function() { $ = jqw.$; });

    beforeEach(function () {
        require('../../../src/parser/json/graph.js')($);
    });

    beforeEach(function () {        
        graph = Graph.parseJSON(json);
    });

    it("should be able to parse a graph from JSON", function () {
        expect(graph).not.toBeUndefined();
        expect(graph instanceof Graph).toBe(true);
    });

    it("should properly parse a graph from JSON", function () {
        expect(graph.window() instanceof Window).toBe(true);
        expect(graph.legend() instanceof Legend).toBe(true);
        expect(graph.legend() instanceof Legend).toBe(true);
        expect(graph.plotarea() instanceof Plotarea).toBe(true);
        expect(graph.background() instanceof Background).toBe(true);
        expect(graph.title() instanceof Title).toBe(true);
        expect(graph.axes().size()).toEqual(4);
        expect(graph.axes().at(0) instanceof Axis).toBe(true);
        expect(graph.axes().at(0).orientation()).toEqual(Axis.HORIZONTAL);
        expect(graph.axes().at(1) instanceof Axis).toBe(true);
        expect(graph.axes().at(1).orientation()).toEqual(Axis.HORIZONTAL);
        expect(graph.axes().at(2) instanceof Axis).toBe(true);
        expect(graph.axes().at(2).orientation()).toEqual(Axis.VERTICAL);
        expect(graph.axes().at(3) instanceof Axis).toBe(true);
        expect(graph.axes().at(3).orientation()).toEqual(Axis.VERTICAL);
        expect(graph.plots().size()).toEqual(2);
        expect(graph.plots().at(0) instanceof DataPlot).toBe(true);
        expect(graph.plots().at(1) instanceof DataPlot).toBe(true);
        expect(graph.data().size()).toEqual(1);
        expect(graph.data().at(0) instanceof ArrayData).toBe(true);
    });

});
