/*global describe, it, beforeEach, expect, xit, jasmine */

describe("Point", function () {
    "use strict";

    var Point = window.multigraph.math.Point,
        p;

    beforeEach(function () {
        p = new Point(3.2,4.1);
    });

    it("should be able to create a Point", function () {
        expect(p instanceof Point).toBe(true);
    });

    describe("attributes", function () {

        it("should read the correct x attribute value", function () {
            expect(p.x()).toEqual(3.2);
        });
        it("should read the correct height attribute value", function () {
            expect(p.y()).toEqual(4.1);
        });

    });

    describe("parse", function () {

        var dotest = function (string, x, y) {
            it("should correctly parse the string '" + string + "'", function () {
                var p = Point.parse(string);
                expect(p.x()).toEqual(x);
                expect(p.y()).toEqual(y);
            });
        };

        dotest("1.2,3.4", 1.2, 3.4);
        dotest("1.2, 3.4", 1.2, 3.4);
        dotest("1.2,-3.4", 1.2, -3.4);
        dotest("1.2, -3.4", 1.2, -3.4);
        dotest(" 1.2, -3.4", 1.2, -3.4);
        dotest(" 1.2, -3.4 ", 1.2, -3.4);
        dotest(" 1.2E-4, -3.4 ", 1.2E-4, -3.4);

        dotest("1.2 3.4", 1.2, 3.4);
        dotest("1.2  3.4", 1.2, 3.4);
        dotest("1.2 -3.4", 1.2, -3.4);
        dotest("1.2  -3.4", 1.2, -3.4);
        dotest(" 1.2  -3.4", 1.2, -3.4);
        dotest(" 1.2  -3.4 ", 1.2, -3.4);
        dotest(" 1.2E-4  -3.4 ", 1.2E-4, -3.4);

    });

    describe("serialize", function () {

        var dotest = function (input, output) {
            it("should correctly serialize the string '" + input + "'", function () {
                var p = Point.parse(input);
                expect(p.serialize()).toEqual(output);
            });
        };

        dotest("1.2,3.4", "1.2,3.4");
        dotest("1.2,-3.4", "1.2,-3.4");
        dotest("1.2, -3.4", "1.2,-3.4");
        dotest(" 1.2, -3.4", "1.2,-3.4");
        dotest(" 1.2, -3.4 ", "1.2,-3.4");
        dotest(" 1.2E-4, -3.4 ", "0.00012,-3.4");

    });

});
