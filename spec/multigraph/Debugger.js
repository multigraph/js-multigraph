/*global describe, it, beforeEach, expect, xit, jasmine */

describe("Debugger", function () {
    "use strict";

    var Debugger = window.multigraph.Debugger,
        debug;

    beforeEach(function () {
        debug = new Debugger();
    });

    it("should be able to create a Debugger", function () {
        expect(debug instanceof Debugger).toBe(true);
    });

    describe("visible attribute", function () {
        it("should be able to set/get the visible attribute", function () {
            debug.visible('yes');
            expect(debug.visible() === 'yes').toBe(true);
        });

    });

    describe("fixed attribute", function () {
        it("should be able to set/get the fixed attribute", function () {
            debug.fixed('no');
            expect(debug.fixed() === 'no').toBe(true);
        });

    });

});
