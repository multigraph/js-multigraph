/*global describe, it, beforeEach, expect, xit, jasmine */
/*jshint laxbreak:true */

describe("Multigraph JSON parsing", function () {
    "use strict";

    var ArrayData = require('../../../src/core/array_data.js'),
        Axis = require('../../../src/core/axis.js'),
        Background = require('../../../src/core/background.js'),
        DataPlot = require('../../../src/core/data_plot.js'),
        Graph = require('../../../src/core/graph.js'),
        Icon = require('../../../src/core/icon.js'),
        Legend = require('../../../src/core/legend.js'),
        Multigraph,
        Plotarea = require('../../../src/core/plotarea.js'),
        Title = require('../../../src/core/title.js'),
        Window = require('../../../src/core/window.js'),
        mg,
        json;

    var $, jqw = require('../../node_jquery_helper.js').createJQuery();
    beforeEach(function() { $ = jqw.$; });

    beforeEach(function () {
        Multigraph = require('../../../src/core/multigraph.js')($);
        require('../../../src/parser/json/multigraph.js')($);
    });

    describe("with graph subtags", function () {
        beforeEach(function () {
            json = [
                {
                    "window" : {
                        "margin" : 2,
                        "padding" : 5,
                        "bordercolor" : "0x000000",
                        "border" : 2
                    },
                    "legend" : {
                        "color" : "0x56839c",
                        "bordercolor" : "0x941394",
                        "base" : [-1,-1],
                        "anchor" : [0,0],
                        "position" : [0,0],
                        "visible" : "true",
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
                        "text" : "graph title"
                    },
                    "horizontalaxis" : [
                        {
                            "color" : "0x123456",
                            "id" : "x",
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
                            "minposition" : [-0.9],
                            "maxposition" : 0.6,
                            "labels" : {
                                "start" : 0,
                                "angle" : 0,
                                "format" : "%1d",
                                "anchor" : [0,0],
                                "position" : [0,0],
                                "spacing" : [10000,5000,2000,1000,500,200,100,50,20,10,5,2,1,0.1,0.01,0.001]
                            },
                            "grid" : { "color" : "0xeeeeee",  "visible" : false }
                        },
                        {
                            "color" : "0x123456",
                            "id" : "x2",
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
                            "minposition" : 0.1,
                            "maxposition" : 0.3,
                            "labels" : {
                                "start" : 0,
                                "angle" : 0,
                                "format" : "%1d",
                                "anchor" : [0,0],
                                "position" : [0,0],
                                "spacing" : [10000,5000,2000,1000,500,200,100,50,20,10,5,2,1,0.1,0.01,0.001]
                            },
                            "grid" : { "color" : "0xeeeeee",  "visible" : false }
                        }
                    ],
                    "verticalaxis" : [
                        {
                            "color" : "0x000000",
                            "id" : "y",
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
                            "minposition" : 0.2,
                            "maxposition" : 0.4,
                            "labels" : {
                                "start" : 0,
                                "angle" : 0,
                                "format" : "%1d",
                                "anchor" : [0,0],
                                "position" : [0,0],
                                "spacing" : [10000,5000,2000,1000,500,200,100,50,20,10,5,2,1,0.1,0.01,0.001]
                            },
                            "grid" : { "color" : "0xeeeeee",  "visible" : false }
                        },
                        {
                            "color" : "0x1aa456",
                            "id" : "y2",
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
                            "minposition" : -0.34,
                            "maxposition" : 0.87,
                            "labels" : {
                                "start" : 0,
                                "angle" : 0,
                                "format" : "%1d",
                                "anchor" : [0,0],
                                "position" : [0,0],
                                "spacing" : [10000,5000,2000,1000,500,200,100,50,20,10,5,2,1,0.1,0.01,0.001]
                            },
                            "grid" : { "color" : "0xeeeeee",  "visible" : false }
                        }
                    ],
                    "data" : {
                        "variables" : [
                            { "id": "x", "column": 0, "type": "number", "missingvalue": -9000, "missingop": "le" },
                            { "id": "y", "column": 1, "type": "number", "missingvalue": -9000, "missingop": "le" }
                        ],
                        "values" : [
                            [1,2],
                            [3,4],
                            [5,6]
                        ]
                    }
                },
                {
                    "window" : {
                        "margin" : 2,
                        "padding" : 5,
                        "bordercolor" : "0x000000",
                        "border" : 2
                    },
                    "legend" : {
                        "color" : "0x56839c",
                        "bordercolor" : "0x941394",
                        "base" : [-1,-1],
                        "anchor" : [0,0],
                        "position" : [0,0],
                        "visible" : "true",
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
                        "bordercolor" : "0x127752",
                        "border" : 2,
                        "opacity" : 0,
                        "padding" : 4,
                        "cornerradius" : 10,
                        "anchor" : [1,1],
                        "base" : [0,0],
                        "position" : [-1,1],
                        "text" : "graph title"
                    },
                    "horizontalaxis" : [
                        {
                            "color" : "0x123456",
                            "id" : "x",
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
                            "minposition" : 0.14567,
                            "maxposition" : 0.2,
                            "labels" : {
                                "start" : 0,
                                "angle" : 0,
                                "format" : "%1d",
                                "anchor" : [0,0],
                                "position" : [0,0],
                                "spacing" : [10000,5000,2000,1000,500,200,100,50,20,10,5,2,1,0.1,0.01,0.001]
                            },
                            "grid" : { "color" : "0xeeeeee",  "visible" : false }
                        },
                        {
                            "color" : "0x1234bb",
                            "id" : "x2",
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
                            "minposition" : 0.3,
                            "maxposition" : 0.4,
                            "labels" : {
                                "start" : 0,
                                "angle" : 0,
                                "format" : "%1d",
                                "anchor" : [0,0],
                                "position" : [0,0],
                                "spacing" : [10000,5000,2000,1000,500,200,100,50,20,10,5,2,1,0.1,0.01,0.001]
                            },
                            "grid" : { "color" : "0xeeeeee",  "visible" : false }
                        }
                    ],
                    "verticalaxis" : [
                        {
                            "color" : "0x123456",
                            "id" : "y",
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
                            "grid" : { "color" : "0xeeeeee",  "visible" : false }
                        },
                        {
                            "color" : "0xa23ff6",
                            "id" : "y2",
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
                            "minposition" : -0.34,
                            "maxposition" : 0.98,
                            "labels" : {
                                "start" : 0,
                                "angle" : 0,
                                "format" : "%1d",
                                "anchor" : [0,0],
                                "position" : [0,0],
                                "spacing" : [10000,5000,2000,1000,500,200,100,50,20,10,5,2,1,0.1,0.01,0.001]
                            },
                            "grid" : { "color" : "0xeeeeee",  "visible" : false }
                        }
                    ],
                    "data" : {
                        "variables" : [
                            { "id": "x", "column": 0, "type": "number", "missingvalue": -9000, "missingop": "le" },
                            { "id": "y", "column": 1, "type": "number", "missingvalue": -9000, "missingop": "le" }
                        ],
                        "values" : [
                            [1,2],
                            [3,4],
                            [5,6]
                        ]
                    }
                }
            ];

            mg = Multigraph.parseJSON(json);
        });

        it("should be able to parse a multigraph from JSON", function () {
            expect(mg).not.toBeUndefined();
            expect(mg instanceof Multigraph).toBe(true);
        });

        it("should properly parse a multigraph from JSON", function () {
            expect(mg.graphs().size()).toEqual(2);

            expect(mg.graphs().at(0) instanceof Graph).toBe(true);
            expect(mg.graphs().at(0).window() instanceof Window).toBe(true);
            expect(mg.graphs().at(0).legend() instanceof Legend).toBe(true);
            expect(mg.graphs().at(0).legend().icon() instanceof Icon).toBe(true);
            expect(mg.graphs().at(0).background() instanceof Background).toBe(true);
            expect(mg.graphs().at(0).plotarea() instanceof Plotarea).toBe(true);
            expect(mg.graphs().at(0).axes().size()).toEqual(4);
            expect(mg.graphs().at(0).axes().at(0) instanceof Axis).toBe(true);
            expect(mg.graphs().at(0).axes().at(0).orientation()).toEqual(Axis.HORIZONTAL);
            expect(mg.graphs().at(0).axes().at(1) instanceof Axis).toBe(true);
            expect(mg.graphs().at(0).axes().at(1).orientation()).toEqual(Axis.HORIZONTAL);
            expect(mg.graphs().at(0).axes().at(2) instanceof Axis).toBe(true);
            expect(mg.graphs().at(0).axes().at(2).orientation()).toEqual(Axis.VERTICAL);
            expect(mg.graphs().at(0).axes().at(3) instanceof Axis).toBe(true);
            expect(mg.graphs().at(0).axes().at(3).orientation()).toEqual(Axis.VERTICAL);
            expect(mg.graphs().at(0).data().size()).toEqual(1);
            expect(mg.graphs().at(0).data().at(0) instanceof ArrayData).toBe(true);

            expect(mg.graphs().at(1) instanceof Graph).toBe(true);
            expect(mg.graphs().at(1).window() instanceof Window).toBe(true);
            expect(mg.graphs().at(1).legend() instanceof Legend).toBe(true);
            expect(mg.graphs().at(1).legend().icon() instanceof Icon).toBe(true);
            expect(mg.graphs().at(1).background() instanceof Background).toBe(true);
            expect(mg.graphs().at(1).plotarea() instanceof Plotarea).toBe(true);
            expect(mg.graphs().at(1).axes().size()).toEqual(4);
            expect(mg.graphs().at(1).axes().at(0) instanceof Axis).toBe(true);
            expect(mg.graphs().at(1).axes().at(0).orientation()).toEqual(Axis.HORIZONTAL);
            expect(mg.graphs().at(1).axes().at(1) instanceof Axis).toBe(true);
            expect(mg.graphs().at(1).axes().at(1).orientation()).toEqual(Axis.HORIZONTAL);
            expect(mg.graphs().at(1).axes().at(2) instanceof Axis).toBe(true);
            expect(mg.graphs().at(1).axes().at(2).orientation()).toEqual(Axis.VERTICAL);
            expect(mg.graphs().at(1).axes().at(3) instanceof Axis).toBe(true);
            expect(mg.graphs().at(1).axes().at(3).orientation()).toEqual(Axis.VERTICAL);
            expect(mg.graphs().at(1).data().size()).toEqual(1);
            expect(mg.graphs().at(1).data().at(0) instanceof ArrayData).toBe(true);
        });

    });

    describe("without graph subtags", function () {
        beforeEach(function () {
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
                    "visible" : "true",
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
                    },
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
                    "text" : "Graph Title"
                },
                "horizontalaxis" : [
                    {
                        "color" : "0x123456",
                        "id" : "x",
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
                        "minposition" : -0.123,
                        "maxposition" : 0.324,
                        "labels" : {
                            "start" : 0,
                            "angle" : 0,
                            "format" : "%1d",
                            "anchor" : [0,0],
                            "position" : [0,0],
                            "spacing" : [10000,5000,2000,1000,500,200,100,50,20,10,5,2,1,0.1,0.01,0.001]
                        },
                        "grid" : { "color" : "0xeeeeee",  "visible" : false }
                    },
                    {
                        "color" : "0x000000",
                        "id" : "x2",
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
                        "minposition" : -0.8,
                        "maxposition" : 0.953,
                        "labels" : {
                            "start" : 0,
                            "angle" : 0,
                            "format" : "%1d",
                            "anchor" : [0,0],
                            "position" : [0,0],
                            "spacing" : [10000,5000,2000,1000,500,200,100,50,20,10,5,2,1,0.1,0.01,0.001]
                        },
                        "grid" : { "color" : "0xeeeeee",  "visible" : false }
                    }
                ],
                "verticalaxis" : [
                    {
                        "color" : "0x123456",
                        "id" : "y",
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
                        "minposition" : 0.1,
                        "maxposition" : 0.9,
                        "labels" : {
                            "start" : 0,
                            "angle" : 0,
                            "format" : "%1d",
                            "anchor" : [0,0],
                            "position" : [0,0],
                            "spacing" : [10000,5000,2000,1000,500,200,100,50,20,10,5,2,1,0.1,0.01,0.001]
                        },
                        "grid" : { "color" : "0xeeeeee",  "visible" : false }
                    },
                    {
                        "color" : "0x123456",
                        "id" : "y2",
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
                        "minposition" : -0.3,
                        "maxposition" : 1,
                        "labels" : {
                            "start" : 0,
                            "angle" : 0,
                            "format" : "%1d",
                            "anchor" : [0,0],
                            "position" : [0,0],
                            "spacing" : [10000,5000,2000,1000,500,200,100,50,20,10,5,2,1,0.1,0.01,0.001]
                        },
                        "grid" : { "color" : "0xeeeeee",  "visible" : false }
                    },
                    {
                        "color" : "0x123456",
                        "id" : "y3",
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
                        "minposition" : 0.1,
                        "maxposition" : 0.9,
                        "labels" : {
                            "start" : 0,
                            "angle" : 0,
                            "format" : "%1d",
                            "anchor" : [0,0],
                            "position" : [0,0],
                            "spacing" : [10000,5000,2000,1000,500,200,100,50,20,10,5,2,1,0.1,0.01,0.001]
                        },
                        "grid" : { "color" : "0xeeeeee",  "visible" : false }
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
                            "visible" : "true",
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
                            "visible" : "true",
                            "label" : "y"
                        }
                    }
                ],
                "data" : {
                    "variables" : [
                        { "id": "x", "column": 0, "type": "number", "missingvalue": -9000, "missingop": "le" },
                        { "id": "y", "column": 1, "type": "number", "missingvalue": -9000, "missingop": "le" }
                    ],
                    "values" : [
                        [1,2],
                        [3,4],
                        [5,6]
                    ]
                }
            },

            mg = Multigraph.parseJSON(json);
        });

        it("should be able to parse a multigraph from JSON", function () {
            expect(mg).not.toBeUndefined();
            expect(mg instanceof Multigraph).toBe(true);
        });

        it("should properly parse a multigraph from JSON", function () {
            expect(mg.graphs().size()).toEqual(1);

            expect(mg.graphs().at(0) instanceof Graph).toBe(true);
            expect(mg.graphs().at(0).window() instanceof Window).toBe(true);
            expect(mg.graphs().at(0).legend() instanceof Legend).toBe(true);
            expect(mg.graphs().at(0).legend().icon() instanceof Icon).toBe(true);
            expect(mg.graphs().at(0).background() instanceof Background).toBe(true);
            expect(mg.graphs().at(0).plotarea() instanceof Plotarea).toBe(true);
            expect(mg.graphs().at(0).axes().size()).toEqual(5);
            expect(mg.graphs().at(0).axes().at(0) instanceof Axis).toBe(true);
            expect(mg.graphs().at(0).axes().at(0).orientation()).toEqual(Axis.HORIZONTAL);
            expect(mg.graphs().at(0).axes().at(1) instanceof Axis).toBe(true);
            expect(mg.graphs().at(0).axes().at(1).orientation()).toEqual(Axis.HORIZONTAL);
            expect(mg.graphs().at(0).axes().at(2) instanceof Axis).toBe(true);
            expect(mg.graphs().at(0).axes().at(2).orientation()).toEqual(Axis.VERTICAL);
            expect(mg.graphs().at(0).axes().at(3) instanceof Axis).toBe(true);
            expect(mg.graphs().at(0).axes().at(3).orientation()).toEqual(Axis.VERTICAL);
            expect(mg.graphs().at(0).axes().at(4) instanceof Axis).toBe(true);
            expect(mg.graphs().at(0).axes().at(4).orientation()).toEqual(Axis.VERTICAL);
            expect(mg.graphs().at(0).plots().size()).toEqual(2);
            expect(mg.graphs().at(0).plots().at(0) instanceof DataPlot).toBe(true);
            expect(mg.graphs().at(0).plots().at(1) instanceof DataPlot).toBe(true);
            expect(mg.graphs().at(0).data().size()).toEqual(1);
            expect(mg.graphs().at(0).data().at(0) instanceof ArrayData).toBe(true);
        });

    });

});
