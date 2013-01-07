/*global describe, it, beforeEach, expect, xit, jasmine */

describe("Displacement", function () {
    "use strict";

    var Displacement = window.multigraph.math.Displacement,
        d;

    describe("serialize method", function () {
        it("should serialize '1+20' correctly", function () {
            var d = Displacement.parse("1+20");
            expect(d.serialize()).toBe("1+20");
        });
        it("should serialize '0.5-10' correctly", function () {
            var d = Displacement.parse("0.5-10");
            expect(d.serialize()).toBe("0.5-10");
        });
        it("should serialize '1' correctly", function () {
            var d = Displacement.parse("1");
            expect(d.serialize()).toBe("1");
        });
        it("should serialize '1.0' correctly", function () {
            var d = Displacement.parse("1.0");
            expect(d.serialize()).toBe("1");
        });
        it("should serialize '0' correctly", function () {
            var d = Displacement.parse("0");
            expect(d.serialize()).toBe("0");
        });
        it("should serialize '0.0' correctly", function () {
            var d = Displacement.parse("0.0");
            expect(d.serialize()).toBe("0");
        });
        it("should serialize '-1' correctly", function () {
            var d = Displacement.parse("-1");
            expect(d.serialize()).toBe("-1");
        });
    });

});
