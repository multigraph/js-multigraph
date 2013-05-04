/*global describe, it, beforeEach, expect, xit, jasmine */

describe("Plot Datatips", function () {
    "use strict";

    var Datatips = window.multigraph.core.Datatips,
        datatips;

    beforeEach(function () {
        datatips = new Datatips();
    }); 

    it("should be able to create a Datatips", function () {
        expect(datatips instanceof Datatips).toBe(true);
    });

    it("should be able to set/get the formatString attribute", function () {
        datatips.formatString("{0}: {1} {1} {1}");
        expect(datatips.formatString()).toBe("{0}: {1} {1} {1}");
    });

    it("should be able to set/get the bgcolor attribute", function () {
        datatips.bgcolor(window.multigraph.math.RGBColor.parse("0x999678"));
        expect(datatips.bgcolor().getHexString()).toBe("0x999678");
    });

    it("should be able to set/get the bgalpha attribute", function () {
        datatips.bgalpha(.5);
        expect(datatips.bgalpha()).toBe(.5);
    });

    it("should be able to set/get the border attribute", function () {
        datatips.border(5);
        expect(datatips.border()).toBe(5);
    });

    it("should be able to set/get the bordercolor attribute", function () {
        datatips.bordercolor(window.multigraph.math.RGBColor.parse("0x121756"));
        expect(datatips.bordercolor().getHexString()).toBe("0x121756");
    });

    it("should be able to set/get the pad attribute", function () {
        datatips.pad(7);
        expect(datatips.pad()).toBe(7);
    });

    describe("Datatips Variable", function () {
        var Variable = window.multigraph.core.DatatipsVariable,
            variable;

        beforeEach(function () {
            variable = new Variable();
        });

        it("should be able to add a Variable to a Datatips", function () {
            datatips.variables().add(variable);
            expect(datatips.variables().at(0)).toBe(variable);
        });

        it("should be able to add multiple Variables to a Datatips", function () {
            var variable2 = new Variable();
            datatips.variables().add(variable);
            datatips.variables().add(variable2);
            expect(datatips.variables().at(0)).toBe(variable);
            expect(datatips.variables().at(1)).toBe(variable2);
        });

        it("should be able to add an Variable with attributes to a Datatips", function () {
            variable.formatString("tiny");
            datatips.variables().add(variable);
            expect(datatips.variables().at(0)).toBe(variable);
        });

        it("should be able to add multiple Variables with attributes to a Datatips", function () {
            var variable2 = new Variable(),
                variable3 = new Variable();
            variable.formatString("big");
            variable2.formatString("tiny");
            variable3.formatString("medium");
            datatips.variables().add(variable);
            datatips.variables().add(variable3);
            datatips.variables().add(variable2);
            expect(datatips.variables().at(0)).toBe(variable);
            expect(datatips.variables().at(1)).toBe(variable3);
            expect(datatips.variables().at(2)).toBe(variable2);
        });

        it("should be able to set/get attributes of an Variable added to a Datatips", function () {
            datatips.variables().add(variable);
            datatips.variables().at(0).formatString("small");
            expect(datatips.variables().at(0).formatString()).toBe("small");
        });

    });


});
