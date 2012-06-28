/*global describe, it, beforeEach, expect, xit, jasmine */

describe("Insets", function () {
    "use strict";

    var Insets = window.multigraph.math.Insets,
        i;

    beforeEach(function () {
        i = new Insets(10,20,30,40);
    });

    it("should be able to create a Insets", function () {
        expect(i instanceof Insets).toBe(true);
    });

    describe("attributes", function () {

        it("should read the correct top attribute value", function () {
            expect(i.top() === 10).toBe(true);
        });
        it("should read the correct left attribute value", function () {
            expect(i.left() === 20).toBe(true);
        });
        it("should read the correct bottom attribute value", function () {
            expect(i.bottom() === 30).toBe(true);
        });
        it("should read the correct right attribute value", function () {
            expect(i.right() === 40).toBe(true);
        });

    });

});
