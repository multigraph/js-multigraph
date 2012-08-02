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
            expect(i.top()).toBe(10);
        });
        it("should read the correct left attribute value", function () {
            expect(i.left()).toBe(20);
        });
        it("should read the correct bottom attribute value", function () {
            expect(i.bottom()).toBe(30);
        });
        it("should read the correct right attribute value", function () {
            expect(i.right()).toBe(40);
        });

    });

});
