/*global describe, it, beforeEach, expect, xit, jasmine */

describe("Plotarea", function () {
    "use strict";

    var Plotarea = window.multigraph.Plotarea,
        p,
        defaultValues;

    beforeEach(function () {
        p = new Plotarea();
        defaultValues = window.multigraph.utilityFunctions.getDefaultValuesFromXSD();
    });

    it("should be able to create a Plotarea", function () {
        expect(p instanceof Plotarea).toBe(true);
    });

    it("should do that w thang", function() {
        var w = new window.multigraph.Plotarea();
        expect(w.margin().right() === defaultValues.plotarea.margin().right()).toBe(true);
    });

    describe("margin attribute", function () {
        it("should be initilized to the correct default value", function() {
            expect(p.margin().top() === defaultValues.plotarea.margin().top()).toBe(true);
            expect(p.margin().left() === defaultValues.plotarea.margin().left()).toBe(true);
            expect(p.margin().bottom() === defaultValues.plotarea.margin().bottom()).toBe(true);
            expect(p.margin().right() === defaultValues.plotarea.margin().right()).toBe(true);
        });
        it("should be able to set/get the bottom attribute", function () {
            p.margin().bottom(5);
            expect(p.margin().bottom() === 5).toBe(true);
        });
        it("should be able to set/get the left attribute", function () {
            p.margin().left(5);
            expect(p.margin().left() === 5).toBe(true);
        });
        it("should be able to set/get the top attribute", function () {
            p.margin().top(5);
            expect(p.margin().top() === 5).toBe(true);
        });
        it("should be able to set/get the right attribute", function () {
            p.margin().right(5);
            expect(p.margin().right() === 5).toBe(true);
        });
    });

    describe("border attribute", function () {
        it("should be initilized to the correct default value", function() {
            expect(p.border() === defaultValues.plotarea.border).toBe(true);
        });
        it("should be able to set/get the border attribute", function () {
            p.border('3');
            expect(p.border() === '3').toBe(true);
        });

    });

    describe("bordercolor attribute", function () {
        it("should be able to set/get the bordercolor attribute", function () {
            p.bordercolor('0x456210');
            expect(p.bordercolor() === '0x456210').toBe(true);
        });

    });

});
