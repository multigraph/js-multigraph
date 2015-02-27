/*global describe, it, beforeEach, expect, xit, jasmine */

describe("Insets", function () {
    "use strict";

    var Insets = require('../../src/math/insets.js'),
        i;

    beforeEach(function () {
        i = new Insets(10,20,30,40);
    });

    it("should be able to create a Insets", function () {
        expect(i instanceof Insets).toBe(true);
    });

    describe("attributes", function () {

        it("should read the correct top attribute value", function () {
            expect(i.top()).toBe(10);
        });
        it("should read the correct left attribute value", function () {
            expect(i.left()).toBe(20);
        });
        it("should read the correct bottom attribute value", function () {
            expect(i.bottom()).toBe(30);
        });
        it("should read the correct right attribute value", function () {
            expect(i.right()).toBe(40);
        });

    });

    describe("set method", function () {

        it("should be able to set and read the attribute values", function () {
            i.set(15, 0, 12.2, 40);
            expect(i.top()).toBe(15);
            expect(i.left()).toBe(0);
            expect(i.bottom()).toBe(12.2);
            expect(i.right()).toBe(40);
        });

    });

});
