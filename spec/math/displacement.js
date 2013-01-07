/*global describe, it, beforeEach, expect, xit, jasmine */

describe("Displacement", function () {
    "use strict";

    var Displacement = window.multigraph.math.Displacement,
        d;

    beforeEach(function () {
        d = new Displacement(1);
    });

    it("should be able to create a Displacement", function () {
        expect(d instanceof Displacement).toBe(true);
    });

    describe("a attribute", function () {
        it("should be able to set/get the a attribute with a value of 0.5", function () {
            d.a(0.5);
            expect(d.a()).toBe(0.5);
        });
        it("should be able to set/get the a attribute with a value of 0.0", function () {
            d.a(0.0);
            expect(d.a()).toBe(0.0);
        });
        it("should throw an error if a attribute is less than -1", function () {
            expect(function () {
                d.a(-2);
            }).toThrow(new Error("validator failed with parameter -2"));
        });

        it("should throw an error if a attribute is greater than 1", function () {
            expect(function () {
                d.a(2);
            }).toThrow(new Error("validator failed with parameter 2"));
        });
    });

    describe("b attribute", function () {
        it("should be able to set/get the b attribute with a value of 20", function () {
            d.b(20);
            expect(d.b()).toBe(20);
        });
        it("should be able to set/get the b attribute with a value of 0", function () {
            d.b(0);
            expect(d.b()).toBe(0);
        });
        it("should throw an error if b attribute is a floating point number", function () {
            expect(function () {
                d.b(20.5);
            }).toThrow(new Error("20.5 should be an integer"));
        });


        it("should throw an error if b attribute is a string", function () {
            expect(function () {
                d.b("fooya");
            }).toThrow(new Error("fooya should be an integer"));
        });

    });

    describe("calculateLength method", function () {
        it("should return the correctly calculated value", function () {
            d.a(1.0);
            d.b(-20);
            expect(d.calculateLength(100)).toBe(80);
        });
    });

    describe("calculateCoordinate method", function () {
        it("should return the correctly calculated value", function () {
            d.a(1.0);
            d.b(-20);
            expect(d.calculateCoordinate(100)).toBe(80);
        });
    });

    describe("parse method", function () {
        it("should parse '1+20' correctly", function () {
            var d2 = Displacement.parse("1+20");
            expect(d2.a()).toBe(1);
            expect(d2.b()).toBe(20);
        });
        it("should parse '0.5-10' correctly", function () {
            var d2 = Displacement.parse("0.5-10");
            expect(d2.a()).toBe(0.5);
            expect(d2.b()).toBe(-10);
        });
        it("should parse '1' correctly", function () {
            var d2 = Displacement.parse("1");
            expect(d2.a()).toBe(1);
            expect(d2.b()).toBe(0);
        });
        it("should parse '1.0' correctly", function () {
            var d2 = Displacement.parse("1.0");
            expect(d2.a()).toBe(1.0);
            expect(d2.b()).toBe(0);
        });
        it("should parse '0' correctly", function () {
            var d2 = Displacement.parse("0");
            expect(d2.a()).toBe(0);
            expect(d2.b()).toBe(0);
        });
        it("should parse '0.0' correctly", function () {
            var d2 = Displacement.parse("0.0");
            expect(d2.a()).toBe(0.0);
            expect(d2.b()).toBe(0);
        });
        it("should parse '-1' correctly", function () {
            var d2 = Displacement.parse("-1");
            expect(d2.a()).toBe(-1);
            expect(d2.b()).toBe(0);
        });
    });

});
