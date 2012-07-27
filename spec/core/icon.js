/*global describe, it, beforeEach, expect, xit, jasmine */

describe("Legend Icon", function () {
    "use strict";

    var Icon = window.multigraph.core.Icon,
        icon;

    beforeEach(function () {
        icon = new Icon();
    });

    it("should be able to create a Icon", function () {
        expect(icon instanceof Icon).toBe(true);
    });

    describe("height attribute", function () {
        it("should be able to set/get the height attribute", function () {
            icon.height(45);
            expect(icon.height()).toBe(45);
        });

    });

    describe("width attribute", function () {
        it("should be able to set/get the width attribute", function () {
            icon.width(70);
            expect(icon.width()).toBe(70);
        });

    });

    describe("border attribute", function () {
        it("should be able to set/get the border attribute", function () {
            icon.border(5);
            expect(icon.border() === 5).toBe(true);
        });

    });

});
