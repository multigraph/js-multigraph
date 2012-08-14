/*global describe, it, beforeEach, expect, xit, jasmine */

describe("Axis Pan", function () {
    "use strict";

    var Pan = window.multigraph.core.Pan,
        pan;

    beforeEach(function () {
        pan = new Pan();
    });

    it("should be able to create a Pan", function () {
        expect(pan instanceof Pan).toBe(true);
    });

    describe("allowed attribute", function () {
        it("should be able to set/get the allowed attribute", function () {
            pan.allowed(false);
            expect(pan.allowed()).toBe(false);
        });

        it("should be throw an error if the setter value is not 'true' or 'false'", function () {
            expect(function () {
                pan.allowed(true);
            }).not.toThrow();
            expect(function () {
                pan.allowed("nope");
            }).toThrow(new Error("nope should be a boolean"));
        });

    });

    describe("min attribute", function () {
        it("should be able to set/get the min attribute", function () {
            pan.min(window.multigraph.core.DataValue.parse("number", "70"));
            expect(pan.min().getRealValue()).toBe(70);
        });

    });

    describe("max attribute", function () {
        it("should be able to set/get the max attribute", function () {
            pan.max(window.multigraph.core.DataValue.parse("number", "5"));
            expect(pan.max().getRealValue()).toBe(5);
        });

    });

});
