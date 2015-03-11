/*global describe, it, beforeEach, expect, xit, jasmine */
/*jshint laxbreak:true */

describe("Plot Renderer JSON parsing", function () {
    "use strict";

    var Renderer = require('../../../src/core/renderer.js'),
        Option = require('../../../src/core/renderer.js').Option,
        Axis = require('../../../src/core/axis.js'),
        DataPlot = require('../../../src/core/data_plot.js'),
        DataValue = require('../../../src/core/data_value.js'),
        renderer,
        type = "pointline",
        json;

    require('../../../src/parser/json/renderer.js');

    beforeEach(function () {
        json = { "type" : type };
        renderer = Renderer.parseJSON(json);
    });

    it("should be able to parse a renderer from JSON", function () {
        expect(renderer).not.toBeUndefined();
        expect(renderer instanceof Renderer).toBe(true);
    });

    it("should be able to parse a renderer from JSON and read its 'type' attribute", function () {
        expect(renderer.type()).toEqual(Renderer.Type.parse(type));
    });

    describe("Option parsing", function () {
        describe("with a single option child tag", function () {
            var option1Name = "pointsize",
                option1Value = 3;

            beforeEach(function () {
                json = {
                    "type" : "pointline",
                    "options" : [ { "name" : option1Name, "value" : option1Value } ]
                };
                renderer = Renderer.parseJSON(json);
            });

            it("should be able to parse a renderer with a child from JSON", function () {
                expect(renderer).not.toBeUndefined();
                expect(renderer instanceof Renderer).toBe(true);
            });

            it("should properly parse the option children of a renderer with a option child tag from JSON", function () {
                expect(renderer.options()[option1Name]().size()).toEqual(1);
                expect(renderer.options()[option1Name]().at(0) instanceof Option).toBe(true);
                expect(renderer.options()[option1Name]().at(0).serializeValue()).toEqual(String(option1Value));
            });

        });

        describe("with multiple option child tags", function () {
            var option1Name = "pointsize",
                option1Value = 3,
                option2Name = "pointopacity",
                option2Value = 0,
                option2Min = 0,
                option3Name = "pointopacity",
                option3Value = 1,
                option3Max = 0,
                option4Name = "linewidth",
                option4Value = 2,
                axisType = "number";

            var plot = new DataPlot();
            plot.verticalaxis((new Axis(Axis.VERTICAL)).type(axisType));

            beforeEach(function () {
                json = {
                    "type" : "pointline",
                    "options" : [
                        { "name" : option1Name, "value" : option1Value },
                        { "name" : option2Name, "value" : option2Value, "min" : option2Min },
                        { "name" : option3Name, "value" : option3Value, "max" : option3Max },
                        { "name" : option4Name, "value" : option4Value }
                    ]
                };
                renderer = Renderer.parseJSON(json, plot);
            });

            it("should be able to parse a renderer with multiple option child tags from JSON", function () {
                expect(renderer).not.toBeUndefined();
                expect(renderer instanceof Renderer).toBe(true);
            });

            it("should properly parse the option children of a renderer with multiple option child tags from JSON", function () {
                expect(renderer.options()[option1Name]().size()).toEqual(1);
                expect(renderer.options()[option1Name]().at(0) instanceof Option).toBe(true);
                expect(renderer.options()[option1Name]().at(0).serializeValue()).toEqual(String(option1Value));

                expect(renderer.options()[option2Name]().size()).toEqual(3);
                expect(renderer.options()[option2Name]().at(1) instanceof Option).toBe(true);
                expect(renderer.options()[option2Name]().at(1).serializeValue()).toEqual(String(option2Value));
                expect(renderer.options()[option2Name]().at(1).min().getRealValue()).toEqual((DataValue.parse(axisType, option2Min)).getRealValue());

                expect(renderer.options()[option3Name]().size()).toEqual(3);
                expect(renderer.options()[option3Name]().at(2) instanceof Option).toBe(true);
                expect(renderer.options()[option3Name]().at(2).serializeValue()).toEqual(String(option3Value));
                expect(renderer.options()[option3Name]().at(2).max().getRealValue()).toEqual((DataValue.parse(axisType, option3Max)).getRealValue());

                expect(renderer.options()[option4Name]().size()).toEqual(1);
                expect(renderer.options()[option4Name]().at(0) instanceof Option).toBe(true);
                expect(renderer.options()[option4Name]().at(0).serializeValue()).toEqual(String(option4Value));
            });

        });

    });

});
