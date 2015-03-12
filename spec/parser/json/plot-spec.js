/*global describe, it, beforeEach, expect, xit, jasmine */
/*jshint laxbreak:true */

describe("DataPlot JSON parsing", function () {
    "use strict";

    var Plot = require('../../../src/core/plot.js'),
        DataPlot = require('../../../src/core/data_plot.js'),
        Graph = require('../../../src/core/graph.js'),
        Axis = require('../../../src/core/axis.js'),
        Data = require('../../../src/core/data.js'),
        ArrayData = require('../../../src/core/array_data.js'),
        Datatips = require('../../../src/core/datatips.js'),
        DatatipsVariable = require('../../../src/core/datatips_variable.js'),
        DataVariable = require('../../../src/core/data_variable.js'),
        Filter = require('../../../src/core/filter.js'),
        FilterOption = require('../../../src/core/filter_option.js'),
        PlotLegend = require('../../../src/core/plot_legend.js'),
        Renderer = require('../../../src/core/renderer.js'),
        RendererOption = require('../../../src/core/renderer.js').Option,
        Text = require('../../../src/core/text.js'),
        RGBColor = require('../../../src/math/rgb_color.js'),
        plot,
        graph,
        haxis,
        vaxis,
        variable1,
        variable2,
        variable3,
        json;

    require('../../../src/parser/json/plot.js');

    describe("Axis parsing", function () {

        var horizontalaxisId = "x",
            verticalaxisId = "y";

        beforeEach(function () {
            graph = new Graph();
            graph.axes().add((new Axis(Axis.HORIZONTAL)).id(horizontalaxisId));
            graph.axes().add((new Axis(Axis.VERTICAL)).id(verticalaxisId));
        });

        it("should be able to parse a plot with axis children from JSON", function () {
            json = {
                "horizontalaxis" : {
                    "ref" : horizontalaxisId
                },
                "verticalaxis" : {
                    "ref" : verticalaxisId
                }
            };
            plot = Plot.parseJSON(json, graph);

            expect(plot).not.toBeUndefined();
            expect(plot instanceof DataPlot).toBe(true);
            expect(plot.horizontalaxis() instanceof Axis).toBe(true);
            expect(plot.horizontalaxis().id()).toEqual(horizontalaxisId);
            expect(plot.verticalaxis() instanceof Axis).toBe(true);
            expect(plot.verticalaxis().id()).toEqual(verticalaxisId);
        });

        it("should throw an error if an axis with the ref's id is not in the graph", function () {
            json = { "horizontalaxis" : { "ref": "x2" }, "verticalaxis": { "ref": "y" } };
            expect( function () {
                Plot.parseJSON(json, graph);
            }).toThrow(new Error("Plot Horizontal Axis Error: The graph does not contain an axis with an id of 'x2'"));
        });

    });

    describe("DataVariable parsing", function () {

        var variable1Id = "x",
            variable2Id = "y",
            variable3Id = "y1",
            missingVariableId = "y3";

        beforeEach(function () {
            graph = new Graph();
            variable1 = (new DataVariable(variable1Id)).column(1);
            variable2 = (new DataVariable(variable2Id)).column(2);
            variable3 = (new DataVariable(variable3Id)).column(3);
            graph.axes().add(new Axis(Axis.HORIZONTAL));
            graph.axes().add(new Axis(Axis.VERTICAL));
            graph.data().add(new ArrayData([variable1,variable2,variable3], []));
        });

        it("should be able to parse a plot with variable children from JSON", function () {
            json = {
                "horizontalaxis" : {
                    "variables" : [ variable1Id ]
                },
                "verticalaxis" : {
                    "variables" : [variable2Id, variable3Id]
                }
            };
            plot = Plot.parseJSON(json, graph);
            expect(plot).not.toBeUndefined();
            expect(plot instanceof DataPlot).toBe(true);
            expect(plot.variable().size()).toEqual(3);
            expect(plot.variable().at(0) instanceof DataVariable).toBe(true);
            expect(plot.variable().at(0)).toBe(variable1);
            expect(plot.variable().at(1) instanceof DataVariable).toBe(true);
            expect(plot.variable().at(1)).toBe(variable2);
            expect(plot.variable().at(2) instanceof DataVariable).toBe(true);
            expect(plot.variable().at(2)).toBe(variable3);
        });

        it("should throw an error if a variable with the ref's id is not in the graph", function () {
            json = {
                "horizontalaxis" : {
                    "variables" : [ variable1Id ]
                },
                "verticalaxis" : {
                    "variables" : [missingVariableId, variable3Id ]
                }
            };
            expect( function () {
                Plot.parseJSON(json, graph);
            }).toThrow(new Error("Plot Variable Error: No Data tag contains a variable with an id of '" + missingVariableId + "'"));
        });

    });

    describe("PlotLegend parsing", function () {
        var visibleBool = true,
            label = "curly";

        it("should be able to parse a plot with a PlotLegend child from JSON", function () {
            json = {
                "legend" : {
                    "visible" : visibleBool,
                    "label" : label
                }
            };
            plot = Plot.parseJSON(json);
            expect(plot).not.toBeUndefined();
            expect(plot instanceof DataPlot).toBe(true);
            expect(plot.legend() instanceof PlotLegend).toBe(true);
            expect(plot.legend().visible()).toEqual(visibleBool);
            expect(plot.legend().label().string()).toEqual((new Text(label)).string());
        });

    });

    describe("Renderer parsing", function () {

        var rendererType = "pointline",
            rendererOption1Name = "pointsize",
            rendererOption2Name = "pointshape",
            rendererOption3Name = "linewidth";

        it("should be able to parse a plot with a Renderer child from JSON", function () {
            json = {
                "renderer" : {
                    "type" : rendererType
                }
            };
            plot = Plot.parseJSON(json);
            expect(plot).not.toBeUndefined();
            expect(plot instanceof DataPlot).toBe(true);
            expect(plot.renderer() instanceof Renderer).toBe(true);
            expect(plot.renderer().type()).toEqual(Renderer.Type.parse(rendererType));
        });

        it("should be able to parse a plot with a Renderer child tag with option child tags from JSON", function () {
            json = {
                "renderer" : {
                    "type" : "pointline",
                    "options" : {}
                }
            };
            json.renderer.options[rendererOption1Name] =  3;
            json.renderer.options[rendererOption2Name] =  "circle";
            json.renderer.options[rendererOption3Name] =  7;
            plot = Plot.parseJSON(json);
            expect(plot).not.toBeUndefined();
            expect(plot instanceof DataPlot).toBe(true);
            expect(plot.renderer() instanceof Renderer).toBe(true);
            expect(plot.renderer().options()[rendererOption1Name]().size()).toEqual(1);
            expect(plot.renderer().options()[rendererOption1Name]().at(0) instanceof RendererOption).toBe(true);
            expect(plot.renderer().options()[rendererOption1Name]().size()).toEqual(1);
            expect(plot.renderer().options()[rendererOption1Name]().at(0) instanceof RendererOption).toBe(true);
            expect(plot.renderer().options()[rendererOption1Name]().size()).toEqual(1);
            expect(plot.renderer().options()[rendererOption1Name]().at(0) instanceof RendererOption).toBe(true);
        });

    });

    describe("Filter parsing", function () {

        var type = "pointline",
            option1Name = "size",
            option1Value = "3";        

        it("should be able to parse a plot with a Filter child from JSON", function () {
            json = {
                "filter" : { "type" : type }
            };
            plot = Plot.parseJSON(json);
            expect(plot).not.toBeUndefined();
            expect(plot instanceof DataPlot).toBe(true);
            expect(plot.filter() instanceof Filter).toBe(true);
            expect(plot.filter().type()).toEqual(type);
        });

        it("should be able to parse a plot with a Filter child with option children from JSON", function () {
            json = {
                "filter" : {
                    "type" : type,
                    "options" : {}
                }
            };
            json.filter.options[option1Name] =  option1Value;

            plot = Plot.parseJSON(json);
            expect(plot).not.toBeUndefined();
            expect(plot instanceof DataPlot).toBe(true);
            expect(plot.filter() instanceof Filter).toBe(true);
            expect(plot.filter().options().at(0) instanceof FilterOption).toBe(true);
            expect(plot.filter().options().at(0).name()).toEqual(option1Name);
            expect(plot.filter().options().at(0).value()).toEqual(option1Value);
        });

    });

    describe("Datatips parsing", function () {
        var bgcolor = "0x123456",
            bordercolor = "0xfffbbb",
            format = "number",
            bgalpha = 1,
            border = 2,
            pad = 1,
            datatipsVariable1Format = "number",
            datatipsVariable2Format = "number",
            datatipsVariable3Format = "datetime";

        it("should be able to parse a plot with a Datatips child from JSON", function () {
            json = {
                "datatips" : {
                    "bgcolor" : bgcolor,
                    "bordercolor" : bordercolor,
                    "format" : format,
                    "bgalpha" : bgalpha,
                    "border" : border,
                    "pad" : pad
                }
            };
            plot = Plot.parseJSON(json);
            expect(plot).not.toBeUndefined();
            expect(plot instanceof DataPlot).toBe(true);
            expect(plot.datatips() instanceof Datatips).toBe(true);
            expect(plot.datatips().bgcolor().getHexString("0x")).toEqual((RGBColor.parse(bgcolor)).getHexString("0x"));
            expect(plot.datatips().bordercolor().getHexString("0x")).toEqual((RGBColor.parse(bordercolor)).getHexString("0x"));
            expect(plot.datatips().format()).toEqual(format);
            expect(plot.datatips().bgalpha()).toEqual(String(bgalpha));
            expect(plot.datatips().border()).toEqual(parseInt(border, 10));
            expect(plot.datatips().pad()).toEqual(parseInt(pad, 10));
        });

        it("should be able to parse a plot with a Datatips child with variable child tags from JSON", function () {
            json = {
                "datatips" : {
                    "bgcolor" : "0x123456",
                    "bordercolor" : "0xffddbb",
                    "format" : "number",
                    "bgalpha" : 1,
                    "border" : 2,
                    "pad" : 1,
                    "variable-formats" : [ datatipsVariable1Format,
                                           datatipsVariable2Format,
                                           datatipsVariable3Format ]
                }
            };
            plot = Plot.parseJSON(json);
            expect(plot).not.toBeUndefined();
            expect(plot instanceof DataPlot).toBe(true);
            expect(plot.datatips() instanceof Datatips).toBe(true);
            expect(plot.datatips().variables().size()).toEqual(3);
            expect(plot.datatips().variables().at(0) instanceof DatatipsVariable).toBe(true);
            expect(plot.datatips().variables().at(0).format()).toEqual(datatipsVariable1Format);
            expect(plot.datatips().variables().at(1) instanceof DatatipsVariable).toBe(true);
            expect(plot.datatips().variables().at(1).format()).toEqual(datatipsVariable2Format);
            expect(plot.datatips().variables().at(2) instanceof DatatipsVariable).toBe(true);
            expect(plot.datatips().variables().at(2).format()).toEqual(datatipsVariable3Format);
        });

    });

    describe("with multiple children", function () {

        var horizontalaxisId = "x",
            verticalaxisId = "y",
            variable1Id = "x",
            variable2Id = "y",
            variable3Id = "y1";

        beforeEach(function () {
            graph = new Graph();
            graph.axes().add((new Axis(Axis.HORIZONTAL)).id(horizontalaxisId));
            graph.axes().add((new Axis(Axis.VERTICAL)).id(verticalaxisId));
            variable1 = (new DataVariable(variable1Id)).column(1);
            variable2 = (new DataVariable(variable2Id)).column(2);
            variable3 = (new DataVariable(variable3Id)).column(3);
            graph.data().add(new ArrayData([variable1,variable2,variable3], []));

            json = {
                "horizontalaxis" : {
                    "ref": horizontalaxisId,
                    "variables" : [ variable1Id ]
                },
                "verticalaxis" : {
                    "ref": verticalaxisId ,
                    "variables" : [ variable2Id, variable3Id ]
                },
                "legend" : {
                    "visible": true,
                    "label": "plot"
                },
                "renderer" : {
                    "type": "pointline",
                    "options" : {}
                },
                "filter" : {
                    "type": "pointline",
                    "options" : [
                        { "name": "size", "value": 3 },
                        { "name": "shape", "value": "circle" },
                        { "name": "linewidth", "value": 7 }
                    ]
                },
                "datatips" : {
                    "bgcolor": "0x12fff6",
                    "bordercolor": "0xfffbbb",
                    "format": "number",
                    "bgalpha": 1,
                    "border": 2,
                    "pad": 1
                }
            };
            json.renderer.options["linewidth"] =  7;
            json.renderer.options["pointshape"] =  "triangle";
            json.renderer.options["pointsize"] =  3;

            plot = Plot.parseJSON(json, graph);
        });

        it("should be able to parse a plot with multiple children from JSON", function () {
            expect(plot).not.toBeUndefined();
            expect(plot instanceof DataPlot).toBe(true);
        });

        it("should be able to properly parse a plot with multiple children from JSON", function () {
            expect(plot.horizontalaxis() instanceof Axis).toBe(true);
            expect(plot.verticalaxis() instanceof Axis).toBe(true);
            expect(plot.variable().size()).toEqual(3);
            expect(plot.variable().at(0) instanceof DataVariable).toBe(true);
            expect(plot.variable().at(1) instanceof DataVariable).toBe(true);
            expect(plot.variable().at(2) instanceof DataVariable).toBe(true);
            expect(plot.legend() instanceof PlotLegend).toBe(true);
            expect(plot.renderer() instanceof Renderer).toBe(true);
            expect(plot.filter() instanceof Filter).toBe(true);
            expect(plot.filter().options().size()).toEqual(3);
            expect(plot.filter().options().at(0) instanceof FilterOption).toBe(true);
            expect(plot.filter().options().at(1) instanceof FilterOption).toBe(true);
            expect(plot.filter().options().at(2) instanceof FilterOption).toBe(true);            
            expect(plot.datatips() instanceof Datatips).toBe(true);
        });

    });


    describe("plot style/options as an alternative to renderer", function () {

        beforeEach(function () {
            graph = new Graph();

            json = {
                "style": "pointline",
                "options" : {
                    linewidth: 7,
                    pointshape: "triangle",
                    pointsize: 3
                }
            };

            plot = Plot.parseJSON(json, graph);
        });

        it("should be able to parse a plot from JSON", function () {
            expect(plot).not.toBeUndefined();
            expect(plot instanceof DataPlot).toBe(true);
        });

        it("should be able to properly parse a plot from JSON", function () {
            expect(plot.renderer().options()["linewidth"]().size()).toEqual(1);
            expect(plot.renderer().options()["linewidth"]().at(0) instanceof RendererOption).toBe(true);
            expect(plot.renderer().getOptionValue("linewidth")).toEqual(7);

            expect(plot.renderer().options()["pointshape"]().size()).toEqual(1);
            expect(plot.renderer().options()["pointshape"]().at(0) instanceof RendererOption).toBe(true);
            expect(plot.renderer().getOptionValue("pointshape")).toEqual("triangle");

            expect(plot.renderer().options()["pointsize"]().size()).toEqual(1);
            expect(plot.renderer().options()["pointsize"]().at(0) instanceof RendererOption).toBe(true);
            expect(plot.renderer().getOptionValue("pointsize")).toEqual(3);
        });

    });

});
