/*global describe, it, beforeEach, expect, xit, jasmine */

describe("Point Serialization", function () {
    "use strict";

    var Point = window.multigraph.math.Point;

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
