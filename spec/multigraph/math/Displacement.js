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
            expect(d.a() === 0.5).toBe(true);
        });
        it("should be able to set/get the a attribute with a value of 0.0", function () {
            d.a(0.0);
            expect(d.a() === 0.0).toBe(true);
        });
        it("should throw an error if a attribute is less than -1", function () {
            expect(function () {
                d.a(-2);
            }).toThrow(new Error("invalid setter call for a"));
        });

        it("should throw an error if a attribute is greater than 1", function () {
            expect(function () {
                d.a(2);
            }).toThrow(new Error("invalid setter call for a"));
        });
    });

    describe("b attribute", function () {
        it("should be able to set/get the b attribute with a value of 20", function () {
            d.b(20);
            expect(d.b() === 20).toBe(true);
        });
        it("should be able to set/get the b attribute with a value of 0", function () {
            d.b(0);
            expect(d.b() === 0).toBe(true);
        });
        it("should throw an error if b attribute is a floating point number", function () {
            expect(function () {
                d.b(20.5);
            }).toThrow(new Error("20.5 should be an integer"));
        });


        it("should throw an error if b attribute is a string", function () {
            expect(function () {
                d.b('fooya');
            }).toThrow(new Error("fooya should be an integer"));
        });

    });

    describe("calculateLength method", function () {
        it("should return the correctly calculated value", function () {
            d.a(1.0);
            d.b(-20);
            expect(d.calculateLength(100) === 80).toBe(true);
        });
    });

    describe("calculateCoordinate method", function () {
        it("should return the correctly calculated value", function () {
            d.a(1.0);
            d.b(-20);
            expect(d.calculateCoordinate(100) === 80).toBe(true);
        });
    });

    describe("parse method", function () {
        it("should parse '1+20' correctly", function () {
            var d2 = Displacement.parse("1+20");
            expect(d2.a() === 1).toBe(true);
            expect(d2.b() === 20).toBe(true);
        });
        it("should parse '0.5-10' correctly", function () {
            var d2 = Displacement.parse("0.5-10");
            expect(d2.a() === 0.5).toBe(true);
            expect(d2.b() === -10).toBe(true);
        });
        it("should parse '1' correctly", function () {
            var d2 = Displacement.parse("1");
            expect(d2.a() === 1).toBe(true);
            expect(d2.b() === 0).toBe(true);
        });
        it("should parse '1.0' correctly", function () {
            var d2 = Displacement.parse("1.0");
            expect(d2.a() === 1.0).toBe(true);
            expect(d2.b() === 0).toBe(true);
        });
        it("should parse '0' correctly", function () {
            var d2 = Displacement.parse("0");
            expect(d2.a() === 0).toBe(true);
            expect(d2.b() === 0).toBe(true);
        });
        it("should parse '0.0' correctly", function () {
            var d2 = Displacement.parse("0.0");
            expect(d2.a() === 0.0).toBe(true);
            expect(d2.b() === 0).toBe(true);
        });
        it("should parse '-1' correctly", function () {
            var d2 = Displacement.parse("-1");
            expect(d2.a() === -1).toBe(true);
            expect(d2.b() === 0).toBe(true);
        });
    });

    describe("serialize method", function () {
        it("should serialize '1+20' correctly", function () {
            var d2 = Displacement.parse("1+20");
            expect(d2.serialize()).toBe("1+20");
        });
        it("should serialize '0.5-10' correctly", function () {
            var d2 = Displacement.parse("0.5-10");
            expect(d2.serialize()).toBe("0.5-10");
        });
        it("should serialize '1' correctly", function () {
            var d2 = Displacement.parse("1");
            expect(d2.serialize()).toBe("1");
        });
        it("should serialize '1.0' correctly", function () {
            var d2 = Displacement.parse("1.0");
            expect(d2.serialize()).toBe("1");
        });
        it("should serialize '0' correctly", function () {
            var d2 = Displacement.parse("0");
            expect(d2.serialize()).toBe("0");
        });
        it("should serialize '0.0' correctly", function () {
            var d2 = Displacement.parse("0.0");
            expect(d2.serialize()).toBe("0");
        });
        it("should serialize '-1' correctly", function () {
            var d2 = Displacement.parse("-1");
            expect(d2.serialize()).toBe("-1");
        });
    });

});
