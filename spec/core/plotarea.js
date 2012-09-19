/*global describe, it, beforeEach, expect, xit, jasmine */

describe("Plotarea", function () {
    "use strict";

    var Plotarea = window.multigraph.core.Plotarea,
        p,
        defaultValues;

    beforeEach(function () {
        p = new Plotarea();
        defaultValues = window.multigraph.utilityFunctions.getDefaultValuesFromXSD();
    });

    it("should be able to create a Plotarea", function () {
        expect(p instanceof Plotarea).toBe(true);
    });

    it("should do that w thang", function () {
        var w = new Plotarea();
        expect(w.margin().right()).toBe(defaultValues.plotarea.margin().right());
    });

    describe("margin attribute", function () {
        it("should be initilized to the correct default value", function () {
            expect(p.margin().top()).toBe(defaultValues.plotarea.margin().top());
            expect(p.margin().left()).toBe(defaultValues.plotarea.margin().left());
            expect(p.margin().bottom()).toBe(defaultValues.plotarea.margin().bottom());
            expect(p.margin().right()).toBe(defaultValues.plotarea.margin().right());
        });
        it("should be able to set/get the bottom attribute", function () {
            p.margin().bottom(5);
            expect(p.margin().bottom()).toBe(5);
        });
        it("should be able to set/get the left attribute", function () {
            p.margin().left(5);
            expect(p.margin().left()).toBe(5);
        });
        it("should be able to set/get the top attribute", function () {
            p.margin().top(5);
            expect(p.margin().top()).toBe(5);
        });
        it("should be able to set/get the right attribute", function () {
            p.margin().right(5);
            expect(p.margin().right()).toBe(5);
        });
    });

    describe("border attribute", function () {
        it("should be initilized to the correct default value", function () {
            expect(p.border()).toBe(defaultValues.plotarea.border);
        });
        it("should be able to set/get the border attribute", function () {
            p.border(3);
            expect(p.border()).toBe(3);
        });

    });

    describe("bordercolor attribute", function () {
        it("should be able to set/get the bordercolor attribute", function () {
            p.bordercolor(window.multigraph.math.RGBColor.parse("0x456210"));
            expect(p.bordercolor().getHexString()).toBe("0x456210");
        });

    });

});
