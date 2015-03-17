/*global describe, it, beforeEach, expect, xit, jasmine */
/*jshint laxbreak:true */

describe("Plot Datatips JSON parsing", function () {
    "use strict";

    var Datatips = require('../../../src/core/datatips.js'),
        DatatipsVariable = require('../../../src/core/datatips_variable.js'),
        RGBColor = require('../../../src/math/rgb_color.js'),
        datatips,
        bgcolor = "0x123456",
        bordercolor = "0xfffbbb",
        format = "number",
        bgalpha = 1.0,
        border = 2,
        pad = 1,
        json;

    require('../../../src/parser/json/datatips.js');

    beforeEach(function () {
        json = {
            "bgcolor"     : bgcolor,
            "bordercolor" : bordercolor,
            "format"      : format,
            "bgalpha"     : bgalpha,
            "border"      : border,
            "pad"         : pad
        };
        datatips = Datatips.parseJSON(json);
    });

    it("should be able to parse a datatips from JSON", function () {
        expect(datatips).not.toBeUndefined();
        expect(datatips instanceof Datatips).toBe(true);
    });

    it("should be able to parse a datatips from JSON and read its 'formatString' attribute", function () {
        expect(datatips.formatString()).toEqual(format);
    });

    it("should be able to parse a datatips from JSON and read its 'bgcolor' attribute", function () {
        expect(datatips.bgcolor().getHexString("0x")).toEqual((RGBColor.parse(bgcolor)).getHexString("0x"));
    });

    it("should be able to parse a datatips from JSON and read its 'bgalpha' attribute", function () {
        expect(datatips.bgalpha()).toEqual(bgalpha);
    });

    it("should be able to parse a datatips from JSON and read its 'border' attribute", function () {
        expect(datatips.border()).toEqual(border);
    });

    it("should be able to parse a datatips from JSON and read its 'bordercolor' attribute", function () {
        expect(datatips.bordercolor().getHexString("0x")).toEqual((RGBColor.parse(bordercolor)).getHexString("0x"));
    });

    it("should be able to parse a datatips from JSON and read its 'pad' attribute", function () {
        expect(datatips.pad()).toEqual(pad);
    });

    describe("Variable parsing", function () {
        describe("with a single variable child tag", function () {
            var variable1Format = "number";

            beforeEach(function () {
                json = {
                    "bgcolor"     : "0x123456",
                    "bordercolor" : "0xba789b",
                    "format"      : "datetime",
                    "bgalpha"     : 5,
                    "border"      : 7,
                    "pad"         : 2,
                    "variable-formats" : [ variable1Format ]
                };
                datatips = Datatips.parseJSON(json);
            });

            it("should be able to parse a datatips with a variable child tag from JSON", function () {
                expect(datatips).not.toBeUndefined();
                expect(datatips instanceof Datatips).toBe(true);
            });

            it("should properly parse the variable children of a datatips with a variable child tag from JSON", function () {
                expect(datatips.variables().size()).toEqual(1);
                expect(datatips.variables().at(0) instanceof DatatipsVariable).toBe(true);
                expect(datatips.variables().at(0).formatString()).toEqual(variable1Format);
            });

        });

        describe("with multiple variable child tags", function () {
            var variable1Format = "number",
                variable2Format = "number",
                variable3Format = "datetime";

            beforeEach(function () {
                json = {
                    "bgcolor"     : "0x123456",
                    "bordercolor" : "0xba789b",
                    "format"      : "datetime",
                    "bgalpha"     : 5,
                    "border"      : 7,
                    "pad"         : 2,
                    "variable-formats" : [ variable1Format, variable2Format, variable3Format ]
                };
                datatips = Datatips.parseJSON(json);
            });

            it("should be able to parse a datatips with multiple variable child tags from JSON", function () {
                expect(datatips).not.toBeUndefined();
                expect(datatips instanceof Datatips).toBe(true);
            });

            it("should properly parse the variable children of a datatips with multiple variable child tags from JSON", function () {
                expect(datatips.variables().size()).toEqual(3);
                expect(datatips.variables().at(0) instanceof DatatipsVariable).toBe(true);
                expect(datatips.variables().at(0).formatString()).toEqual(variable1Format);
                expect(datatips.variables().at(1) instanceof DatatipsVariable).toBe(true);
                expect(datatips.variables().at(1).formatString()).toEqual(variable2Format);
                expect(datatips.variables().at(2) instanceof DatatipsVariable).toBe(true);
                expect(datatips.variables().at(2).formatString()).toEqual(variable3Format);
            });

        });

    });

});
