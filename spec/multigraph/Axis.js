/*global describe, it, beforeEach, expect, xit, jasmine */

describe("Axis", function () {
    "use strict";

    var Axis = window.multigraph.Axis,
        a;

    beforeEach(function () {
        a = new Axis();
    });

    it("should be able to create an Axis", function () {
	expect(a instanceof Axis).toBe(true);
    });

    describe("id attribute", function () {
        it("should be able to set/get the id attribute", function () {
	    a.id('the-id');
	    expect(a.id() === 'the-id').toBe(true);
        });

        it("should throw an error if the parameter is not a string", function () {
            expect(function () {
                a.id(5);
            }).toThrow(new Error("invalid setter call for id"));
        });

    });

    describe("min attribute", function () {
        it("should be able to set/get the min attribute", function () {
	    a.min('the-min');
	    expect(a.min() === 'the-min').toBe(true);
        });

        it("should throw an error if the parameter is not a string", function () {
            expect(function () {
                a.min(true);
            }).toThrow(new Error("invalid setter call for min"));
        });

    });

    describe("max attribute", function () {
        it("should be able to set/get the max attribute", function () {
	    a.max('the-max');
	    expect(a.max() === 'the-max').toBe(true);
        });

        it("should throw an error if the parameter is not a string", function () {
            expect(function () {
                a.max(true);
            }).toThrow(new Error("invalid setter call for max"));
        });

    });

});
