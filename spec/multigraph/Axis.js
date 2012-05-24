/*global describe, it, beforeEach, expect, xit, jasmine */

describe("Axis", function () {
    "use strict";

    var Axis = window.multigraph.Axis,
        a;

    beforeEach(function () {
        a = new Axis();
        a.orientation('horizontal');
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

    describe("type attribute", function () {
        it("should return undefined if it has not been set", function () {
            expect(a.type() === undefined).toBe(true);
        });

        it("should be able to set/get the type attribute", function () {
            a.type('number');
            expect(a.type() === 'number').toBe(true);
        });

        it("should throw an error if the parameter is not 'number' or 'datetime'", function () {
            expect(function () {
                a.type(5);
            }).toThrow(new Error("invalid setter call for type"));
            expect(function () {
                a.type("numbers");
            }).toThrow(new Error("invalid setter call for type"));
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

    describe("anchor attribute", function () {
        it("should be able to set/get the anchor attribute", function () {
            a.anchor('the-anchor');
            expect(a.anchor() === 'the-anchor').toBe(true);
        });

        it("should throw an error if the parameter is not a string", function () {
            expect(function () {
                a.anchor(true);
            }).toThrow(new Error("invalid setter call for anchor"));
        });

    });

    describe("base attribute", function () {
        it("should be able to set/get the base attribute", function () {
            a.base('the-base');
            expect(a.base() === 'the-base').toBe(true);
        });

        it("should throw an error if the parameter is not a string", function () {
            expect(function () {
                a.base(true);
            }).toThrow(new Error("invalid setter call for base"));
        });

    });

    describe("position attribute", function () {
        it("should be able to set/get the position attribute", function () {
            a.position('the-position');
            expect(a.position() === 'the-position').toBe(true);
        });

        it("should throw an error if the parameter is not a string", function () {
            expect(function () {
                a.position(true);
            }).toThrow(new Error("invalid setter call for position"));
        });

    });

});
