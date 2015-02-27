/*global describe, it, beforeEach, expect, xit, jasmine */

describe("Axis Zoom", function () {
    "use strict";

    var Zoom = require('../../src/core/zoom.js'),
        zoom;

    beforeEach(function () {
        zoom = new Zoom();
    });

    it("should be able to create a Zoom", function () {
        expect(zoom instanceof Zoom).toBe(true);
    });

    describe("allowed attribute", function () {
        it("should be able to set/get the allowed attribute", function () {
            zoom.allowed(false);
            expect(zoom.allowed()).toBe(false);
        });

        it("should be throw an error if the setter value is not 'true' or 'false'", function () {
            expect(function () {
                zoom.allowed(true);
            }).not.toThrow();
            expect(function () {
                zoom.allowed("nope");
            }).toThrow(new Error("nope should be a boolean"));
        });

    });

    describe("min attribute", function () {
        it("should be able to set/get the min attribute", function () {
            zoom.min(require('../../src/core/data_measure.js').parse("number", "70"));
            expect(zoom.min().getRealValue()).toBe(70);
        });

    });

    describe("max attribute", function () {
        it("should be able to set/get the max attribute", function () {
            zoom.max(require('../../src/core/data_measure.js').parse("number", "5"));
            expect(zoom.max().getRealValue()).toBe(5);
        });

    });

    describe("anchor attribute", function () {
        it("should be able to set/get the anchor attribute", function () {
            zoom.anchor(null);
            expect(zoom.anchor()).toBe(null);
        });

    });

});
