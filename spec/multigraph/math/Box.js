/*global describe, it, beforeEach, expect, xit, jasmine */

describe("Box", function () {
    "use strict";

    var Box = window.multigraph.math.Box,
        b;

    beforeEach(function () {
        b = new Box(100,200);
    });

    it("should be able to create a Box", function () {
        expect(b instanceof Box).toBe(true);
    });

    describe("attributes", function () {

        it("should read the correct width attribute value", function () {
            expect(b.width() === 100).toBe(true);
        });
        it("should read the correct height attribute value", function () {
            expect(b.height() === 200).toBe(true);
        });

    });

});
