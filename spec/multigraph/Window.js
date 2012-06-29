/*global describe, it, beforeEach, expect, xit, jasmine */

describe("Window", function () {
    "use strict";

    var Window = window.multigraph.Window,
        w;

    beforeEach(function () {
        w = new Window();
    });

    it("should be able to create a Window", function () {
        expect(w instanceof Window).toBe(true);
    });

    describe("width attribute", function () {
        it("should be able to set/get the width attribute", function () {
            w.width(100);
            expect(w.width() === 100).toBe(true);
        });

    });

    describe("height attribute", function () {
        it("should be able to set/get the height attribute", function () {
            w.height(250);
            expect(w.height() === 250).toBe(true);
        });

    });

    describe("border attribute", function () {
        it("should be able to set/get the border attribute", function () {
            w.border(3);
            expect(w.border() === 3).toBe(true);
        });

    });

    describe("margin attribute", function () {
        xit("should be able to set/get the margin attribute", function () {
            w.margin('5');
            expect(w.margin() === '5').toBe(true);
        });

    });

    describe("padding attribute", function () {
        xit("should be able to set/get the padding attribute", function () {
            w.padding('200');
            expect(w.padding() === '200').toBe(true);
        });

    });

    describe("bordercolor attribute", function () {
        it("should be able to set/get the bordercolor attribute", function () {
            w.bordercolor('0x456210');
            expect(w.bordercolor() === '0x456210').toBe(true);
        });

    });

});
