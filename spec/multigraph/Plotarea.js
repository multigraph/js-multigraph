/*global describe, it, beforeEach, expect, xit, jasmine */

describe("Plotarea", function () {
    "use strict";

    var Plotarea = window.multigraph.Plotarea,
        p;

    beforeEach(function () {
        p = new Plotarea();
    });

    it("should be able to create a Plotarea", function () {
        expect(p instanceof Plotarea).toBe(true);
    });

    describe("margin().bottom attribute", function () {
        it("should be able to set/get the marginbottom attribute", function () {
            p.margin().bottom(5);
            expect(p.margin().bottom() === 5).toBe(true);
        });

    });

    describe("margin()left attribute", function () {
        it("should be able to set/get the margin().left attribute", function () {
            p.margin().left(5);
            expect(p.margin().left() === 5).toBe(true);
        });

    });

    describe("margin()top attribute", function () {
        it("should be able to set/get the margin().top attribute", function () {
            p.margin().top(5);
            expect(p.margin().top() === 5).toBe(true);
        });

    });

    describe("margin()right attribute", function () {
        it("should be able to set/get the margin().right attribute", function () {
            p.margin().right(5);
            expect(p.margin().right() === 5).toBe(true);
        });

    });

    describe("border attribute", function () {
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
