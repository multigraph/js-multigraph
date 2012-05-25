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

    describe("marginbottom attribute", function () {
        it("should be able to set/get the marginbottom attribute", function () {
            p.marginbottom('5');
            expect(p.marginbottom() === '5').toBe(true);
        });

    });

    describe("marginleft attribute", function () {
        it("should be able to set/get the marginleft attribute", function () {
            p.marginleft('5');
            expect(p.marginleft() === '5').toBe(true);
        });

    });

    describe("margintop attribute", function () {
        it("should be able to set/get the margintop attribute", function () {
            p.margintop('5');
            expect(p.margintop() === '5').toBe(true);
        });

    });

    describe("marginright attribute", function () {
        it("should be able to set/get the marginright attribute", function () {
            p.marginright('5');
            expect(p.marginright() === '5').toBe(true);
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
