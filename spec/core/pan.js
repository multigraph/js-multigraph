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
            pan.allowed('no');
            expect(pan.allowed() === 'no').toBe(true);
        });

        it("should be throw an error if the setter value is not 'yes' or 'no'", function () {
            expect(function () {
                pan.allowed('yes');
            }).not.toThrow();
            expect(function () {
                pan.allowed('nope');
            }).toThrow(new Error('validator failed with parameter nope'));
        });

    });

    describe("min attribute", function () {
        it("should be able to set/get the min attribute", function () {
            pan.min('70');
            expect(pan.min() === '70').toBe(true);
        });

    });

    describe("max attribute", function () {
        it("should be able to set/get the max attribute", function () {
            pan.max('5');
            expect(pan.max() === '5').toBe(true);
        });

    });

});
