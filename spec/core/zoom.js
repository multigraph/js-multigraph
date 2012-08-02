/*global describe, it, beforeEach, expect, xit, jasmine */

describe("Axis Zoom", function () {
    "use strict";

    var Zoom = window.multigraph.core.Zoom,
        zoom;

    beforeEach(function () {
        zoom = new Zoom();
    });

    it("should be able to create a Zoom", function () {
        expect(zoom instanceof Zoom).toBe(true);
    });

    describe("allowed attribute", function () {
        it("should be able to set/get the allowed attribute", function () {
            zoom.allowed("no");
            expect(zoom.allowed()).toBe("no");
        });

        it("should be throw an error if the setter value is not 'yes' or 'no'", function () {
            expect(function () {
                zoom.allowed("yes");
            }).not.toThrow();
            expect(function () {
                zoom.allowed("nope");
            }).toThrow(new Error("validator failed with parameter nope"));
        });

    });

    describe("min attribute", function () {
        it("should be able to set/get the min attribute", function () {
            zoom.min("70");
            expect(zoom.min()).toBe("70");
        });

    });

    describe("max attribute", function () {
        it("should be able to set/get the max attribute", function () {
            zoom.max("5");
            expect(zoom.max()).toBe("5");
        });

    });

    describe("anchor attribute", function () {
        it("should be able to set/get the anchor attribute", function () {
            zoom.anchor("none");
            expect(zoom.anchor()).toBe("none");
        });

    });

});
